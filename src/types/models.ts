export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
}

export interface BlogImage {
  url: string;
  alt: string;
}

export interface Blog {
  _id: string;
  title: string;
  subtitle: string;
  author: User;
  summary: string;
  content: string;
  category: string;
  subcategories: string[];
  travelTags: string[];
  images: BlogImage[];
  status: 'draft' | 'published';
  likes: number;
  comments: number;
  bookmarks: string[];
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  blog: string;
  author: User;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    current: number;
    total: number;
    totalItems: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}
