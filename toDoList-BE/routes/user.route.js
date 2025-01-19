import express from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import { AuthenticateUser } from "../middleware/authentication.middleware.js";

const userRoutes = express.Router();

userRoutes.get("/", AuthenticateUser, getUsers);
userRoutes.get("/:id", AuthenticateUser, getUser);

export default userRoutes;
