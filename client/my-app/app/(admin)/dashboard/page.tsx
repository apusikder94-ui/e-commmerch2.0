"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Trash2, 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  TrendingUp, 
  Layers 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useDeleteOrdersMutation, useGetAllOrdersQuery } from "@/store/orderApi";
import { toast } from "sonner";
import ViewOrder from "@/components/admin/ViewOrder";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const [deleteOrders] = useDeleteOrdersMutation();

  const { data, isLoading } = useGetAllOrdersQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-violet-600"></div>
        <p className="text-sm font-bold text-slate-500">Loading Dashboard Metrics...</p>
      </div>
    );
  }

  const orders = data?.orders || [];

  // API response থেকে ডাইনামিক অ্যানালিটিক্স ক্যালকুলেশন
  const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.totalPrice || 0), 0);
  const pendingOrders = orders.filter((order: any) => order.orderStatus === "Pending").length;
  const completedOrders = orders.filter((order: any) => order.orderStatus === "Delivered").length;

  const handleView = (order: any) => {
    setOpen(true);
    setSelect(order);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteOrders({ id }).unwrap();
      toast.success("Order deleted successfully");
    } catch (error) {
      toast.error("Failed to delete the order");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50";
      case "Processing":
        return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50";
      case "Shipped":
        return "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-50";
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-50";
    }
  };

  return (
    <div className=" p-4 sm:p-6 lg:p-8 space-y-8 my-2">
      
      {/* Top Main Heading Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-violet-600 to-indigo-700 p-6 sm:p-8 rounded-3xl text-white shadow-xl shadow-violet-100">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Store Overview</h1>
          <p className="text-sm text-violet-100 font-medium">Real-time sales figures, checkout states, and logistics management.</p>
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-xs font-bold tracking-wide backdrop-blur-md">
          Live Counter: {orders.length} Invoices
        </div>
      </div>

      {/* Grid 1: Analytics Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1: Total Revenue */}
        <Card className="rounded-2xl border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Total Revenue</span>
            <div className="p-2 bg-violet-50 text-violet-600 rounded-xl"><DollarSign size={16} /></div>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-2xl font-black text-slate-900">${totalRevenue.toLocaleString()}</div>
            <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              <TrendingUp size={12} /> Live <span className="text-slate-400 font-medium">gross accumulation</span>
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Total Orders */}
        <Card className="rounded-2xl border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Total Bookings</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><ShoppingBag size={16} /></div>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-2xl font-black text-slate-900">+{orders.length}</div>
            <p className="text-[11px] text-slate-400 font-medium flex items-center gap-0.5 mt-1">
              <Layers size={12} /> Total incoming logs
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Pending Orders */}
        <Card className="rounded-2xl border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Awaiting Action</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><Clock size={16} /></div>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-2xl font-black text-slate-900">{pendingOrders}</div>
            <p className="text-[11px] text-amber-600 font-bold flex items-center gap-0.5 mt-1">
              Requires fullfillment pipelines
            </p>
          </CardContent>
        </Card>

        {/* Card 4: Delivered Orders */}
        <Card className="rounded-2xl border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Successful Shifts</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><ShoppingBag size={16} /></div>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-2xl font-black text-slate-900">{completedOrders}</div>
            <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              Delivered safely to destination
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Grid 2: Orders Operations Management Table */}
      <Card className="rounded-3xl border-slate-200/70 shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b border-slate-100 px-6 py-5">
          <CardTitle className="text-lg font-black text-slate-900">Order Management Queue</CardTitle>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Inspect items, track delivery channels, or update user billing information tables below.</p>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/70 hover:bg-slate-50/70 text-slate-400 font-bold text-[11px] uppercase tracking-wider border-b border-slate-100">
                  <TableHead className="h-11 px-6">Product Details</TableHead>
                  <TableHead className="h-11 px-6">Order ID</TableHead>
                  <TableHead className="h-11 px-6">Customer</TableHead>
                  <TableHead className="h-11 px-6">Address</TableHead>
                  <TableHead className="h-11 px-6">Total Price</TableHead>
                  <TableHead className="h-11 px-6">Payment</TableHead>
                  <TableHead className="h-11 px-6">Logistics Status</TableHead>
                  <TableHead className="h-11 px-6">Date</TableHead>
                  <TableHead className="h-11 px-6 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                {orders.map((order: any) => (
                  <TableRow key={order._id} className="hover:bg-slate-50/40 transition-colors group">
                    
                    {/* Product Info Cell */}
                    <TableCell className="px-6 py-4">
                      <div className="space-y-2">
                        {order.products?.map((item: any) => (
                          <div key={item._id} className="flex items-center gap-3 bg-slate-50/60 p-1.5 pr-3 rounded-xl border border-slate-100 max-w-[220px]">
                            <img
                              src={item.product?.images?.[0] || "https://placehold.co/100x100?text=Product"}
                              alt={item.product?.name}
                              className="h-10 w-10 rounded-lg object-cover bg-white border shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=Product";
                              }}
                            />
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-slate-800 text-xs truncate capitalize">
                                {item.product?.name}
                              </p>
                              <p className="text-[10px] text-slate-400 font-medium">
                                Qty: <span className="font-bold text-slate-600">{item.quantity}</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TableCell>

                    {/* Order ID */}
                    <TableCell className="px-6 font-mono font-bold text-slate-800 text-xs">
                      #{order._id?.slice(0, 8)}...
                    </TableCell>

                    {/* Customer */}
                    <TableCell className="px-6 font-black text-slate-800">
                      {order.shippingAddress?.fullName}
                    </TableCell>

                    {/* Address */}
                    <TableCell className="px-6 text-xs text-slate-500 max-w-[180px]">
                      <p className="truncate font-medium text-slate-700">{order.shippingAddress?.address}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {order.shippingAddress?.city}, {order.shippingAddress?.country}
                      </p>
                    </TableCell>

                    {/* Total Price */}
                    <TableCell className="px-6 font-black text-slate-900 text-base">
                      ${order.totalPrice}
                    </TableCell>

                    {/* Payment Status */}
                    <TableCell className="px-6">
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-md font-bold tracking-wide ${
                        order.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-600"
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </TableCell>

                    {/* Order Status */}
                    <TableCell className="px-6">
                      <Badge variant="outline" className={`border px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-none ${getStatusBadge(order.orderStatus)}`}>
                        {order.orderStatus}
                      </Badge>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="px-6 text-xs text-slate-400 font-medium">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' }) : "N/A"}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-6 text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-lg text-xs font-bold border-slate-200 text-slate-700 hover:bg-slate-50"
                          onClick={() => handleView(order)}
                        >
                          <Eye className="mr-1 h-3.5 w-3.5 text-slate-400" /> View
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700"
                          onClick={() => handleDelete(order._id)}
                        >
                          <Trash2 className="mr-1 h-3.5 w-3.5" /> Delete
                        </Button>
                      </div>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal / Sheet component trigger */}
      <ViewOrder open={open} setOpen={setOpen} select={select} />
    </div>
  );
};

export default Page;