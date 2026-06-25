"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const multer_1 = require("../middleware/multer");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.authRoutes = express_1.default.Router();
exports.authRoutes.post("/signUp", userControllers_1.signUp);
exports.authRoutes.post("/signIn", userControllers_1.signIn);
exports.authRoutes.post("/createUser", multer_1.upload.single("profilePic"), userControllers_1.createUser);
exports.authRoutes.get("/all", userControllers_1.allUser);
exports.authRoutes.post("/logout", userControllers_1.logout);
exports.authRoutes.get("/profile", authMiddleware_1.authorization, userControllers_1.profile);
exports.authRoutes.put("/update/:id", userControllers_1.updateUserAdmin);
exports.authRoutes.delete("/delete/:id", userControllers_1.deleteUser);
