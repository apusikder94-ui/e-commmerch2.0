import express from "express";
import { allUser, createUser, deleteUser, logout, profile, signIn, signUp, updateUserAdmin } from "../controllers/userControllers";
import { upload } from "../middleware/multer";

import { authorization } from "../middleware/authMiddleware";
export const authRoutes = express.Router();
authRoutes.post("/signUp", signUp);
authRoutes.post("/signIn", signIn);


authRoutes.post("/createUser", upload.single("profilePic"), createUser)
authRoutes.get("/all", allUser);
authRoutes.post("/logout", logout);
authRoutes.get("/profile", authorization, profile);
authRoutes.put("/update/:id", updateUserAdmin);
authRoutes.delete("/delete/:id", deleteUser);



