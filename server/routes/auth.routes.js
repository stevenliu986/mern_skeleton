import { Router } from "express";
import { signIn } from "../controller/auth.controller";

const authRouter = Router();

authRouter.post("/users/signin", signIn);

export default authRouter;
