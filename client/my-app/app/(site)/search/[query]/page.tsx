"use client";

import { addToCart } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { useSearchProductQuery } from "@/store/productApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  const query = params?.query as string;
  const dispatch = useAppDispatch();

  const { data, isLoading } = useSearchProductQuery(
    { query },
    {
      skip: !query,
    }
  );


  const products = data?.product || [];


  if (isLoading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }


  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-10">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          Search Products
        </h2>

        <button className="text-blue-600 font-medium hover:underline">
          View All
        </button>
      </div>


      {
        products.length === 0 ? (

          <div className="text-center py-10">
            <h2 className="text-xl font-semibold">
              Product Not Found
            </h2>
          </div>

        ) : (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

            {
              products.map((product: any) => (

                <div
                  key={product._id}
                  className="bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
                >

                  <Link
                    href={`/products/${product.slug}`}
                    className="overflow-hidden">

                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                  </Link>


                  <div className="p-3">

                    <h3 className="font-medium text-sm line-clamp-2">
                      {product.name}
                    </h3>


                    <div className="flex items-center gap-2 mt-2">

                      <p className="text-lg font-bold text-orange-500">
                        $ {product.discountPrice}
                      </p>


                      {
                        product.price !== product.discountPrice && (
                          <p className="text-sm text-gray-400 line-through">
                            $ {product.price}
                          </p>
                        )
                      }

                    </div>


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

              ))
            }

          </div>

        )
      }


    </section>
  );
};


export default Page;