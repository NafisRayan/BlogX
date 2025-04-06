import { Request, Response } from 'express';
import Blog from '../models/blog.model';
import { uploadImage, deleteImage } from '../config/cloudinary';
import { BlogCreateInput, GetBlogsQuery } from '../types/blog.types';

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, summary, author, category, tags, readTime } = req.body;

    if (!req.file) {
      res.status(400).json({ message: 'Cover image is required' });
      return;
    }

    const result = await uploadImage(req.file.path);

    const newBlog = await Blog.create({
      title,
      content,
      summary,
      author,
      coverImage: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      readTime: Number(readTime) || 5,
      category,
      tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [],
    });

    res.status(201).json(newBlog);
  } catch (error) {
    console.warn('Create blog error:', error);
    res.status(500).json({ message: 'Failed to create blog' });
  }
};

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search?.toString() || '';
    const category = req.query.category?.toString();
    const sortBy = req.query.sortBy?.toString() || 'latest';

    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      query.category = category;
    }

    let sort: any = { createdAt: -1 }; // default to latest
    if (sortBy === 'popular') {
      sort = { views: -1 };
    } else if (sortBy === 'mostLiked') {
      sort = { likes: -1 };
    }

    const total = await Blog.countDocuments(query);
    const pages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    const blogs = await Blog.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.json({
      blogs,
      pagination: {
        total,
        page,
        pages,
      },
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
};

export const likeBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    blog.likes += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    console.error('Like blog error:', error);
    res.status(500).json({ message: 'Failed to like blog' });
  }
};

export const addComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { user, content } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    blog.comments.push({
      user,
      content,
      createdAt: new Date(),
    });

    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    if (blog.coverImage.public_id) {
      await deleteImage(blog.coverImage.public_id);
    }

    await Blog.deleteOne({ _id: id });
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: 'Failed to delete blog' });
  }
};
