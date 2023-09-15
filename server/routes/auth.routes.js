import { Router } from "express";
import { signIn, signOut } from "../controller/auth.controller";

const authRouter = Router();

authRouter.post("/signin", signIn);
authRouter.get("/signout", signOut);

export default authRouter;
