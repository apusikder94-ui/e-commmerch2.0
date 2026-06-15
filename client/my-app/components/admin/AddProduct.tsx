"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/store/productApi";
import { useGetAllCategoryQuery } from "@/store/categoryApi";
import { ICategory, IProduct } from "@/type/type";

interface IDialog {
  open: boolean;
  setOpen: (v: boolean) => void;
  selected: IProduct | null;
}

interface IFormData {
  name: string;
  price: string;
  discountPrice: string;
  stock: string;
  description: string;
}

const AddProduct = ({ open, setOpen, selected }: IDialog) => {
  // ================= STATE =================
  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");

  // ================= API =================
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { data } = useGetAllCategoryQuery();

  const categories = data?.category || [];

  // ================= FORM =================
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  // ================= IMAGE HANDLER =================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const fileArray = Array.from(files);

    setImages(fileArray);
    setPreview(fileArray.map((file) => URL.createObjectURL(file)));
  };

  // ================= CLEAN MEMORY =================
  useEffect(() => {
    return () => {
      preview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [preview]);

  // ================= EDIT MODE FIX =================
  useEffect(() => {
    if (!selected) return;

    setValue("name", selected.name || "");
    setValue("description", selected.description || "");
    setValue("price", selected.price || "");
    setValue("discountPrice", selected.discountPrice || "");
    setValue("stock", selected.stock || "");

    // ✅ FIX CATEGORY (IMPORTANT)
    setCategoryId(
      typeof selected.categoryId === "string"
        ? selected.categoryId
        : selected.categoryId?._id || "",
    );

    setPreview(selected.images || []);
  }, [selected, setValue]);

  // ================= REMOVE IMAGE =================
  const handleImgRemove = (index: number) => {
    const newImages = [...images];
    const newPreview = [...preview];

    URL.revokeObjectURL(newPreview[index]);

    newImages.splice(index, 1);
    newPreview.splice(index, 1);

    setImages(newImages);
    setPreview(newPreview);
  };

  // ================= SUBMIT =================
  const onSubmit = async (data: IFormData) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("discountPrice", data.discountPrice);
      formData.append("stock", data.stock);
      formData.append("description", data.description);
      formData.append("categoryId", categoryId);

      images.forEach((img) => {
        formData.append("images", img);
      });

      if (selected) {
        await updateProduct({ id: selected._id, formData }).unwrap();
        toast.success("Product updated");
      } else {
        await createProduct(formData).unwrap();
        toast.success("Product created");
      }

      // RESET
      reset();
      setImages([]);
      setPreview([]);
      setCategoryId("");
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // ================= UI =================
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
          {/* IMAGE UPLOAD */}
          <label className="cursor-pointer w-full p-6 border-2 border-dashed border-violet-500 rounded-xl flex flex-col items-center justify-center gap-3 bg-black/5">
            <Upload className="w-6 h-6" />
            <p className="text-sm text-gray-500">Upload Product Images</p>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>

          {/* PREVIEW */}
          {preview.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {preview.map((img, index) => (
                <div key={index} className="relative">
                  <button
                    type="button"
                    onClick={() => handleImgRemove(index)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                  >
                    <X size={14} />
                  </button>

                  <img
                    src={img}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                </div>
              ))}
            </div>
          )}

          {/* NAME */}
          <Input
            placeholder="Product Name"
            {...register("name", { required: "Name required" })}
          />

          {/* PRICE */}
          <Input type="number" placeholder="Price" {...register("price")} />

          {/* DISCOUNT */}
          <Input
            type="number"
            placeholder="Discount Price"
            {...register("discountPrice")}
          />

          {/* CATEGORY */}
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {categories.map((cat: ICategory) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* STOCK */}
          <Input type="number" placeholder="Stock" {...register("stock")} />

          {/* DESCRIPTION */}
          <Textarea placeholder="Description" {...register("description")} />

          {/* SUBMIT */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {selected ? "Update Product" : "Create Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
