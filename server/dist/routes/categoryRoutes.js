"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const categoryControllers_1 = require("../controllers/categoryControllers");
const multer_1 = require("../middleware/multer");
exports.categoryRoutes = express_1.default.Router();
exports.categoryRoutes.post("/create", multer_1.upload.single("catImg"), categoryControllers_1.createCategory);
exports.categoryRoutes.get("/all", categoryControllers_1.getAllCategory);
exports.categoryRoutes.put("/update/:id", multer_1.upload.single("catImg"), categoryControllers_1.updateCategory);
exports.categoryRoutes.delete("/delete/:id", categoryControllers_1.deleteCategory);
