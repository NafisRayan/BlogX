import mongoose, { Schema } from 'mongoose';
import { IBlog } from '../types/blog.types';

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true
  },
  coverImage: {
    url: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    }
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: true,
    trim: true
  },
  readTime: {
    type: Number,
    required: true,
    min: 1
  },
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  comments: [{
    user: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Add text index for search functionality
blogSchema.index({
  title: 'text',
  content: 'text',
  summary: 'text',
  tags: 'text'
});

const Blog = mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;
