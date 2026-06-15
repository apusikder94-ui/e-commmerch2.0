import LeftSidebar from "@/components/admin/LeftSidebar";
import Navbar from "@/components/admin/Navbar";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="grid grid-cols-8">
      <div className="md:col-span-1 border-r h-screen">
        <LeftSidebar />
      </div>
      <div className=" md:col-span-7 flex flex-col w-full">
        <Navbar/>
        {children}</div>
    </div>
  );
};

export default layout;
