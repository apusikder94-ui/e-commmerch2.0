import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getCategoryByProduct,
  getSingleProduct,
  searchProduct,
  updatedProduct,
} from "../controllers/productControllers";
import { upload } from "../middleware/multer";

export const productRoutes = express.Router();
productRoutes.post("/create", upload.array("images", 5), createProduct);
productRoutes.get("/all", getAllProduct);
productRoutes.get("/single/:slug", getSingleProduct);
productRoutes.get("/category/:slug", getCategoryByProduct);
productRoutes.get("/search", searchProduct);
productRoutes.put("/update/:id", upload.array("images", 5), updatedProduct);
productRoutes.delete("/delete/:id", deleteProduct);
