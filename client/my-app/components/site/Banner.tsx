"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Banner = () => {
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
    <div className="max-w-7xl mx-auto px-6 md:px-8 pt-6">
      <Carousel className="w-full">
        <CarouselContent>
          {banner.map((item) => (
            <CarouselItem key={item.id}>
              <img
                src={item.img}
                alt={`banner-${item.id}`}
                className="w-full h-125 object-cover rounded-sm"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Banner;
