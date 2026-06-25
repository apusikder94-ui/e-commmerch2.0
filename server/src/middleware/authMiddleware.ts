import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

require('dotenv').config()
export interface AuthRequest extends Request {
    userId?: string;
    role?: string;
}

export const authorization = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is not found",
            });
        }

        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as AuthRequest;

        req.userId = decode.userId;
        req.role = decode.role;

        next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};