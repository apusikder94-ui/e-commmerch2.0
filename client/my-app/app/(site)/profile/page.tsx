"use client";

import React from "react";
import {
  User,
  Package,
  Mail,
  Calendar,
  MapPin,
  Clock,
  ShoppingBag,
  Shield,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetAllOrdersUserQuery } from "@/store/orderApi";
import { useProfileQuery } from "@/store/authApi";

const Page = () => {
  const { data: profileData, isLoading } = useProfileQuery();
  const { data: orderData } = useGetAllOrdersUserQuery();

  const user = profileData?.user;
  const orders = orderData?.order || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Shipped":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        <p className="text-sm font-medium text-slate-500">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 my-6 space-y-6">
      
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-slate-50 to-slate-100/50 p-6 rounded-2xl border border-slate-200/60 shadow-sm">
        <div className="h-16 w-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-black shadow-md shadow-indigo-100">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="text-center sm:text-left space-y-0.5">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{user?.name}</h1>
          <p className="text-sm text-slate-500 font-medium">Manage your profile and track recent orders.</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-slate-100 p-1 rounded-xl mb-6 grid grid-cols-2 max-w-[360px] border border-slate-200/40">
          <TabsTrigger value="profile" className="gap-2 font-bold py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <User size={15} /> My Profile
          </TabsTrigger>
          <TabsTrigger value="orders" className="gap-2 font-bold py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Package size={15} /> My Orders
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Profile Info */}
        <TabsContent value="profile" className="focus-visible:outline-none">
          <Card className="rounded-2xl border-slate-200/70 shadow-sm overflow-hidden">
            <CardHeader className="bg-white border-b border-slate-50 px-6 py-5">
              <CardTitle className="text-lg font-bold text-slate-900">Personal Information</CardTitle>
              <CardDescription>Your account credentials and status updates.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3.5 p-4 bg-slate-50/60 rounded-xl border border-slate-100">
                  <Mail size={16} className="text-indigo-600 shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase font-bold tracking-wider text-slate-400">Email Address</p>
                    <p className="font-semibold text-slate-800 text-sm mt-0.5">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 p-4 bg-slate-50/60 rounded-xl border border-slate-100">
                  <Calendar size={16} className="text-indigo-600 shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase font-bold tracking-wider text-slate-400">Joined On</p>
                    <p className="font-semibold text-slate-800 text-sm mt-0.5">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' }) : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 p-4 bg-slate-50/60 rounded-xl border border-slate-100 sm:col-span-2">
                  <Shield size={16} className="text-indigo-600 shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase font-bold tracking-wider text-slate-400">Role</p>
                    <p className="font-bold text-slate-800 text-sm capitalize mt-0.5">{user?.role || "User"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Orders Info (With Address & Products Inside) */}
        <TabsContent value="orders" className="space-y-4 focus-visible:outline-none">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Clock size={18} className="text-slate-500" /> Purchase History
            </h2>
            <Badge variant="secondary" className="font-bold rounded-lg px-2.5 bg-slate-100 text-slate-700">
              Total: {orders.length}
            </Badge>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-white space-y-3">
              <div className="mx-auto w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 border">
                <ShoppingBag size={20} />
              </div>
              <p className="text-sm font-medium text-slate-400">No active orders found.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {orders.map((order: any) => (
                <div
                  key={order._id}
                  className="border border-slate-200/80 rounded-2xl bg-white shadow-sm overflow-hidden"
                >
                  {/* Top Order Meta */}
                  <div className="bg-slate-50/70 p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-slate-800 text-sm">
                          #{order._id}
                        </span>
                        <Badge
                          variant="outline"
                          className={`border px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-none ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </Badge>
                        <Badge className="bg-emerald-600 hover:bg-emerald-600 font-bold text-[10px]">
                          {order.paymentStatus}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 font-medium">
                        Date: {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Total Price</p>
                      <p className="text-lg font-black text-slate-900">${order.totalPrice}</p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 grid gap-5 md:grid-cols-5">
                    
                    {/* Left 3 Columns: Products list */}
                    <div className="md:col-span-3 space-y-3 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Products Info</p>
                      {order.products?.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                          {item.product?.images?.[0] && (
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="h-12 w-12 rounded-lg object-cover border bg-white shrink-0"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-bold text-slate-800 truncate capitalize">
                              {item.product?.name || "Product"}
                            </h4>
                            <p className="text-xs text-slate-400 font-medium mt-0.5">
                              Qty: <span className="text-slate-700 font-bold">{item.quantity}</span> × ${item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right 2 Columns: Shipping address */}
                    <div className="md:col-span-2 space-y-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <MapPin size={13} className="text-slate-400" /> Shipping Address
                      </p>
                      
                      {order.shippingAddress ? (
                        <div className="text-xs text-slate-600 space-y-0.5 bg-violet-50/30 border border-violet-100 p-3 rounded-xl">
                          <p className="font-bold text-slate-800 text-sm">{order.shippingAddress.fullName}</p>
                          <p className="font-medium text-slate-500 mt-1">{order.shippingAddress.address}</p>
                          <p className="font-semibold text-slate-700">
                            {order.shippingAddress.city} - {order.shippingAddress.postalCode}
                          </p>
                          <p className="font-bold text-violet-600 text-[10px] tracking-wider uppercase mt-1">
                            Country: {order.shippingAddress.country}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic">No address provided</p>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;