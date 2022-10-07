import express from "express";
import { comment, join, login } from "../controllers/userController";
import { verifyToken } from "../middleware/authorization";

const userRouter = express.Router();

userRouter.route("/join").post(join);

userRouter.route("/login").post(login);

userRouter.route("/comment").post(verifyToken, comment);

export default userRouter;
