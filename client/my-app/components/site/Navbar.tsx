"use client";

import React, { useState } from "react";
import { Search, ShoppingCart, LogOut, User, LayoutDashboard, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import Login from "./Login";
import Cart from "./Cart";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useProfileQuery } from "@/store/authApi";

const Navbar = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { data, isLoading } = useProfileQuery();
  const cart = useAppSelector((state) => state.cart.cart);
  const user = data?.user;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!search.trim()) return;
    router.push(`/search/${search.trim()}`);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
    window.location.reload();
  };

  return (
    <div className="bg-violet-600 text-gray-100 shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-95 border-b border-violet-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">

        {/* Left: Logo */}
        <div onClick={() => router.push("/")} className="cursor-pointer shrink-0 transition-transform active:scale-95">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight italic select-none">
            Shop<span className="text-orange-300 font-medium">Base</span>
          </h3>
        </div>

        {/* Center: Desktop Search Bar */}
        <div className="hidden md:block flex-1 max-w-xl mx-4">
          <form onSubmit={handleSearch} className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-500 transition-colors">
              <Search size={18} />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2.5 pl-11 pr-24 rounded-full text-sm text-slate-950 bg-white placeholder-slate-400 ring-2 ring-transparent focus:ring-orange-300 outline-none shadow-md transition-all duration-200"
              placeholder="Search premium products..."
            />
            <div className="absolute inset-y-0 right-1.5 flex items-center gap-1">
              {search && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-full transition-all shadow-sm"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Right Section: User Actions & Cart */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {isLoading ? (
            <span className="text-xs font-medium text-violet-200 animate-pulse bg-white/10 px-3 py-2 rounded-full">Loading...</span>
          ) : user ? (
            /* Account Dropdown Trigger */
            <div className="relative">
              <div
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full cursor-pointer border border-white/10 transition-all select-none active:scale-98"
              >
                <Avatar className="h-7 w-7 border-2 border-orange-300/50">
                  <AvatarImage src={user.profilePic || "https://github.com/shadcn.png"} />
                  <AvatarFallback className="text-slate-900 bg-orange-200 font-bold text-xs">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left leading-tight hidden sm:block">
                  <p className="text-xs font-bold max-w-[100px] truncate">{user.name}</p>
                  <p className="text-[10px] text-violet-200 capitalize font-medium">{user.role}</p>
                </div>
              </div>

              {/* Dropdown Menu */}
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 mt-3 w-56 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-20 py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 sm:hidden border-b border-slate-50 mb-1">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-400 capitalize">{user.role}</p>
                    </div>
                    
                    <button
                      onClick={() => { router.push("/profile"); setMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <User size={16} className="text-slate-400" /> My Profile
                    </button>

                    {user.role === "admin" && (
                      <button
                        onClick={() => { router.push("/admin/dashboard"); setMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <LayoutDashboard size={16} className="text-slate-400" /> Admin Dashboard
                      </button>
                    )}

                    <Separator className="my-1 bg-slate-100" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Button
              onClick={() => setOpen(true)}
              className="bg-white hover:bg-orange-100 text-violet-700 font-bold rounded-full px-5 py-2 text-xs shadow-md transition-all border-none active:scale-95"
            >
              Login
            </Button>
          )}

          {/* Cart Icon */}
          <div
            onClick={() => setCartOpen(true)}
            className="relative cursor-pointer p-2.5 rounded-full hover:bg-white/10 transition-colors active:scale-95"
          >
            <ShoppingCart size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-orange-400 text-white rounded-full w-5 h-5 text-[10px] font-black flex items-center justify-center border-2 border-violet-600 shadow-sm animate-bounce">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom: Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search size={16} />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-2 pl-10 pr-20 rounded-full text-sm text-slate-950 bg-white placeholder-slate-400 ring-2 ring-transparent focus:ring-orange-300 outline-none shadow-inner"
            placeholder="Search premium products..."
          />
          <div className="absolute inset-y-0 right-1.5 flex items-center gap-1">
            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-full transition-colors"
            >
              Go
            </button>
          </div>
        </form>
      </div>

      {/* Popups & Drawer Components */}
      <Login open={open} setOpen={setOpen} />
      <Cart open={cartOpen} setOpen={setCartOpen} />
    </div>
  );
};

export default Navbar;