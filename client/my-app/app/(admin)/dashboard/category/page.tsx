"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Edit, Trash } from "lucide-react";
import AddCategory from "@/components/admin/AddCategory";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "@/store/categoryApi";
import { ICategory } from "@/type/type";
import { toast } from "sonner";

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<null | ICategory>(null);
  const { data, isLoading } = useGetAllCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const categories = data?.category || [];

  const handleUpdate = (cat: ICategory) => {
    setSelected(cat);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteCategory({ id });
    toast.success("Category delete successFully");
  };

  return (
    <div className="p-8 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Category Page</h3>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Category
        </button>
      </div>

      {/* TABLE */}
      <div className="border rounded-2xl p-4">
        <Table>
          <TableCaption>List of all categories</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.map((cat, index) => (
              <TableRow key={cat._id}>
                {/* ID */}
                <TableCell className="font-medium">{index + 1}</TableCell>

                {/* IMAGE */}
                <TableCell>
                  <img
                    src={cat.catImg}
                    alt={cat.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                </TableCell>

                {/* NAME */}
                <TableCell>{cat.name}</TableCell>

                {/* SLUG */}
                <TableCell>{cat.slug}</TableCell>

                {/* ACTION */}
                <TableCell className="text-right space-x-3">
                  <button
                    onClick={() => handleUpdate(cat)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AddCategory open={open} setOpen={setOpen} selected={selected} />
    </div>
  );
};

export default Page;
