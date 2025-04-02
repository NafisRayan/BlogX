import { Request, Response } from 'express';
import multer from 'multer';
import Blog from '../models/blog.model';
import { BlogCreateInput, BlogUpdateInput, BlogFilters } from '../types/blog.types';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary';

// Multer configuration for file upload
const upload = multer({ dest: 'uploads/' });
export const uploadMiddleware = upload.single('coverImage');

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogData: BlogCreateInput = req.body;
    const file = req.file;

    if (!file) {
      res.status(400).json({ message: 'Cover image is required' });
      return;
    }

    // Upload image to Cloudinary
    const cloudinaryResponse = await uploadToCloudinary(file);

    const blog = new Blog({
      ...blogData,
      coverImage: {
        url: cloudinaryResponse.url,
        public_id: cloudinaryResponse.public_id
      }
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ message: 'Failed to create blog' });
  }
};

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters: BlogFilters = req.query;
    const page = parseInt(filters.page?.toString() || '1');
    const limit = parseInt(filters.limit?.toString() || '10');
    const skip = (page - 1) * limit;

    let query = Blog.find();

    // Apply filters
    if (filters.search) {
      query = query.find({ $text: { $search: filters.search } });
    }
    if (filters.category) {
      query = query.find({ category: filters.category });
    }
    if (filters.tags && filters.tags.length > 0) {
      query = query.find({ tags: { $in: filters.tags } });
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'popular':
        query = query.sort({ views: -1 });
        break;
      case 'mostLiked':
        query = query.sort({ likes: -1 });
        break;
      default:
        query = query.sort({ createdAt: -1 });
    }

    const total = await Blog.countDocuments(query.getQuery());
    const blogs = await query.skip(skip).limit(limit);

    res.json({
      blogs,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
};

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ message: 'Failed to fetch blog' });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogData: BlogUpdateInput = req.body;
    const file = req.file;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    // Handle image update if new file is provided
    if (file) {
      // Delete old image from Cloudinary
      if (blog.coverImage.public_id) {
        await deleteFromCloudinary(blog.coverImage.public_id);
      }

      // Upload new image
      const cloudinaryResponse = await uploadToCloudinary(file);
      blogData.coverImage = {
        url: cloudinaryResponse.url,
        public_id: cloudinaryResponse.public_id
      };
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: blogData },
      { new: true }
    );

    res.json(updatedBlog);
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ message: 'Failed to update blog' });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    // Delete image from Cloudinary
    if (blog.coverImage.public_id) {
      await deleteFromCloudinary(blog.coverImage.public_id);
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: 'Failed to delete blog' });
  }
};

export const likeBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    blog.likes += 1;
    await blog.save();

    res.json({ likes: blog.likes });
  } catch (error) {
    console.error('Like blog error:', error);
    res.status(500).json({ message: 'Failed to like blog' });
  }
};

export const addComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, content } = req.body;
    if (!user || !content) {
      res.status(400).json({ message: 'User and content are required' });
      return;
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    blog.comments.push({ user, content, createdAt: new Date() });
    await blog.save();

    res.status(201).json(blog.comments[blog.comments.length - 1]);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
};
