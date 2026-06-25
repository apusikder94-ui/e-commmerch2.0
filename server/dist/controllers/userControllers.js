"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserAdmin = exports.createUser = exports.allUser = exports.profile = exports.logout = exports.signIn = exports.signUp = void 0;
const userModels_1 = require("../models/userModels");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = require("../utils/cloudinary");
const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(401).json({
                success: false,
                message: "All field are required",
            });
        }
        const exitingUser = await userModels_1.User.findOne({ email });
        if (exitingUser) {
            return res.status(401).json({
                success: false,
                message: "User already exiting",
            });
        }
        const hashPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await userModels_1.User.create({
            name,
            email,
            password: hashPassword,
        });
        return res.status(201).json({
            success: true,
            message: "User register successFully",
            user: {
                name: user.name,
                email: user.email,
                profilePic: user.profilePic,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All field are required",
            });
        }
        const user = await userModels_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not exiting",
            });
        }
        const isMatchPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(201).json({
            success: true,
            message: "User login successFully",
            user: {
                name: user.name,
                email: user.email,
                profilePic: user.profilePic,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.signIn = signIn;
const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.logout = logout;
const profile = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user"
            });
        }
        const user = await userModels_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User profile received successfully",
            user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
exports.profile = profile;
const allUser = async (req, res) => {
    try {
        const user = await userModels_1.User.find();
        if (!user || user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User is not found"
            });
        }
        return res.status(201).json({
            success: true,
            message: "All User received successFully",
            user
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
exports.allUser = allUser;
const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const file = req.file?.path;
    try {
        const exitEmail = await userModels_1.User.findOne({ email });
        if (exitEmail) {
            return res.status(404).json({
                success: false,
                message: "Email is already exiting"
            });
        }
        const hashPassword = await bcryptjs_1.default.hash(password, 10);
        let cloudUri;
        if (file) {
            cloudUri = await (0, cloudinary_1.uploadCloudinaryImg)(file, "ProfileImg") || "";
        }
        const user = await userModels_1.User.create({
            name,
            email,
            profilePic: cloudUri,
            role,
            password: hashPassword,
        });
        return res.status(201).json({
            success: true,
            message: "User created successFully",
            user
        });
    }
    catch (error) {
    }
};
exports.createUser = createUser;
const updateUserAdmin = async (req, res) => {
    const userId = req.params.id;
    const { name, email, role } = req.body;
    const file = req.file?.path;
    try {
        const user = await userModels_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is not found"
            });
        }
        if (name)
            user.name = name;
        if (email)
            user.email = email;
        if (role)
            user.role = role;
        if (file) {
            const cloudUri = await (0, cloudinary_1.uploadCloudinaryImg)(file, "ProfileImg") || "";
            user.profilePic = cloudUri;
        }
        await user.save();
        return res.status(201).json({
            success: true,
            message: "User udpated successFully"
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
exports.updateUserAdmin = updateUserAdmin;
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModels_1.User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is not found"
            });
        }
        return res.status(201).json({
            success: true,
            message: "User is deleted successFully"
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
exports.deleteUser = deleteUser;
