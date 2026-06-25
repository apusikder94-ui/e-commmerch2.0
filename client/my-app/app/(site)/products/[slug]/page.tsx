"use client";

import { Button } from "@/components/ui/button";
import {
  decreaseQuantity,
  increaseQuantity,
  addToCart,
} from "@/store/cartSlice";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useGetSingleProductQuery } from "@/store/productApi";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);

  const slug = params?.slug as string;

  const dispatch = useAppDispatch();

  const cart = useAppSelector(
    (state) => state.cart.cart
  );


  const { data, isLoading } = useGetSingleProductQuery(
    { slug },
    { skip: !slug }
  );


  const product = data?.product;


  // find current product from cart
  const cartItem = cart.find(
    (item) => item._id === product?._id
  );





  const totalPrice =
    Number(product?.discountPrice || product?.price || 0) *
    quantity;



  const handleAddToCart = () => {

    if (!product) return;


    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        slug: product.slug,
        images: product.images[0],
        price: product.price,
        discountPrice: product.discountPrice,
        quantity: quantity,
      })
    );

  };



  if (isLoading) {
    return <div>Loading...</div>;
  }



  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-start">


        <div className="flex items-center justify-center">

          <img
            src={product?.images?.[0]}
            alt={product?.name}
            className="object-cover h-105 w-full"
          />

        </div>



        <div className="flex flex-col gap-6 items-start justify-start w-full">


          <div className="pb-4 border-b">

            <p className="text-3xl md:text-5xl leading-tight text-gray-800">
              {product?.name}
            </p>

          </div>



          <div className="pb-4 border-b w-full">

            <p className="text-3xl text-orange-400">
              ${totalPrice}
            </p>


            {
              product?.price !== product?.discountPrice && (
                <p className="line-through text-gray-400">
                  ${product?.price}
                </p>
              )
            }

          </div>




          <div className="pb-4 border-b w-full">


            <div className="flex gap-3 border w-28 items-center justify-center py-1">


              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                -
              </button>



              <p>
                {quantity}
              </p>



              <button
                onClick={() => setQuantity(quantity + 1)
                }
              >
                +
              </button>


            </div>


          </div>




          <div className="flex items-center justify-center gap-4">

            <Button
              className="py-2 px-8 rounded-lg"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>


            <Button className="py-2 px-8 rounded-lg bg-blue-600">
              Buy Now
            </Button>


          </div>


        </div>


      </div>



      <div className="mt-6 pt-6 border-t w-full">

        <h3 className="text-xl font-bold">
          Description
        </h3>


        <div className="pt-3">
          {product?.description}
        </div>


      </div>


    </div>
  );
};


export default Page;