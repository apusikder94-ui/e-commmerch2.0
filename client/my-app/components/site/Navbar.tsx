"use client";
import { Search, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import Login from "./Login";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="bg-violet-600 text-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-3 flex items-center justify-between">
        {/* logo section */}
        <div className="flex items-center justify-center">
          <h3 className="text-xl font-bold leading-relaxed italic">
            Shop<span className="text-orange-300">Base</span>
          </h3>
        </div>
        {/* search section */}
        <div className="flex items-center justify-center relative">
          <input
            className="bg-white text-gray-800 text-sm w-106 py-2 px-3 rounded-2xl"
            placeholder="Search product...."
          />
          <div className="absolute right-2 bg-violet-600 p-1 rounded-full">
            <Search size={22} />
          </div>
        </div>
        {/* cta section */}
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => setOpen(true)}
            className="px-6 bg-gray-200 text-black hover:bg-gray-200 hover:text-black"
          >
            Login
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <ShoppingCart />
        </div>
        {/* mobile menu */}
      </div>
      <Login open={open} setOpen={setOpen} />
    </div>
  );
};

export default Navbar;
