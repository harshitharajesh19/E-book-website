import express from "express";
import { createUser,deleteUser, getAllUsers, getUser, updateUser, loginUser } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/login", loginUser);
userRoutes.post("/", createUser);
userRoutes.get("/:id", getUser);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser); 

export default userRoutes;
