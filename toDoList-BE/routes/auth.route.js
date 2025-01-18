import express from "express";
import {
  logIn,
  logOut,
  resetPassword,
  signUp,
} from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", logIn);
authRoutes.get("/logout", logOut);
authRoutes.post("/resetPassword", resetPassword);

export default authRoutes;
