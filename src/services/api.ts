import axios from 'axios';
import { BlogFilters } from '../screens/BlogsPage/BlogsPage';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const blogApi = {
  // Get blogs with filters
  getBlogs: async (filters: BlogFilters) => {
    const params = new URLSearchParams();
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);

    const response = await api.get(`/blogs?${params.toString()}`);
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

  // Like a blog
  likeBlog: async (blogId: string) => {
    const response = await api.post(`/blogs/${blogId}/like`);
    return response.data;
  },

  // Add comment to blog
  addComment: async (blogId: string, comment: { user: string; content: string }) => {
    const response = await api.post(`/blogs/${blogId}/comments`, comment);
    return response.data;
  },

  // Delete blog
  deleteBlog: async (blogId: string) => {
    const response = await api.delete(`/blogs/${blogId}`);
    return response.data;
  },
};
