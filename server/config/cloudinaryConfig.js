const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

const cloudinaryConfig = (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  next();
};

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'canteen_images', // Specify the folder where images should be uploaded
    });
    return result;
  } catch (error) {
    throw new Error('Error uploading image to Cloudinary');
  }
};

module.exports = { cloudinaryConfig, uploadImage };

