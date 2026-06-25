import { Request, Response } from "express";
import { Order } from "../models/orderModels";
import { AuthRequest } from "../middleware/authMiddleware";
import { User } from "../models/userModels";


export const getAllOrder = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find()
            .populate({
                path: "products.product",
                select: "name images price"
            });
        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Order is not found"
            })
        }
        return res.status(201).json({
            success: true,
            message: "All order received successFully",
            orders
        })
    } catch (error) {
        console.log(error)
        return res.status(501).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const userOrderall = async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not found"
            })
        }
        const order = await Order.find({ user: user._id }).populate({ path: "products.product", select: "name images price" });
        if (!order || order.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Order is not found"
            })
        }
        return res.status(201).json({
            success: true,
            message: "all order resived successFully",
            order
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    const orderId = req.params.id
    const { orderStatus } = req.body
    console.log("BODY =>", req.body);
    console.log("PARAM =>", req.params);
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order is not found"
            })
        }
        if (orderStatus) order.orderStatus = orderStatus;
        await order.save();
        return res.status(201).json({
            success: true,
            message: "order updated successFully",
            order
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "INternal server error"
        })
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    const orderId = req.params.id
    try {
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order is not found"
            })
        }
        return res.status(201).json({
            success: true,
            message: "All order received successFully",
            order
        })
    } catch (error) {
        console.log(error)
        return res.status(501).json({
            success: false,
            message: "Internal server error"
        })
    }
}

