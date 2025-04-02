import { Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  summary: string;
  author: string;
  coverImage: {
    url: string;
    public_id: string;
  };
  tags: string[];
  category: string;
  readTime: number;
  likes: number;
  views: number;
  comments: {
    user: string;
    content: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogCreateInput {
  title: string;
  content: string;
  summary: string;
  author: string;
  tags: string[];
  category: string;
  readTime: number;
}

export interface BlogUpdateInput extends Partial<BlogCreateInput> {
  coverImage?: {
    url: string;
    public_id: string;
  };
}

export interface BlogFilters {
  search?: string;
  category?: string;
  tags?: string[];
  sortBy?: 'latest' | 'popular' | 'mostLiked';
  page?: number;
  limit?: number;
}
