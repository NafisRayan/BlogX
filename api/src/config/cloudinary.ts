import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const isCloudinaryConfigured = () => {
  return (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  console.warn('Cloudinary credentials not found. Image upload will use local storage.');
}

export const uploadImage = async (imagePath: string) => {
  try {
    if (!isCloudinaryConfigured()) {
      // For development without Cloudinary: store locally
      const fileName = `${Date.now()}-${path.basename(imagePath)}`;
      const newPath = path.join(uploadsDir, fileName);
      fs.copyFileSync(imagePath, newPath);
      
      // Clean up original file
      fs.unlinkSync(imagePath);
      
      return {
        public_id: fileName,
        secure_url: `http://localhost:5000/uploads/${fileName}`,
      };
    }

    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'blog_images',
    });

    // Clean up original file
    fs.unlinkSync(imagePath);

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    if (!isCloudinaryConfigured()) {
      // For local storage
      const filePath = path.join(uploadsDir, publicId);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return;
    }

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Image deletion error:', error);
    throw error;
  }
};
