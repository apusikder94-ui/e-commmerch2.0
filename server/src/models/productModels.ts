import mongoose, { Document, model, Schema } from "mongoose";
import { ref } from "process";
import slugify from "slugify";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  categoryId: mongoose.Types.ObjectId;
  images: string[];
  price: string;
  discountPrice: string;
  stock: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: String,
      required: true,
    },
    discountPrice: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    trim: true,
    strict: true,
  });
});

export const Product = model<IProduct>("Product", productSchema);
