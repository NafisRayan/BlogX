import { Router } from 'express';
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeBlog,
  addComment,
  uploadMiddleware
} from '../controllers/blog.controller';

const router = Router();

// Blog CRUD routes
router.post('/', uploadMiddleware, createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.put('/:id', uploadMiddleware, updateBlog);
router.delete('/:id', deleteBlog);

// Additional blog routes
router.post('/:id/like', likeBlog);
router.post('/:id/comments', addComment);

export default router;
