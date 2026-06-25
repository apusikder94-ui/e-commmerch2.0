"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./config/db");
const authRoutes_1 = require("./routes/authRoutes");
const categoryRoutes_1 = require("./routes/categoryRoutes");
const productRoutes_1 = require("./routes/productRoutes");
const stripRoutes_1 = require("./routes/stripRoutes");
const stripe_1 = require("./controllers/stripe");
const orderRoute_1 = require("./routes/orderRoute");
const app = (0, express_1.default)();
(0, db_1.DataBase)();
const PORT = 8080;
app.post("/api/v1/stripe/webhook", express_1.default.raw({ type: "application/json" }), stripe_1.webhook);
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", authRoutes_1.authRoutes);
app.use("/api/v1/category", categoryRoutes_1.categoryRoutes);
app.use("/api/v1/product", productRoutes_1.productRoutes);
app.use("/api/v1/stripe", stripRoutes_1.stripeRoutes);
app.use("/api/v1/order", orderRoute_1.orderRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
