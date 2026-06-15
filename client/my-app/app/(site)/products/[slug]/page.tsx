"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-start">
        <div className="flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
            alt="productImg"
            className="object-cover h-105 w-full"
          />
        </div>
        <div className="flex flex-col gap-6 items-start justify-start w-full">
          <div className=" pb-4 border-b">
            <p className="text-3xl md:text-5xl leading-tight text-gray-800">Purple Dot Snearkers Snearkers</p>
          </div>
          <div className=" pb-4 border-b w-full">
            <p className="text-3xl text-orange-400">$120.45</p>
          </div>
          <div className=" pb-4 border-b w-full">
            <div className="flex gap-3 border w-28 items-center justify-center py-1">
              <button>-</button>
              <p>01</p>
              <button>+</button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button className="py-2 px-8 rounded-lg">Add to cart</Button>
            <Button className="py-2 px-8 rounded-lg bg-blue-600">Buy Now</Button>

          </div>
        </div>
      </div> 
      <div className="mt-6 pt-6 border-t w-full">
        <h3 className="text-xl font-bold">Description</h3>
        <div className="pt-3">
            apu
        </div>
      </div>
    </div>
  );
};

export default Page;
