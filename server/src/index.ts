import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
import { DataBase } from "./config/db";
import { authRoutes } from "./routes/authRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";
import { productRoutes } from "./routes/productRoutes";
dotenv.config();
DataBase();

const PORT = 8080;
// middleware
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
