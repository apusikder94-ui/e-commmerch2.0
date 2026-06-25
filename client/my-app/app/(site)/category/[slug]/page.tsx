"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetAllProductsBYCategoryQuery } from "@/store/productApi";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { IProduct } from "@/type/type";
import Link from "next/link";

const Page = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetAllProductsBYCategoryQuery({ slug }, {
    skip: !slug,
  });
  console.log(data)

  const products = data?.product || [];



  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Category Products
        </h2>

        <span className="text-sm text-gray-500">
          {products.length} items
        </span>
      </div>

      {/* Loading */}
      {isLoading && (
        <p className="text-gray-500">Loading products...</p>
      )}

      {/* Empty state */}
      {!isLoading && products.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          No products found 😢
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {products.map((product: IProduct) => (
          <div
            key={product._id}
            className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden"
          >

            {/* Image */}
            <Link
              href={`/products/${product.slug}`}
              className="overflow-hidden">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>

            {/* Content */}
            <div className="p-3">
              <h3 className="font-medium text-sm line-clamp-2">
                {product.name}
              </h3>

              <p className="text-lg font-bold text-orange-500 mt-2">
                $ {product.price}
              </p>

              {/* Button */}
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      _id: product._id,
                      name: product.name,
                      slug: product.slug,
                      images: product.images[0],
                      price: product.price,
                      discountPrice: product.discountPrice,
                      quantity: 1
                    })
                  )
                }
                className="w-full mt-3 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;