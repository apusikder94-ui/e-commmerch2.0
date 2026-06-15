import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.API_KEY as string,
  api_secret: process.env.API_SECRET as string,
});
export const uploadCloudinaryImg = async (
  filePath: string,
  folderName: string
) => {
  if (!filePath) return null;
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
    });
    try {
      fs.unlinkSync(filePath);
      console.log("local server to images delete successFully");
    } catch (error) {
      console.log("local server to images is not deleted");
    }
    return uploadResult.secure_url;
  } catch (error) {
    console.log(error);
  }
};
