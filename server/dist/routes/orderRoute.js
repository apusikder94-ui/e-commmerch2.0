"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const orderControllers_1 = require("../controllers/orderControllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.orderRoutes = express_1.default.Router();
exports.orderRoutes.get("/all", orderControllers_1.getAllOrder);
exports.orderRoutes.get("/userAll", authMiddleware_1.authorization, orderControllers_1.userOrderall);
exports.orderRoutes.put("/update/:id", orderControllers_1.updateOrder);
exports.orderRoutes.delete("/delete/:id", orderControllers_1.deleteOrder);
