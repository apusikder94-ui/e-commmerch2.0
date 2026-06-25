"use client";

import { addToCart } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { useGetAllProductsQuery } from "@/store/productApi";
import { IProduct } from "@/type/type";
import Link from "next/link";
import React from "react";
import { ShoppingCart } from "lucide-react";

const Product = () => {
  const { data } = useGetAllProductsQuery();
  const dispatch = useAppDispatch();
  const products = data?.product || [];

  const handleAddToCart = (product: IProduct) => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        slug: product.slug,
        images: product.images[0],
        price: product.price,
        discountPrice: product.discountPrice,
        quantity: 1,
      })
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 select-none">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">
            Featured Products
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Explore our latest premium arrivals and best-selling items
          </p>
        </div>
        <button className="text-sm font-bold text-violet-600 hover:text-violet-700 transition-colors bg-violet-50 hover:bg-violet-100/80 px-4 py-2 rounded-full">
          View All
        </button>
      </div>

      {/* Dynamic Product Responsive Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => {
          // Calculate if item has an active price markdown discount
          const hasDiscount = product.discountPrice && product.discountPrice < product.price;
          const displayPrice = hasDiscount ? product.discountPrice : product.price;

          return (
            <div
              key={product._id}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-200/60 transition-all duration-300 flex flex-col group"
            >
              {/* Product Visual Container Frame */}
              <div className="relative overflow-hidden aspect-square bg-slate-50 w-full shrink-0">
                <Link href={`/products/${product.slug}`} className="block h-full w-full">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* Promotional Discount Percentage Label Badge Overlay */}
                {hasDiscount && (
                  <span className="absolute top-2.5 left-2.5 bg-orange-400 text-white text-[10px] font-black tracking-wider uppercase px-2 py-1 rounded-md shadow-sm">
                    Sale
                  </span>
                )}
              </div>

              {/* Product Description Details Body */}
              <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
                <div className="space-y-1.5">
                  <Link href={`/products/${product.slug}`} className="block group-hover:text-violet-600 transition-colors">
                    <h3 className="font-semibold text-slate-800 text-sm tracking-tight line-clamp-2 h-10 leading-snug">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Core Dynamic Product Retail Price Section */}
                  <div className="flex items-baseline gap-2 flex-wrap pt-0.5">
                    <p className="text-base font-black text-slate-900">
                      ${displayPrice}
                    </p>
                    {hasDiscount && (
                      <p className="text-xs font-medium text-slate-400 line-through">
                        ${product.price}
                      </p>
                    )}
                  </div>
                </div>

                {/* Interactive Action Command Element */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all duration-200 shadow-md shadow-violet-600/10 active:scale-95 flex items-center justify-center gap-2 group/btn"
                >
                  <ShoppingCart size={14} className="group-hover/btn:animate-pulse" />
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Product;