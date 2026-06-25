import { Request, Response } from "express";
import { Product } from "../models/productModels";
import { uploadCloudinaryImg } from "../utils/cloudinary";
import { Category } from "../models/categoryModels";

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, discountPrice, stock, categoryId } =
    req.body;
  const images = req.files as Express.Multer.File[];
  try {
    if (
      !name ||
      !description ||
      !categoryId ||
      !images ||
      !price ||
      !discountPrice ||
      !stock
    ) {
      return res.status(401).json({
        success: false,
        message: "All field are required",
      });
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(401).json({
        success: false,
        message: "Category is not found",
      });
    }
    const resultUri = await Promise.all(
      images.map(async (file) => {
        return (await uploadCloudinaryImg(file.path, "Product")) || "";
      })
    );

    const product = await Product.create({
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
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.find().populate("categoryId");
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
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const productSlug = req.params.slug;
  try {
    const product = await Product.findOne({ slug: productSlug });
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
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updatedProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const { name, description, price, discountPrice, stock, categoryId } =
    req.body;
  const files = req.files as Express.Multer.File[];
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(401).json({
        success: false,
        message: "Product is not found",
      });
    }
    if (name) product.name = name;
    if (description) product.description = description;
    if (files) {
      const resultUri = await Promise.all(
        files.map(async (file) => {
          return (await uploadCloudinaryImg(file.path, "Product")) || "";
        })
      );

      product.images = resultUri;
    }
    if (price) product.price = price;
    if (categoryId) product.categoryId = categoryId;
    if (discountPrice) product.discountPrice = discountPrice;
    if (stock) product.stock = stock;
    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product updated successFully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(productId);
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
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCategoryByProduct = async (
  req: Request,
  res: Response
) => {
  const categorySlug = req.params.slug;

  try {
    // Find Category By Slug
    const category = await Category.findOne({
      slug: categorySlug,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Find Products By Category Id
    const product = await Product.find({
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
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const searchProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const q = req.query.q as string;

    if (!q || q.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const product = await Product.find({
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


  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};