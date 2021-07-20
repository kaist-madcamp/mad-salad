import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { PrismaClient, Transaction } from '.prisma/client'
import { AcctType, TransType } from "@prisma/client";

const prisma = new PrismaClient();

const { user, account, transaction, category, $transaction } = new PrismaClient()

class TransactionController {
    static income = async (req: Request, res: Response) => {
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
        const { accountId } = req.params
        const { amount, categoryName, content, date } = req.body
        let createDate: Date
        if (!date) createDate = new Date()
        else createDate = new Date(date)

        if (!(amount && categoryName)) {
            res.json({
                ok: false,
                error: "null parameter"
            })
            return
        }

        if (+amount < 0) {
            res.json({
                ok: false,
                error: "amount should not be below zero"
            })
            return
        }

        const categoryExist = await category.findUnique({
            where: {
                name: categoryName
            },
            select: {
                id: true
            }
        })
        if (!categoryExist) {
            res.json({
                ok: false,
                error: "no such category"
            })
            return
        }

        const acct = await account.findUnique({
            where: {
                id: +accountId
            },
            select: {
                balance: true,
                version: true
            }
        })
        if (!acct) {
            res.json({
                ok: false,
                error: "no such accountId"
            })
            return
        }

        const newBalance = acct.balance + (+amount)

        let newAcct
        try {
            newAcct = account.updateMany({
                where: {
                    id: +accountId,
                    version: acct.version
                },
                data: {
                    balance: newBalance,
                    version: {
                        increment: 1
                    },
                }

            })
        } catch (error) {
            res.json({
                ok: false,
                error: "account update failed"
            })
            return
        }

        let trans;
        try {
            trans = transaction.create({
                data: {
                    accountId: +accountId,
                    type: "INCOME",
                    amount: +amount,
                    categoryId: categoryExist.id,
                    accountSubId: +accountId,
                    content,
                    userId: +userId,
                    createdAt: createDate
                }
            })
        } catch (error) {
            res.json({
                ok: false,
                error: error
            })
            return
        }

        prisma.$transaction([newAcct, trans])


        res.json({
            ok: true
        })
    }

