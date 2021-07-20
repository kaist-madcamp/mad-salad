
import { Router } from "express";
import CategoryController from "../controllers/CategoryController";
import { checkJwt } from "../middleware/checkJwt";

const router = Router();
//Login route
router.get("/getAllCategories", checkJwt,CategoryController.getAllCategories);
router.get("/getExpenditureCategories", checkJwt,CategoryController.getExpenditureCategories);
router.get("/getIncomeCategories", checkJwt,CategoryController.getIncomeCategories);

export default router;