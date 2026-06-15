import express from "express";
import { signIn, signUp } from "../controllers/userControllers";
export const authRoutes = express.Router();
authRoutes.post("/signUp", signUp);
authRoutes.post("/signIn", signIn);
