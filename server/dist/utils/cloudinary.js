"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCloudinaryImg = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
require("dotenv").config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const uploadCloudinaryImg = async (filePath, folderName) => {
    if (!filePath)
        return null;
    try {
        const uploadResult = await cloudinary_1.v2.uploader.upload(filePath, {
            folder: folderName,
        });
        try {
            fs_1.default.unlinkSync(filePath);
            console.log("local server to images delete successFully");
        }
        catch (error) {
            console.log("local server to images is not deleted");
        }
        return uploadResult.secure_url;
    }
    catch (error) {
        console.log(error);
    }
};
exports.uploadCloudinaryImg = uploadCloudinaryImg;
