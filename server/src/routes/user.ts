import express, { Request, Response, Router } from "express"
import { PrismaClient } from '.prisma/client'
import UserController from "../controllers/UserController";
import bcrypt from "bcrypt"
import { checkJwt } from "../middleware/checkJwt";

const {user} = new PrismaClient()
const userRouter : express.Router = express.Router()

userRouter.get("/",async (req:Request,res:Response) =>{
    res.send("user root")
});

userRouter.get("/getall",UserController.getAll);
userRouter.post("/getOne", async (req:Request,res:Response) =>{

    const{email} = req.body
    const userExist = await user.findUnique({
        where: {
            email
        },
        select :{
            email:true,
            password: true,
            name: true,
            id:true
        }
    })

    if(!userExist){
        return res.status(400).json({
            msg: "user doesn't"
        })
    }

    
    res.json(userExist)

});

userRouter.post("/join", UserController.join);


//maybe deleted
userRouter.post("/update", async (req:Request,res:Response) =>{
    console.log("/api/user/update")
    console.log(req.body)

    const{email, password, newPassword, newName} = req.body
    const userExist = await user.findUnique({
        where: {
            email
        },
        select :{
            password:true
        }
    })

    if(!userExist){
        return res.status(400).json({
            msg: "user doesn't exit"
        })
    }
    const encryptedPassowrd = bcrypt.hashSync(password, 10)
    if(bcrypt.compareSync(password,userExist.password)){
        const updateUser = await user.update({
            where:{
                email
            },
            data:{
                password: encryptedPassowrd,
                name: newName
            }
        })
        res.status(200).json(updateUser)
        //res.status(200).json({msg:"test msg"})
    }
    else{
        res.status(401).json({msg: "wrong password"})
    }

 

});

userRouter.post("/unroll", [checkJwt],UserController.unroll)


export default userRouter