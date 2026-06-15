import { Request, Response } from "express";
import { Category } from "../models/categoryModels";
import { uploadCloudinaryImg } from "../utils/cloudinary";

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const file = req.file?.path;
  try {
    if (!name || !file) {
      return res.status(400).json({
        success: false,
        message: "Name and image are required",
      });
    }

    const cloudUrl = (await uploadCloudinaryImg(file, "Category")) || "";

    const category = await Category.create({
      name,
      catImg: cloudUrl,
    });
    return res.status(201).json({
      success: true,
      message: "Category created successFully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.find();
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
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const catId = req.params.id;
  const { name } = req.body;
  const file = req.file?.path;
  try {
    const category = await Category.findById(catId);
    if (!category) {
      return res.status(401).json({
        success: false,
        message: "Category is not found",
      });
    }
    if (name) category.name = name;
    if (file) {
      const cloudImg = (await uploadCloudinaryImg(file, "Category")) || "";
      category.catImg = cloudImg;
    }
    await category.save();
    return res.status(201).json({
      success: false,
      message: "Category updated successFully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const catId = req.params.id;
  try {
    const category = await Category.findByIdAndDelete(catId);
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
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};
