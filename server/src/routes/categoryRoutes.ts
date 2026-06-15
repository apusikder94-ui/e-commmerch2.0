import express from "express";
import {
  deleteCategory,
  createCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/categoryControllers";
import { upload } from "../middleware/multer";

export const categoryRoutes = express.Router();
categoryRoutes.post("/create", upload.single("catImg"), createCategory);
categoryRoutes.get("/all", getAllCategory);
categoryRoutes.put("/update/:id", upload.single("catImg"), updateCategory);
categoryRoutes.delete("/delete/:id", deleteCategory);
