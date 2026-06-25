"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.userOrderall = exports.getAllOrder = void 0;
const orderModels_1 = require("../models/orderModels");
const userModels_1 = require("../models/userModels");
const getAllOrder = async (req, res) => {
    try {
        const orders = await orderModels_1.Order.find()
            .populate({
            path: "products.product",
            select: "name images price"
        });
        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Order is not found"
            });
        }
        return res.status(201).json({
            success: true,
            message: "All order received successFully",
            orders
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Internal server error"
        });
    }
};
exports.getAllOrder = getAllOrder;
const userOrderall = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await userModels_1.User.findById(userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not found"
            });
        }
        const order = await orderModels_1.Order.find({ user: user._id }).populate({ path: "products.product", select: "name images price" });
        if (!order || order.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Order is not found"
            });
        }
        return res.status(201).json({
            success: true,
            message: "all order resived successFully",
            order
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Internal server error"
        });
    }
};
exports.userOrderall = userOrderall;
const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    const { orderStatus } = req.body;
    console.log("BODY =>", req.body);
    console.log("PARAM =>", req.params);
    try {
        const order = await orderModels_1.Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order is not found"
            });
        }
        if (orderStatus)
            order.orderStatus = orderStatus;
        await order.save();
        return res.status(201).json({
            success: true,
            message: "order updated successFully",
            order
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "INternal server error"
        });
    }
};
exports.updateOrder = updateOrder;
const deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await orderModels_1.Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order is not found"
            });
        }
        return res.status(201).json({
            success: true,
            message: "All order received successFully",
            order
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Internal server error"
        });
    }
};
exports.deleteOrder = deleteOrder;
