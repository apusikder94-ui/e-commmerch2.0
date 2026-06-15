import { Search } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Navbar = () => {
  return (
    <div className="border-b py-4 px-6 md:px-8">
      <div className="flex items-center justify-between">
        {/* search section */}
        <div className="flex items-center justify-center relative">
          <input
            className="border px-3 py-1.5 rounded-2xl w-64 text-sm"
            placeholder="Search any thing"
          />
          <div className="absolute right-4">
            <Search size={18} className="text-gray-600" />
          </div>
        </div>
        {/* Profile section */}
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
