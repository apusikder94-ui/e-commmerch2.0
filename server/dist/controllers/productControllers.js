"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProduct = exports.getCategoryByProduct = exports.deleteProduct = exports.updatedProduct = exports.getSingleProduct = exports.getAllProduct = exports.createProduct = void 0;
const productModels_1 = require("../models/productModels");
const cloudinary_1 = require("../utils/cloudinary");
const categoryModels_1 = require("../models/categoryModels");
const createProduct = async (req, res) => {
    const { name, description, price, discountPrice, stock, categoryId } = req.body;
    const images = req.files;
    try {
        if (!name ||
            !description ||
            !categoryId ||
            !images ||
            !price ||
            !discountPrice ||
            !stock) {
            return res.status(401).json({
                success: false,
                message: "All field are required",
            });
        }
        const category = await categoryModels_1.Category.findById(categoryId);
        if (!category) {
            return res.status(401).json({
                success: false,
                message: "Category is not found",
            });
        }
        const resultUri = await Promise.all(images.map(async (file) => {
            return (await (0, cloudinary_1.uploadCloudinaryImg)(file.path, "Product")) || "";
        }));
        const product = await productModels_1.Product.create({
            name,
            description,
            categoryId: category._id,
            images: resultUri,
            price,
            discountPrice,
            stock,
        });
        return res.status(201).json({
            success: true,
            message: "Product is created successFully",
            product,
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
exports.createProduct = createProduct;
const getAllProduct = async (req, res) => {
    try {
        const product = await productModels_1.Product.find().populate("categoryId");
        if (!product || product.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product is not found",
            });
        }
        return res.status(201).json({
            success: true,
            message: "All product receive successFully",
            product,
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
exports.getAllProduct = getAllProduct;
const getSingleProduct = async (req, res) => {
    const productSlug = req.params.slug;
    try {
        const product = await productModels_1.Product.findOne({ slug: productSlug });
        if (!product) {
            return res.status(401).json({
                success: false,
                message: "Product is not found",
            });
        }
        return res.status(201).json({
            success: true,
            message: "Single product received successFully",
            product,
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
exports.getSingleProduct = getSingleProduct;
const updatedProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, discountPrice, stock, categoryId } = req.body;
    const files = req.files;
    try {
        const product = await productModels_1.Product.findById(productId);
        if (!product) {
            return res.status(401).json({
                success: false,
                message: "Product is not found",
            });
        }
        if (name)
            product.name = name;
        if (description)
            product.description = description;
        if (files) {
            const resultUri = await Promise.all(files.map(async (file) => {
                return (await (0, cloudinary_1.uploadCloudinaryImg)(file.path, "Product")) || "";
            }));
            product.images = resultUri;
        }
        if (price)
            product.price = price;
        if (categoryId)
            product.categoryId = categoryId;
        if (discountPrice)
            product.discountPrice = discountPrice;
        if (stock)
            product.stock = stock;
        await product.save();
        return res.status(201).json({
            success: true,
            message: "Product updated successFully",
            product,
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
exports.updatedProduct = updatedProduct;
const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productModels_1.Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(401).json({
                success: false,
                message: "Product is not found",
            });
        }
        return res.status(201).json({
            success: true,
            message: "Product deleted successFully",
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
exports.deleteProduct = deleteProduct;
const getCategoryByProduct = async (req, res) => {
    const categorySlug = req.params.slug;
    try {
        // Find Category By Slug
        const category = await categoryModels_1.Category.findOne({
            slug: categorySlug,
        });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        // Find Products By Category Id
        const product = await productModels_1.Product.find({
            categoryId: category._id,
        });
        if (product.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found in this category",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            product,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.getCategoryByProduct = getCategoryByProduct;
const searchProduct = async (req, res) => {
    try {
        const q = req.query.q;
        if (!q || q.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Search query is required",
            });
        }
        const product = await productModels_1.Product.find({
            $or: [
                {
                    name: {
                        $regex: q,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: q,
                        $options: "i",
                    },
                },
            ],
        });
        if (product.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No product found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Search product received successfully",
            product,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.searchProduct = searchProduct;
