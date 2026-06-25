import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { DataBase } from "./config/db";
import { authRoutes } from "./routes/authRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";
import { productRoutes } from "./routes/productRoutes";
import { stripeRoutes } from "./routes/stripRoutes";
import { webhook } from "./controllers/stripe";
import { orderRoutes } from "./routes/orderRoute";

const app = express();

DataBase();

const PORT = 8080;


app.post(
  "/api/v1/stripe/webhook",
  express.raw({ type: "application/json" }),
  webhook
);


app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.use(cookieParser());


app.use("/api/auth", authRoutes);

app.use("/api/v1/category", categoryRoutes);

app.use("/api/v1/product", productRoutes);

app.use("/api/v1/stripe", stripeRoutes);
app.use("/api/v1/order", orderRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});