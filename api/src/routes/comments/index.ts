import express from 'express';
import Comment from '../../models/Comment';
import Blog from '../../models/Blog';

const router = express.Router();

// Get comments for a blog
router.get('/blog/:blogId', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const comments = await Comment.find({ blog: req.params.blogId })
      .populate('author', 'name avatarUrl')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-__v');

    const total = await Comment.countDocuments({ blog: req.params.blogId });

    res.json({
      success: true,
      data: comments,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        totalItems: total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching comments' });
  }
});

// Create a comment
router.post('/', async (req, res) => {
  try {
    const { blogId, userId, content } = req.body;

    // Verify blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    const comment = new Comment({
      blog: blogId,
      author: userId,
      content
    });

    await comment.save();

    // Populate author details before sending response
    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'name avatarUrl')
      .select('-__v');

    res.status(201).json({ success: true, data: populatedComment });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Error creating comment' });
  }
});

// Update a comment
router.put('/:id', async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          content,
          updatedAt: new Date()
        } 
      },
      { new: true }
    )
    .populate('author', 'name avatarUrl')
    .select('-__v');

    if (!comment) {
      return res.status(404).json({ success: false, error: 'Comment not found' });
    }

    res.json({ success: true, data: comment });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Error updating comment' });
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, error: 'Comment not found' });
    }

    await comment.deleteOne();

    res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error deleting comment' });
  }
});

export default router;
