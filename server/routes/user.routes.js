import { Router } from "express";
import {
  getUserList,
  addNewUser,
  updateUser,
  // deleteUser,
} from "../controller/user.controller";

const userRouter = Router();

userRouter.get("/users", getUserList);
userRouter.post("/users", addNewUser);
userRouter.put("/users/:id", updateUser);
// userRouter.delete("/users/:id", deleteUser);

export default userRouter;
