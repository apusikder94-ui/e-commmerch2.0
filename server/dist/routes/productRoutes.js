"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const productControllers_1 = require("../controllers/productControllers");
const multer_1 = require("../middleware/multer");
exports.productRoutes = express_1.default.Router();
exports.productRoutes.post("/create", multer_1.upload.array("images", 5), productControllers_1.createProduct);
exports.productRoutes.get("/all", productControllers_1.getAllProduct);
exports.productRoutes.get("/single/:slug", productControllers_1.getSingleProduct);
exports.productRoutes.get("/category/:slug", productControllers_1.getCategoryByProduct);
exports.productRoutes.get("/search", productControllers_1.searchProduct);
exports.productRoutes.put("/update/:id", multer_1.upload.array("images", 5), productControllers_1.updatedProduct);
exports.productRoutes.delete("/delete/:id", productControllers_1.deleteProduct);
