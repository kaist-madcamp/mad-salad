import { Router } from "express";
import TransactionController from "../controllers/TransactionController";
import { checkJwt } from "../middleware/checkJwt";
import { checkUser } from "../middleware/checkUser";
import { checkUserOwnAccount } from "../middleware/checkUserOwnAccount";
import { checkUserOwnTrans } from "../middleware/checkUserOwnTrans";

const router = Router();
//Login route

router.post("/income/:accountId", [checkJwt, checkUser, checkUserOwnAccount], TransactionController.income)

router.post("/expenditure/:accountId", [checkJwt, checkUser, checkUserOwnAccount], TransactionController.expenditure)

router.post("/send/:accountId", [checkJwt, checkUser, checkUserOwnAccount], TransactionController.send)

router.post("/receive", [checkJwt, checkUser,checkUserOwnTrans], TransactionController.receive)

router.put("/updateOne", [checkJwt, checkUser, checkUserOwnTrans], TransactionController.updateOneTransaction)

router.post("/deleteOne/", [checkJwt, checkUser, checkUserOwnTrans], TransactionController.deleteOneTransaction)

router.get("/history", [checkJwt, checkUser], TransactionController.historyByMonth)

router.get("/historyByCategory", [checkJwt, checkUser], TransactionController.historyGroupByCategory)

router.get("/historyByCreatedAt", [checkJwt, checkUser], TransactionController.historyGroupByCreatedAt)

router.get("/getPending", [checkJwt, checkUser], TransactionController.getPendingTransactions)

export default router;