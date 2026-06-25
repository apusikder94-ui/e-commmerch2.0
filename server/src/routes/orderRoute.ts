import express from "express";
import { deleteOrder, getAllOrder, updateOrder, userOrderall } from "../controllers/orderControllers";
import { authorization } from "../middleware/authMiddleware";

export const orderRoutes = express.Router();
orderRoutes.get("/all", getAllOrder)
orderRoutes.get("/userAll", authorization, userOrderall)
orderRoutes.put("/update/:id", updateOrder)
orderRoutes.delete("/delete/:id", deleteOrder)