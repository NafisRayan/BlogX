import axios from 'axios';

interface GetBlogsResponse {
  blogs: Array<{
    _id: string;
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
    likes: number;
    views: number;
    comments: Array<{
      user: string;
      content: string;
      createdAt: string;
    }>;
    createdAt: string;
  }>;
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Blog APIs
export const blogApi = {
  // Get all blogs with pagination and filters
  getBlogs: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    tags?: string[];
    sortBy?: 'latest' | 'popular' | 'mostLiked';
  }) => {
    const response = await api.get<GetBlogsResponse>('/blogs', { params });
    return response.data;
  },

  // Get single blog by ID
  getBlogById: async (id: string) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },

  // Create new blog
  createBlog: async (formData: FormData) => {
    const response = await api.post('/blogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update blog
  updateBlog: async (id: string, formData: FormData) => {
    const response = await api.put(`/blogs/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete blog
  deleteBlog: async (id: string) => {
    await api.delete(`/blogs/${id}`);
  },

  // Like blog
  likeBlog: async (id: string) => {
    const response = await api.post(`/blogs/${id}/like`);
    return response.data;
  },

  // Add comment to blog
  addComment: async (id: string, data: { user: string; content: string }) => {
    const response = await api.post(`/blogs/${id}/comments`, data);
    return response.data;
  },
};

export default api;
