"use client";

import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Banner = () => {
  // Autoplay configuration instance
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  const banner = [
    {
      id: 1,
      img: "https://img.lazcdn.com/us/domino/2d2af9a7-f4c5-4ef6-9c44-5e203701b5ab_BD-1976-688.jpg_2200x2200q80.jpg_.avif",
    },
    {
      id: 2,
      img: "https://img.lazcdn.com/us/domino/78ed87b3-873b-42eb-add0-96a9d573f8e6_BD-1976-688.jpg_2200x2200q80.jpg_.avif",
    },
    {
      id: 3,
      img: "https://img.lazcdn.com/us/domino/78ed87b3-873b-42eb-add0-96a9d573f8e6_BD-1976-688.jpg_2200x2200q80.jpg_.avif",
    },
    {
      id: 4,
      img: "https://img.lazcdn.com/us/domino/4c54a4ad-bd35-435b-b4ee-d46d8e44dfe7_BD-1976-688.jpg_2200x2200q80.jpg_.avif",
    },
    {
      id: 5,
      img: "https://img.lazcdn.com/us/domino/f1941017-a8db-403c-a2ee-ab4c18fdeaf4_BD-1976-688.jpg_2200x2200q80.jpg_.avif",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-4 md:pt-6">
      <Carousel 
        plugins={[plugin.current]}
        className="w-full relative group rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {banner.map((item, index) => (
            <CarouselItem key={item.id}>
              <div className="relative w-full h-60 sm:h-70 md:h-80 lg:h-115 xl:h-120">
                <img
                  src={item.img}
                  alt={`ShopBase Promotional Banner ${item.id}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover object-center select-none pointer-events-none"
                />
                {/* Visual dark overlay for better text contrast if you choose to overlay text later */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel controls - Hidden on mobile for swipe gestures, smoothly transitions visible on desktop hover */}
        <CarouselPrevious className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 border-none opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg scale-90 hover:scale-100" />
        <CarouselNext className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 border-none opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg scale-90 hover:scale-100" />
      </Carousel>
    </div>
  );
};

export default Banner;