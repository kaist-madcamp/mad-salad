import express, { Request, Response, Router } from "express";
import { PrismaClient } from ".prisma/client";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middleware/checkJwt";

const { user } = new PrismaClient();
const userRouter: express.Router = express.Router();

//userRouter.get("/getall",UserController.getAll);
userRouter.post("/getOne", async (req: Request, res: Response) => {
  const { email } = req.body;
  const userExist = await user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      password: true,
      name: true,
      id: true,
    },
  });

  if (!userExist) {
    return res.status(400).json({
      msg: "user doesn't",
    });
  }

  res.json(userExist);
});

userRouter.post("/join", UserController.join);

userRouter.post("/unroll", [checkJwt], UserController.unroll);

export default userRouter;