    static expenditure = async (req: Request, res: Response) => {
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
        const { accountId } = req.params
        const { amount, categoryName, content, date } = req.body
        if (!(amount && categoryName)) {
            res.json({
                ok: false,
                error: "null parameter"
            })
            return
        }
        let createDate: Date
        if (!date) createDate = new Date()
        else createDate = new Date(date)

        if (+amount < 0) {
            res.json({
                ok: false,
                error: "amount should not be below zero"
            })
            return
        }

        const categoryExist = await category.findUnique({
            where: {
                name: categoryName
            },
            select: {
                id: true
            }
        })
        if (!categoryExist) {
            res.json({
                ok: false,
                error: "no such category"
            })
            return
        }

        const acct = await account.findUnique({
            where: {
                id: +accountId
            },
            select: {
                balance: true,
                version: true
            }
        })
        if (!acct) {
            res.json({
                ok: false,
                error: "no such accountId"
            })
            return
        }

        const newBalance = acct.balance - (+amount)
        if (newBalance < 0) {
            res.json({
                ok: false,
                error: "not enought balance"
            })
            return
        }

        let newAcct
        try {
            newAcct = account.updateMany({
                where: {
                    id: +accountId,
                    version: acct.version
                },
                data: {
                    balance: newBalance,
                    version: {
                        increment: 1
                    },
                }

            })
        } catch (error) {
            res.json({
                ok: false,
                error: "account update failed"
            })
            return
        }

        let trans;
        try {
            trans = transaction.create({
                data: {
                    accountId: +accountId,
                    type: "EXPENDITURE",
                    amount: +amount,
                    categoryId: categoryExist.id,
                    accountSubId: +accountId,
                    content,
                    userId: +userId,
                    createdAt: createDate
                }
            })
        } catch (error) {
            res.json({
                ok: false,
                error: error
            })
            return//do I need this??
        }

        prisma.$transaction([newAcct, trans])


        res.json({
            ok: true
        })
    }
    static send = async (req: Request, res: Response) => {
        const { accountId } = req.params
        const { amount, categoryName, accountSubId, content, date } = req.body

        if (!(amount && categoryName && accountSubId)) {
            res.json({
                ok: false,
                error: "null parameter"
            })
            return
        }
        let createDate: Date
        if (!date) createDate = new Date()
        else createDate = new Date(date)

        if (+amount < 0) {
            res.json({
                ok: false,
                error: "amount should not be below zero"
            })
            return
        }

        const categoryExist = await category.findUnique({
            where: {
                name: categoryName
            },
            select: {
                id: true
            }
        })
        if (!categoryExist) {
            res.json({
                ok: false,
                error: "no such category"
            })
            return
        }

        const acct = await account.findUnique({
            where: {
                id: +accountId
            },
            select: {
                balance: true,
                version: true,
                userId: true
            }
        })
        if (!acct) {
            res.json({
                ok: false,
                error: "no such accountId"
            })
            return
        }

        const acctSub = await account.findUnique({
            where: {
                id: +accountSubId
            },
            select: {
                balance: true,
                version: true,
                userId: true
            }
        })
        if (!acctSub) {
            res.json({
                ok: false,
                error: "no such accountSubId"
            })
            return
        }

        const newBalance = acct.balance - (+amount)
        const newSubBalance = acctSub.balance + (+amount)
        if (newBalance < 0) {
            res.json({
                ok: false,
                error: "not enough balance"
            })
            return
        }

        let newAcct
        try {
            newAcct = account.updateMany({
                where: {
                    id: +accountId,
                    version: acct.version
                },
                data: {
                    balance: newBalance,
                    version: {
                        increment: 1
                    },
                }

            })
        } catch (error) {
            res.json({
                ok: false,
                error: "account update failed"
            })
            return
        }

        let newAcctSub;
        try {
            newAcctSub = account.updateMany({
                where: {
                    id: +accountSubId,
                    version: acctSub.version
                },
                data: {
                    balance: newSubBalance,
                    version: {
                        increment: 1
                    },
                }

            })
        } catch (error) {
            res.json({
                ok: false,
                error: "accountSub update failed"
            })
            return
        }

        let trans;
        try {
            trans = transaction.create({
                data: {
                    accountId: +accountId,
                    type: "SEND",
                    amount: +amount,
                    categoryId: categoryExist.id,
                    accountSubId: +accountSubId,
                    content,
                    userId: acct.userId,
                    createdAt: createDate
                }
            })
        } catch (error) {
            res.json({
                ok: false,
                error: "trans create failed"
            })
            return
        }

        let transSub;
        try {
            transSub = transaction.create({
                data: {
                    accountId: +accountSubId,
                    type: "RECEIVE",
                    amount: +amount,
                    categoryId: categoryExist.id,
                    accountSubId: +accountId,
                    content,
                    userId: acctSub.userId,
                    createdAt: createDate
                }
            })
        } catch (error) {
            res.json({
                ok: false,
                error: "transSub create failed"
            })
            return
        }

        prisma.$transaction([newAcct, newAcctSub, trans, transSub])


        res.json({
            ok: true
        })
    }

    static updateOneTransaction = async (req: Request, res: Response) => {
        const { transactionId } = req.body
        const { amount, content, categoryName, type, createdAt, accountId } = req.body
        if (!transactionId) {
            res.json({
                ok: false, error: "null paremeter or no transId"
            })
            return
        }

        const transExist = await transaction.findUnique({
            where: {
                id: +transactionId
            }
        })

        if (!transExist) {
            res.json({
                ok: false, error: "no such transId"
            })
            return
        }

        if (!(amount || content || categoryName || type || createdAt || accountId)) {
            res.json({
                ok: false, error: "nothing to change"
            })
            return
        }

        //have to validate
        let newAmount: number, newContent: string | null, newCategoryId: number, newType: TransType, newCreatedAt: Date, newAccountId: number
        if (!amount) newAmount = transExist.amount
        else newAmount = +amount
        if (!content) newContent = transExist.content
        else newContent = content
        if (!categoryName) {
            newCategoryId = transExist.categoryId
        }
        else {
            const categoryExist = await category.findUnique({
                where: {
                    name: categoryName
                },
                select: {
                    id: true
                }
            })
            if (!categoryExist) {
                res.json({
                    ok: false, error: "categoryName not found"
                })
                return
            }

            newCategoryId = categoryExist.id
        }
        if (!type) newType = transExist.type
        else newType = type
        if (!createdAt) newCreatedAt = transExist.createdAt
        else newCreatedAt = new Date(createdAt)
        if (!accountId) newAccountId = transExist.accountId
        else newAccountId = +accountId

        //userId check
        try {
            const updateTrans = await transaction.update({
                where: {
                    id: +transactionId
                },
                data: {
                    amount: newAmount,
                    content: newContent,
                    categoryId: newCategoryId,
                    type: newType,
                    createdAt: newCreatedAt,
                    accountId: newAccountId
                }
            })
        } catch (error) {
            console.log(error);
            res.json({ ok: false, error: "update failed. check your parameters" })
            return
        }
        res.json({
            ok: true
        })
    }

