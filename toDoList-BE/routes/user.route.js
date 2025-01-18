import express from "express";
import { getUsers } from "../controllers/user.controller.js";
const userRoutes = express.Router();
userRoutes.get("/", getUsers);
export default userRoutes;
