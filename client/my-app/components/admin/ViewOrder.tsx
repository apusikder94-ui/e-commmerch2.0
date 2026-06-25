"use client";

import React, { useEffect, useState } from "react";
import { 
    Calendar, 
    CreditCard, 
    Package, 
    Truck, 
    User, 
    MapPin, 
    Hash, 
    CheckCircle2,
    RefreshCw
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useUpdateOrdersMutation } from "@/store/orderApi";

interface Props {
    open: boolean;
    setOpen: (v: boolean) => void;
    select: any;
}

const ViewOrder = ({ open, setOpen, select }: Props) => {
    const [updateOrders, { isLoading }] = useUpdateOrdersMutation();
    const [status, setStatus] = useState("Pending");

    useEffect(() => {
        if (select?.orderStatus) {
            setStatus(select.orderStatus);
        }
    }, [select]);

    if (!select) return null;

    const getStatusColor = (orderStatus: string) => {
        switch (orderStatus) {
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

    const handleUpdateStatus = async () => {
        try {
            await updateOrders({
                id: select._id,
                orderStatus: status,
            }).unwrap();

            toast.success("Order status updated successfully");
            setOpen(false);
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="min-w-3xl mx-auto max-h-[92vh] overflow-y-auto p-0 rounded-2xl border-none shadow-2xl bg-white">
                
                {/* Modern Sticky Header */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-md px-6 py-5 border-b border-slate-100 z-10 flex items-center justify-between">
                    <DialogHeader>
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-mono bg-slate-100 px-2.5 py-1 rounded-md w-fit mb-1">
                            <Hash size={12} /> ID: {select._id}
                        </div>
                        <DialogTitle className="text-2xl font-black tracking-tight text-slate-900">
                            Order Overview
                        </DialogTitle>
                    </DialogHeader>
                </div>

                <div className="p-6 space-y-6">
                    {/* Top Grid: Info & Shipping */}
                    <div className="grid md:grid-cols-2 gap-6">
                        
                        {/* Order Info Block */}
                        <div className="bg-slate-50/60 rounded-2xl p-5 border border-slate-100 space-y-4">
                            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                                <Package size={18} className="text-indigo-600" /> Order Information
                            </h2>
                            <Separator className="bg-slate-200/60" />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-slate-400 font-medium">Total Price</p>
                                    <p className="font-black text-2xl text-slate-900 mt-0.5">${select.totalPrice}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-medium">Payment Status</p>
                                    <Badge className={`mt-1.5 border px-2.5 py-0.5 rounded-full text-xs font-bold shadow-none ${
                                        select.paymentStatus === "Paid" ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-rose-100 text-rose-800 border-rose-200"
                                    }`}>
                                        {select.paymentStatus}
                                    </Badge>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                                        <Calendar size={12} /> Order Date & Time
                                    </p>
                                    <p className="text-sm font-semibold text-slate-700 mt-0.5">
                                        {new Date(select.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Info Block */}
                        <div className="bg-slate-50/60 rounded-2xl p-5 border border-slate-100 space-y-4">
                            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                                <Truck size={18} className="text-indigo-600" /> Shipping Details
                            </h2>
                            <Separator className="bg-slate-200/60" />
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-2.5">
                                    <User size={15} className="text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Customer Name</p>
                                        <p className="font-semibold text-slate-800">{select.shippingAddress?.fullName}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <MapPin size={15} className="text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium">Delivery Address</p>
                                        <p className="font-semibold text-slate-800">
                                            {select.shippingAddress?.address}, {select.shippingAddress?.city}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            Postal Code: {select.shippingAddress?.postalCode} • {select.shippingAddress?.country}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Controller Dashboard */}
                    <div className="bg-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-indigo-100">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="space-y-1">
                                <h2 className="font-bold text-lg flex items-center gap-2">
                                    Management Controls
                                </h2>
                                <p className="text-xs text-indigo-200">
                                    Update current log pipeline and notify vendor/customer.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <Badge variant="outline" className={`border px-3 py-1 rounded-xl text-xs font-bold bg-white/10 text-white ${getStatusColor(status)}`}>
                                    {status}
                                </Badge>

                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger className="w-[180px] bg-white text-slate-900 border-none rounded-xl font-medium h-10 shadow-sm">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-100">
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="Processing">Processing</SelectItem>
                                        <SelectItem value="Shipped">Shipped</SelectItem>
                                        <SelectItem value="Delivered">Delivered</SelectItem>
                                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button
                                    disabled={isLoading}
                                    onClick={handleUpdateStatus}
                                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-10 px-5 font-bold shadow-md transition-all flex items-center gap-2"
                                >
                                    {isLoading ? <RefreshCw size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                                    Update
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid Section */}
                    <div className="space-y-4">
                        <h2 className="font-extrabold text-slate-900 text-lg flex items-center gap-2 px-1">
                            <Package size={20} className="text-slate-700" /> Items Summary ({select.products?.length || 0})
                        </h2>
                        
                        <div className="grid gap-3">
                            {select.products?.map((item: any, index: number) => (
                                <div
                                    key={index}
                                    className="border border-slate-100 rounded-2xl p-4 flex gap-4 bg-white hover:bg-slate-50/50 transition-all items-center shadow-sm"
                                >
                                    <img
                                        src={item.product?.images?.[0] || "/placeholder-image.png"}
                                        alt={item.product?.name}
                                        className="w-20 h-20 rounded-xl object-cover border border-slate-100 bg-slate-50"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-slate-900 text-base truncate">
                                            {item.product?.name}
                                        </h3>
                                        <p className="text-xs font-mono text-slate-400 mt-0.5">PID: {item.product?._id}</p>
                                        
                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mt-2 text-sm">
                                            <p className="text-slate-500 font-medium">
                                                Price: <span className="text-slate-900 font-bold">${item.price}</span>
                                            </p>
                                            <p className="text-slate-500 font-medium">
                                                Qty: <span className="text-slate-900 font-bold">{item.quantity}</span>
                                            </p>
                                            <p className="text-slate-500 font-medium ml-auto">
                                                Subtotal: <span className="text-indigo-600 font-black">${item.price * item.quantity}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewOrder;