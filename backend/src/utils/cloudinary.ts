import { v2 as Cloudinary } from 'cloudinary';
import fs from 'fs'
import dotenv from 'dotenv';
dotenv.config()
Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
const uploadImageOnCloudinary = async (localFilePath: any) => {

  try {
    if (!localFilePath) return null;
    const response = await Cloudinary.uploader.upload(localFilePath, {

      resource_type: 'auto'
    })
    console.log("Cloudinary Upload Response", response);
    fs.unlinkSync(localFilePath);
    return {
      url: response.secure_url,
      public_id: response.public_id
    }
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }

}
const deleteImageOnCloudinary = async (publicId: string) => {
  try {
    if (!publicId) return null;
    const response = await Cloudinary.uploader.destroy(publicId, {
      resource_type: 'auto'
    })
    console.log("Cloudinary Delete Response", response);
    return response;
  } catch (error) {
    return null;
  }
}
export { uploadImageOnCloudinary, deleteImageOnCloudinary }
