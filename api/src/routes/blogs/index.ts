import express from 'express';
import { cloudinary } from '../../config/config';
import { uploadMultiple } from '../../middleware/upload';
import Blog from '../../models/Blog';

const router = express.Router();

// Get all blogs with pagination and filters
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string;
    const tag = req.query.tag as string;

    const query: any = {};
    if (category) query.category = category;
    if (tag) query.travelTags = tag;

    const blogs = await Blog.find(query)
      .populate('author', 'name avatarUrl')
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-__v');

    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      data: blogs,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        totalItems: total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching blogs' });
  }
});

// Get blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name avatarUrl')
      .select('-__v');

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching blog' });
  }
});

// Create new blog with images
router.post('/', uploadMultiple, async (req, res) => {
  try {
    const blogData = req.body;
    const files = req.files as Express.Multer.File[];

    // Upload images to Cloudinary
    const imagePromises = files.map(file => {
      return new Promise<{ url: string; alt: string }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'blog-images',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve({ 
              url: result!.secure_url,
              alt: file.originalname 
            });
          }
        );

        uploadStream.end(file.buffer);
      });
    });

    const uploadedImages = await Promise.all(imagePromises);
    blogData.images = uploadedImages;

    if (blogData.status === 'published') {
      blogData.publishedAt = new Date();
    }

    const blog = new Blog(blogData);
    await blog.save();

    const populatedBlog = await Blog.findById(blog._id)
      .populate('author', 'name avatarUrl');

    res.status(201).json({ success: true, data: populatedBlog });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Error creating blog' });
  }
});

// Update blog
router.put('/:id', uploadMultiple, async (req, res) => {
  try {
    const blogData = req.body;
    const files = req.files as Express.Multer.File[];

    if (files && files.length > 0) {
      // Upload new images to Cloudinary
      const imagePromises = files.map(file => {
        return new Promise<{ url: string; alt: string }>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'blog-images',
            },
            (error, result) => {
              if (error) reject(error);
              else resolve({ 
                url: result!.secure_url,
                alt: file.originalname 
              });
            }
          );

          uploadStream.end(file.buffer);
        });
      });

      const uploadedImages = await Promise.all(imagePromises);
      blogData.images = uploadedImages;
    }

    if (blogData.status === 'published' && !blogData.publishedAt) {
      blogData.publishedAt = new Date();
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: blogData },
      { new: true }
    )
    .populate('author', 'name avatarUrl')
    .select('-__v');

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Error updating blog' });
  }
});

// Delete blog
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    // Delete images from Cloudinary
    const deletePromises = blog.images.map(image => {
      const publicId = image.url.split('/').slice(-1)[0].split('.')[0];
      return cloudinary.uploader.destroy(`blog-images/${publicId}`);
    });

    await Promise.all(deletePromises);
    await blog.deleteOne();

    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error deleting blog' });
  }
});

// Like blog
router.post('/:id/like', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    blog.likes = (blog.likes || 0) + 1;
    await blog.save();

    res.json({ success: true, data: { likes: blog.likes } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error updating blog likes' });
  }
});

// Bookmark blog
router.post('/:id/bookmark', async (req, res) => {
  try {
    const { userId } = req.body;
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    const bookmarkIndex = blog.bookmarks.indexOf(userId);
    if (bookmarkIndex === -1) {
      blog.bookmarks.push(userId);
    } else {
      blog.bookmarks.splice(bookmarkIndex, 1);
    }

    await blog.save();
    res.json({ success: true, data: { bookmarked: bookmarkIndex === -1 } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error updating bookmark status' });
  }
});

export default router;
