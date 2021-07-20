import { Router, Request, Response } from "express"
import auth from "./auth"
import user from "./user"
import acct from "./acct"
import tranaction from "./transaction"
import category from "./category"

const routes = Router()

routes.use("/auth", auth)
routes.use("/user", user)
routes.use("/acct",acct)
routes.use("/transaction",tranaction)
routes.use("/category",category)

export default routes