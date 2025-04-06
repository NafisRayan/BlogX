import multer from 'multer';
import { Request } from 'express';
import path from 'path';

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter to only allow images
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, PNG and WEBP files are allowed.'));
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  }
});

// Export middleware
export const uploadSingle = upload.single('image');
export const uploadMultiple = upload.array('images', 5); // Max 5 images

// Utility function to get file extension
export const getFileExtension = (file: Express.Multer.File): string => {
  return path.extname(file.originalname).toLowerCase();
};
