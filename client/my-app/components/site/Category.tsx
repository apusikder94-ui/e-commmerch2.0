"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useGetAllCategoryQuery } from "@/store/categoryApi";
import Link from "next/link";

const Category = () => {
  const { data } = useGetAllCategoryQuery();
  const categories = data?.category || [];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 select-none">
      {/* Section Header Title */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">
            Shop By Category
          </h3>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Handpicked premium selections curated just for you
          </p>
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full relative group"
      >
        <CarouselContent className="-ml-3 md:-ml-4">
          {categories.map((category) => (
            <CarouselItem
              key={category._id}
              className="pl-3 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <div className="group h-full">
                <Link
                  href={`/category/${category.slug}`}
                  className="flex flex-col items-center text-center h-full p-2 rounded-2xl transition-all duration-300 hover:bg-slate-50"
                >
                  {/* Category Image Frame */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-slate-100 border border-slate-200/60 shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:shadow-md group-hover:border-violet-400">
                    <img
                      src={category?.catImg || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=200&q=80"}
                      alt={category.name}
                      loading="lazy"
                      className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Focus Overlay Tint */}
                    <div className="absolute inset-0 bg-violet-950/0 group-hover:bg-violet-950/5 transition-colors duration-300" />
                  </div>

                  {/* Category Details Text */}
                  <div className="mt-3.5 px-1 w-full">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight group-hover:text-violet-600 transition-colors line-clamp-1">
                      {category.name}
                    </h4>
                  </div>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel controls - Positioned safely away from card touch zones on desktop, hidden on mobile layouts */}
        <CarouselPrevious className="hidden md:flex -left-4 xl:-left-6 bg-white hover:bg-violet-50 text-slate-800 hover:text-violet-600 border border-slate-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CarouselNext className="hidden md:flex -right-4 xl:-right-6 bg-white hover:bg-violet-50 text-slate-800 hover:text-violet-600 border border-slate-200 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Carousel>
    </section>
  );
};

export default Category;