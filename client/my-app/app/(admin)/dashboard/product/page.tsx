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
import AddProduct from "@/components/admin/AddProduct";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/store/productApi";
import { IProduct } from "@/type/type";

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<IProduct | null>(null);
  const [deleteProduct] = useDeleteProductMutation();

  const { data, isLoading, isError } = useGetAllProductsQuery();

  const products = data?.product ?? [];

  const handleUpdate = (product: IProduct) => {
    setSelected(product);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
  };

  return (
    <div className="p-8 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Product Page</h3>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      {/* LOADING STATE */}
      {isLoading && <p className="text-gray-500">Loading products...</p>}

      {/* ERROR STATE */}
      {isError && <p className="text-red-500">Failed to load products</p>}

      {/* EMPTY STATE */}
      {!isLoading && products.length === 0 && (
        <p className="text-gray-500">No products found</p>
      )}

      {/* TABLE */}
      <div className="border rounded-2xl p-4 overflow-x-auto">
        <Table>
          <TableCaption>List of all products</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product._id}>
                {/* ID */}
                <TableCell className="font-medium">{index + 1}</TableCell>

                {/* IMAGE */}
                <TableCell>
                  {product.images?.length ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-md" />
                  )}
                </TableCell>

                {/* NAME */}
                <TableCell>{product.name}</TableCell>

                {/* SLUG */}
                <TableCell>{product.slug ?? "-"}</TableCell>

                {/* PRICE */}
                <TableCell>${product.price}</TableCell>

                {/* DISCOUNT */}
                <TableCell>${product.discountPrice ?? 0}</TableCell>

                {/* STOCK */}
                <TableCell>{product.stock}</TableCell>

                {/* ACTION */}
                <TableCell className="text-right space-x-3">
                  <button
                    onClick={() => handleUpdate(product)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
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

      {/* ADD PRODUCT MODAL */}
      <AddProduct open={open} setOpen={setOpen} selected={selected} />
    </div>
  );
};

export default Page;
