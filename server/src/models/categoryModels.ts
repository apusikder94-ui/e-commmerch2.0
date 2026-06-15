import { Document, model, Schema } from "mongoose";
import slugify from "slugify";

export interface ICategory extends Document {
  name: string;
  slug: string;
  catImg: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    catImg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("save", function (slug) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
    trim: true,
  });
});

export const Category = model<ICategory>("Category", categorySchema);
