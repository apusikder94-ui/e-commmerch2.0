import React from "react";
import { LayoutDashboard, ShoppingBag, List, Users } from "lucide-react";
import Link from "next/link";

const LeftSidebar = () => {
  const menu = [
    {
      id: 1,
      name: "Dashboard",
      link: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: 2,
      name: "Product",
      link: "/dashboard/product",
      icon: ShoppingBag,
    },
    {
      id: 3,
      name: "Category",
      link: "/dashboard/category",
      icon: List,
    },
    {
      id: 4,
      name: "User",
      link: "/dashboard/user",
      icon: Users,
    },
  ];

  return (
    <div className="p-4">
      {/* TITLE */}
      <h2 className="text-xl font-bold mb-6 text-blue-700">Admin Panel</h2>

      {/* MENU */}
      <div className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.link}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-black transition"
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSidebar;
