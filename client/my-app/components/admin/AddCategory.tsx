"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Upload, X } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/store/categoryApi";
import { toast } from "sonner";
import { ICategory } from "@/type/type";

interface IDialog {
  open: boolean;
  setOpen: (v: boolean) => void;
  selected: ICategory | null;
}

const AddCategory = ({ open, setOpen, selected }: IDialog) => {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    if (selected) {
      setCategory(selected.name);
      setPreview(selected.catImg);
    } else {
      setCategory("");
      setImage(null);
      setPreview(null);
    }
  }, [selected]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // old preview cleanup
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", category);
    if (image) {
      formData.append("catImg", image);
    }

    try {
      if (selected) {
        await updateCategory({ id: selected._id, formData }).unwrap();
        toast.success("Category Updated Successfully");
      } else {
        await createCategory(formData).unwrap();
        toast.success("Category Created Successfully");
      }
      setCategory("");
      setImage(null);
      setOpen(false);
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setPreview(null);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-4">
          {/* Upload Section */}
          <label className="cursor-pointer flex flex-col items-center justify-center gap-3 border-2 border-dashed border-violet-500 rounded-xl p-6 bg-muted/30">
            <Upload className="w-10 h-10" />

            <p className="text-sm text-muted-foreground">
              Upload Category Image
            </p>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {/* Preview */}
          {preview && (
            <div className="relative w-28 h-28">
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 z-10 bg-red-500 text-white rounded-full p-1"
              >
                <X size={14} />
              </button>

              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg border"
              />
            </div>
          )}

          {/* Category Name */}
          <div className="space-y-2">
            <Label>Category Name</Label>

            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category name"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            {selected ? "Update Category" : " Create Category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
