import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { PrismaClient } from '.prisma/client'

const {user} = new PrismaClient()

class CategoryController { 
    static getAllCategories = async(req: Request, res: Response)=>{
        const token = <string>req.headers["authorization"];
        let jwtPayload =<any>jwt.verify(token, config.jwtSecret);
        const {userId} = jwtPayload;

        const userExist = await user.findUnique({
            where:{
                id: +userId
            },
            include:{
                categories: true
            }
        })
        if(!userExist){
            res.json({ok:false, error:"user find failes. mabye wrong userId"})
            return
        }
        res.json({
            ok:true,
            data:userExist.categories
        })
    }

    static getExpenditureCategories = async(req: Request, res: Response)=>{
        const token = <string>req.headers["authorization"];
        let jwtPayload =<any>jwt.verify(token, config.jwtSecret);
        const {userId} = jwtPayload;

        const userExist = await user.findUnique({
            where:{
                id: +userId
            },
            include:{
                categories: {
                    where:{
                        type: "EXPENDITURE"
                    }
                }
            }
        })
        if(!userExist){
            res.json({ok:false, error:"user find failes. mabye wrong userId"})
            return
        }
        res.json({
            ok:true,
            data:userExist.categories
        })
    }
    static getIncomeCategories = async(req: Request, res: Response)=>{
        const token = <string>req.headers["authorization"];
        let jwtPayload =<any>jwt.verify(token, config.jwtSecret);
        const {userId} = jwtPayload;

        const userExist = await user.findUnique({
            where:{
                id: +userId
            },
            include:{
                categories: {
                    where:{
                        type: "INCOME"
                    }
                }
            }
        })
        if(!userExist){
            res.json({ok:false, error:"user find failes. mabye wrong userId"})
            return
        }
        res.json({
            ok:true,
            data:userExist.categories
        })
    }
}
export default CategoryController;