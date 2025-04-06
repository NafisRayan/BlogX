import mongoose, { Document, Model } from 'mongoose';

interface IBlogImage {
  url: string;
  alt: string;
}

interface IBlog extends Document {
  title: string;
  subtitle: string;
  author: mongoose.Types.ObjectId;
  summary: string;
  content: string;
  category: string;
  subcategories: string[];
  travelTags: string[];
  images: IBlogImage[];
  status: 'draft' | 'published';
  likes: number;
  comments: number;
  bookmarks: mongoose.Types.ObjectId[];
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subcategories: [{
    type: String
  }],
  travelTags: [{
    type: String
  }],
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  publishedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamps on save
blogSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Blog: Model<IBlog> = mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;