    static deleteOneTransaction = async (req: Request, res: Response) => {
        const { transactionId } = req.body

        const transExist = await transaction.findUnique({
            where: {
                id: +transactionId
            }
        })

        if (!transExist) {
            res.json({
                ok: false, error: "no such transId"
            })
            return
        }


        //userId check
        try {
            const updateTrans = await transaction.delete({
                where: {
                    id: +transactionId
                },
            })
        } catch (error) {
            res.json({ ok: false, error: "delete failed. " })
            return
        }
        res.json({
            ok: true
        })
    }

    static historyByMonth = async (req: Request, res: Response) => {
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

        const { year, month } = req.query
        if (!(year && month)) {
            res.json({ ok: false, error: "wrong http query" })
            return
        }

        const date = year + "-" + month
        let nextDate
        if (month != "12") {
            nextDate = year + "-" + String((parseInt(String(month)) + 1))
        } else {
            nextDate = String(parseInt(String(year)) + 1) + "-1"
        }


        const getAccounts = await user.findUnique({
            where: {
                id: +userId
            },
            include: {
                transactions: {
                    where: {
                        createdAt: {
                            gte: new Date(date),
                            lt: new Date(nextDate) //have to check
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        })
        if (!getAccounts) {
            res.json({ ok: false, error: "wrong userId" })
            return
        }
        res.json({
            ok: true,
            data: getAccounts.transactions
        })
    }



    static historyGroupByCategory = async (req: Request, res: Response) => {
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

        const { year, month } = req.query
        if (!(year && month)) {
            res.json({ ok: false, error: "wrong http query" })
            return
        }

        const date = year + "-" + month
        let nextDate
        if (month != "12") {
            nextDate = year + "-" + String((parseInt(String(month)) + 1))
        } else {
            nextDate = String(parseInt(String(year)) + 1) + "-1"
        }

        const getTransactions = await transaction.groupBy({
            by: ["categoryId"],
            where: {
                userId: +userId,
                createdAt: {
                    gte: new Date(date),
                    lt: new Date(nextDate) //have to check
                },
                type: { notIn: ["RECEIVE", "INCOME"] }
            },
            _sum: {
                amount: true
            },
            orderBy: {
                _sum: {
                    amount: "desc"
                }
            }

        })
        let resultTransactions = []
        for (let i = 0; i < getTransactions.length; i++) {
            const categoryId = getTransactions[i].categoryId
            const amount = getTransactions[i]._sum.amount
            const categoryExist = await category.findUnique({
                where: {
                    id: categoryId
                },
                select: {
                    name: true
                }
            })
            resultTransactions.push({
                categoryId: categoryId, amount: amount,
                categoryName: categoryExist?.name
            })
        }

        res.json({
            ok: true,
            data: resultTransactions
        })
    }

    static historyGroupByCreatedAt = async (req: Request, res: Response) => {
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

        const { year, month } = req.query
        if (!(year && month)) {
            res.json({ ok: false, error: "wrong http query" })
            return
        }

        const date = year + "-" + month
        let nextDate
        if (month != "12") {
            nextDate = year + "-" + String((parseInt(String(month)) + 1))
        } else {
            nextDate = String(parseInt(String(year)) + 1) + "-1"
        }


        const getAccounts = await user.findUnique({
            where: {
                id: +userId
            },
            include: {
                transactions: {
                    where: {
                        createdAt: {
                            gte: new Date(date),
                            lt: new Date(nextDate) //have to check
                        },
                    },
                    include: {
                        account: {
                            select: {
                                name: true,
                                id: true,
                            }
                        },
                        category: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },

            },
        })
        if (!getAccounts) {
            res.json({ ok: false, error: "wrong userId" })
            return
        }

        let resultTras: Transaction[][] = []
        let iterateArray: Transaction[] = []
        let current_day = 0
        for (let i = 0; i < getAccounts.transactions.length; i++) {
            const tran = getAccounts.transactions[i]

            //console.log(tran.createdAt.getDate())
            if (tran.createdAt.getDate() != current_day) {
                if (current_day != 0) resultTras.push(iterateArray)
                iterateArray = [tran]
                current_day = tran.createdAt.getDate()
            } else {

                iterateArray.push(tran)
            }
        }
        if (iterateArray.length != 0) resultTras.push(iterateArray)


        res.json({
            ok: true,
            data: resultTras
        })
    }
}


export default TransactionController;