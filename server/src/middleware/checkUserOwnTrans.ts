import {Request, Response, NextFunction} from "express"
import { PrismaClient } from '.prisma/client'
import * as jwt from "jsonwebtoken";
import config from "../config/config";

const {transaction} = new PrismaClient()



export const checkUserOwnTrans = async (req: Request, res: Response, next: NextFunction)  => {
    const token = <string>req.headers["authorization"];
    let jwtPayload =<any>jwt.verify(token, config.jwtSecret);
    const {userId} = jwtPayload;

    const {transactionId} = req.body;
    
    const tran = await transaction.findUnique({
        where :{
            id: +transactionId
        },
        select:{
            userId:true
        }
    })

    console.log(tran)

    if(!tran){
        res.json({
            ok: false,
            error: "no such transaction"
        })
        return
    }
    //console.log(acct.userId);console.log(+accountId);
    if(tran.userId==userId){
        next()
    }else{
        res.json({
            ok: false,
            error: "transaction owner is not userId"
        })
    }

    

    
};