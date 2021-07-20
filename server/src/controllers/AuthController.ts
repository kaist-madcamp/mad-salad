import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
//import { validate } from "class-validator";
import config from "../config/config";
import { PrismaClient } from '.prisma/client'
import bcrypt from "bcrypt"

const {user} = new PrismaClient()

class AuthController { 
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    

    let { email, password } = req.body;
    if (!(email && password)) {
      res.json({
        ok: false,
        error: "email or password is null"
      })
      return
    }
    
    //Get user from database 
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
        return res.json({
            ok: false,
            error: "user doesn't exit"
        })
    }

    //Check if encrypted password match
    if (!bcrypt.compareSync(password,userExist.password)) {
      res.json({
        ok:false,
        error:"incorrect password"
      });
      console.log("password no match")
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: userExist.id},
      config.jwtSecret//,
      //{ expiresIn: "1h" }
    );

    //Send the jwt in the response
    res.json({
      ok: true,
      token: token
    });
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const token = <string>req.headers["authorization"];
    let jwtPayload;
    try {
      jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    } catch (error) {
      res.status(200).json({
        ok: false,
        error: "invalid token"
      });
      return;
    }//do I need this?
    const { userId } = jwtPayload
    

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.json({
        ok:false,
        error: "old or newpassword is null"
      })
      return
    }

    //Get user from the database
    
    const userExist = await user.findUnique({
            where: {
                id:userId
            },
            select :{
            email:true,
            password: true,
            name: true,
            id:true
        }
    })
     

    if (!userExist) {
        console.log("user doesnt exist")
        return res.json({
          ok:false,
          error:"user doesn't exit"
        })
    }

    //Check if old password matchs
    const encryptedPassowrd = bcrypt.hashSync(newPassword, 10)
    if (!bcrypt.compareSync(oldPassword, userExist.password)) {
      res.json({
        ok:false,
        error: "incorrect password"
      });
    }else{
        const updateUser = await user.update({
            where:{
                id:userId
            },
            data:{
                password: encryptedPassowrd,
            }
        })
        res.json({
          ok:true
        })       
    }

  };
}
export default AuthController;