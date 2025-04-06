export interface IBlog {
  _id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  coverImage: {
    url: string;
    public_id: string;
  };
  readTime: number;
  category: string;
  tags: string[];
  likes: number;
  views: number;
  comments: Array<{
    user: string;
    content: string;
    createdAt: Date;
  }>;
  createdAt: Date;
}

export interface BlogCreateInput {
  title: string;
  content: string;
  summary: string;
  author: string;
  coverImage: Express.Multer.File;
  readTime: number;
  category: string;
  tags: string;
}

export interface GetBlogsQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tags?: string[];
  sortBy?: 'latest' | 'popular' | 'mostLiked';
}

export interface GetBlogsResponse {
  blogs: IBlog[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}
