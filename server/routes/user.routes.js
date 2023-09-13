import { Router } from "express";
import {
  getUserList,
  addNewUser,
  signIn,
  updateUser,
  // deleteUser,
} from "../controller/user.controller";

const userRouter = Router();

userRouter.get("/users", getUserList);
userRouter.post("/users", addNewUser);
userRouter.post("/users/signin", signIn);
userRouter.put("/users/:id", updateUser);
// userRouter.delete("/users/:id", deleteUser);

export default userRouter;
