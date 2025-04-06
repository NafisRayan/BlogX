import express from 'express';
import multer from 'multer';
import path from 'path';
import { 
  createBlog, 
  getBlogs, 
  likeBlog, 
  addComment, 
  deleteBlog 
} from '../controllers/blog.controller';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Ensure uploads directory exists
import fs from 'fs';
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Blog routes
router.post('/', upload.single('coverImage'), createBlog);
router.get('/', getBlogs);
router.post('/:id/like', likeBlog);
router.post('/:id/comments', addComment);
router.delete('/:id', deleteBlog);

export default router;
