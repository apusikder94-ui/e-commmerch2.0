"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const categories = [
  {
    id: 1,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
  },
  {
    id: 2,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
  {
    id: 3,
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
  },
  {
    id: 4,
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 5,
    name: "Watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 6,
    name: "Bags",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
  },
  {
    id: 7,
    name: "Gaming",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575",
  },
  {
    id: 8,
    name: "Furniture",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    id: 9,
    name: "Books",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  {
    id: 10,
    name: "Sports",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  },
];

const Category = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Shop By Category</h3>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem
              key={category.id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/5"
            >
              <div className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="p-4 text-center">
                    <h4 className="font-semibold text-gray-800">
                      {category.name}
                    </h4>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>
    </section>
  );
};

export default Category;