import { ApiResponse, Blog, PaginatedResponse } from '../types/models';
import apiClient from './api-client';

interface BlogQuery {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
}

interface CreateBlogData {
  title: string;
  subtitle: string;
  author: string;
  summary: string;
  content: string;
  category: string;
  subcategories: string[];
  travelTags: string[];
  status: 'draft' | 'published';
}

class BlogService {
  async getBlogs(query: BlogQuery = {}): Promise<PaginatedResponse<Blog>> {
    return apiClient.get('/blogs', { params: query });
  }

  async getBlog(id: string): Promise<ApiResponse<Blog>> {
    return apiClient.get(`/blogs/${id}`);
  }

  async createBlog(data: CreateBlogData, images: File[]): Promise<ApiResponse<Blog>> {
    const formData = new FormData();

    // Append blog data
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => formData.append(key + '[]', item));
      } else {
        formData.append(key, value);
      }
    });

    // Append images
    images.forEach(image => {
      formData.append('images', image);
    });

    return apiClient.post('/blogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  async updateBlog(id: string, data: Partial<CreateBlogData>, images?: File[]): Promise<ApiResponse<Blog>> {
    if (images && images.length > 0) {
      const formData = new FormData();

      // Append blog data
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach(item => formData.append(key + '[]', item));
          } else {
            formData.append(key, value);
          }
        }
      });

      // Append images
      images.forEach(image => {
        formData.append('images', image);
      });

      return apiClient.put(`/blogs/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }

    return apiClient.put(`/blogs/${id}`, data);
  }

  async deleteBlog(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/blogs/${id}`);
  }

  async likeBlog(id: string): Promise<ApiResponse<{ likes: number }>> {
    return apiClient.post(`/blogs/${id}/like`);
  }

  async toggleBookmark(blogId: string, userId: string): Promise<ApiResponse<{ bookmarked: boolean }>> {
    return apiClient.post(`/blogs/${blogId}/bookmark`, { userId });
  }

  async getCategories(): Promise<string[]> {
    const blogs = await this.getBlogs();
    const categories = new Set(blogs.data.map(blog => blog.category));
    return Array.from(categories);
  }

  async getTags(): Promise<string[]> {
    const blogs = await this.getBlogs();
    const tags = new Set(blogs.data.flatMap(blog => blog.travelTags));
    return Array.from(tags);
  }
}

export default new BlogService();
