import express from "express";
import { stripePayment } from "../controllers/stripe";
import { authorization } from "../middleware/authMiddleware";

export const stripeRoutes = express.Router();
stripeRoutes.post("/checkout",authorization, stripePayment)