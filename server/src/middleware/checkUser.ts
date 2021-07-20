import {Request, Response, NextFunction} from "express"
import { PrismaClient } from '.prisma/client'
import * as jwt from "jsonwebtoken";
import config from "../config/config";

const {user} = new PrismaClient()



export const checkUser = async (req: Request, res: Response, next: NextFunction)  => {
    const token = <string>req.headers["authorization"];
    let jwtPayload =<any>jwt.verify(token, config.jwtSecret);
    const {userId} = jwtPayload;

    const userExist = await user.findUnique({
    where: {
        id: +userId
    },
    select :{
        email:true
    }
    })

if(userExist){
    next()
}else{
    res.json({
      ok:false,
      error: "wrong userId."
    })
}
};