import mongoose, { Document, Model } from 'mongoose';

interface IComment extends Document {
  blog: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
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

// Update the blog's comment count when a comment is added
commentSchema.post('save', async function(doc) {
  const Blog = mongoose.model('Blog');
  const commentCount = await mongoose.model('Comment').countDocuments({ blog: doc.blog });
  await Blog.findByIdAndUpdate(doc.blog, { comments: commentCount });
});

// Update timestamps on save
commentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Comment: Model<IComment> = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;
