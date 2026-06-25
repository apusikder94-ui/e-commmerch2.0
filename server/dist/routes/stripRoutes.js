"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const stripe_1 = require("../controllers/stripe");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.stripeRoutes = express_1.default.Router();
exports.stripeRoutes.post("/checkout", authMiddleware_1.authorization, stripe_1.stripePayment);
