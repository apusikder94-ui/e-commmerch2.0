"use client";

import { Search, LogOut } from "lucide-react";
import React, { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/store/authApi";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();

      router.push("/");

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-b py-4 px-6 md:px-8">
      <div className="flex items-center justify-between">
        {/* Search Section */}
        <div className="flex items-center relative">
          <input
            className="border px-3 py-1.5 rounded-2xl w-64 text-sm"
            placeholder="Search anything"
          />

          <div className="absolute right-4">
            <Search
              size={18}
              className="text-gray-600"
            />
          </div>
        </div>

        {/* Profile Section */}
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="cursor-pointer"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          {open && (
            <div className="absolute right-0 mt-3 w-40 bg-white border rounded-lg shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-3 text-red-500 hover:bg-gray-100"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;