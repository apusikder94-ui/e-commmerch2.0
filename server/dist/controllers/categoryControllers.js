"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getAllCategory = exports.createCategory = void 0;
const categoryModels_1 = require("../models/categoryModels");
const cloudinary_1 = require("../utils/cloudinary");
const createCategory = async (req, res) => {
    const { name } = req.body;
    const file = req.file?.path;
    try {
        if (!name || !file) {
            return res.status(400).json({
                success: false,
                message: "Name and image are required",
            });
        }
        const cloudUrl = (await (0, cloudinary_1.uploadCloudinaryImg)(file, "Category")) || "";
        const category = await categoryModels_1.Category.create({
            name,
            catImg: cloudUrl,
        });
        return res.status(201).json({
            success: true,
            message: "Category created successFully",
            category,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.createCategory = createCategory;
const getAllCategory = async (req, res) => {
    try {
        const category = await categoryModels_1.Category.find();
        if (!category || category.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Category is not found",
            });
        }
        return res.status(201).json({
            success: true,
            message: "All Category receive successFully",
            category,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.getAllCategory = getAllCategory;
const updateCategory = async (req, res) => {
    const catId = req.params.id;
    const { name } = req.body;
    const file = req.file?.path;
    try {
        const category = await categoryModels_1.Category.findById(catId);
        if (!category) {
            return res.status(401).json({
                success: false,
                message: "Category is not found",
            });
        }
        if (name)
            category.name = name;
        if (file) {
            const cloudImg = (await (0, cloudinary_1.uploadCloudinaryImg)(file, "Category")) || "";
            category.catImg = cloudImg;
        }
        await category.save();
        return res.status(201).json({
            success: false,
            message: "Category updated successFully",
            category,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    const catId = req.params.id;
    try {
        const category = await categoryModels_1.Category.findByIdAndDelete(catId);
        if (!category) {
            return res.status(401).json({
                success: false,
                message: "Category is not found",
            });
        }
        return res.status(201).json({
            success: true,
            message: "Category deleted successFully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.deleteCategory = deleteCategory;
