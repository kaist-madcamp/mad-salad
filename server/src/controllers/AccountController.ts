import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from ".prisma/client";

const { user, account, transaction } = new PrismaClient();

class AccountController {
  static createAccount = async (req: Request, res: Response) => {
    console.log("acct/create/:userId");
    let { name, type } = req.body;
    const token = <string>req.headers["authorization"];
    let jwtPayload = <any>jwt.verify(token, "asdasdsaxzcqwkn12kmlasm");
    const { userId } = jwtPayload;

    if (!(name && type)) {
      res.json({
        ok: false,
        error: "null parameter error",
      });
      return;
    }

    try {
      const acct = await account.create({
        data: {
          name: name,
          type,
          userId: +userId,
        },
      });
      console.log(acct);
    } catch (error) {
      res.json({
        ok: false,
        error:
          "create acct failed. maybe duplicate name or other problem in format",
      });
      return;
    }

    res.json({
      ok: true,
    });
  };

  static deleteAccount = async (req: Request, res: Response) => {
    console.log("acct/delete/accountId");
    let { accountId } = req.params;

    if (!accountId) {
      res.json({
        ok: false,
        error: "null parameter",
      });
      return;
    }

    try {
      const tran = await transaction.deleteMany({
        where: {
          accountId: +accountId,
        },
      });
    } catch (error) {
      res.json({
        ok: false,
        error: error,
      });
      return;
    }

    try {
      const acct = await account.delete({
        where: {
          id: +accountId,
        },
      });
    } catch (error) {
      res.json({
        ok: false,
        error: error,
      });
      return;
    }

    res.json({ ok: true });
  };

  static getAllAccount = async (req: Request, res: Response) => {
    const token = <string>req.headers["authorization"];
    let jwtPayload = <any>jwt.verify(token, "asdasdsaxzcqwkn12kmlasm");
    const { userId } = jwtPayload;

    const accounts = await account.findMany({
      where: {
        userId: +userId,
      },
      orderBy: {
        id: "asc",
      },
    });

    res.json({
      ok: true,
      data: accounts,
    });
  };
}
export default AccountController;
