import express from "express"

import { detail, login,register,payment, getUsers } from "../controllers/usercontroller.js"
import { authMiddleWare } from "../middleware/auth.js"
import { book, booked } from "../controllers/bookingController.js"
const userRouter = express.Router()


userRouter.post("/register",register)

userRouter.post("/login",login)
userRouter.post("/book",authMiddleWare,book)
userRouter.get("/get",authMiddleWare,booked)
userRouter.get("/detail",authMiddleWare,detail)
userRouter.post("/payment",authMiddleWare,payment)
userRouter.get("/getusers",authMiddleWare,getUsers)

export default userRouter