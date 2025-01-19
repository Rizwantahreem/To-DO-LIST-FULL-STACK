import express from "express";
import { logIn, logOut, signUp } from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", logIn);
authRoutes.post("/logout", logOut);

export default authRoutes;
