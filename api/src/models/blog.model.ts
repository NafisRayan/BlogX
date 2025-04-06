import { Schema, model } from 'mongoose';
import { IBlog } from '../types/blog.types';

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String, required: true },
  author: { type: String, required: true },
  coverImage: {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
  readTime: { type: Number, required: true, default: 5 }, // Added readTime with default value
  category: { type: String, required: true },
  tags: [{ type: String }],
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  comments: [{
    user: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default model<IBlog>('Blog', blogSchema);
