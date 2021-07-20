
import { Router } from "express";
import AccountController from "../controllers/AccountController";
import { checkJwt } from "../middleware/checkJwt";
import { checkUser } from "../middleware/checkUser";
import { checkUserOwnAccount } from "../middleware/checkUserOwnAccount";

const router = Router();
//Login route

router.post("/create",[checkJwt,checkUser],AccountController.createAccount)

router.get("/delete/:accountId",[checkJwt,checkUser,checkUserOwnAccount],AccountController.deleteAccount)

router.get("/getall",[checkJwt,checkUser],AccountController.getAllAccount)

export default router;