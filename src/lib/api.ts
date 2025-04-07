const API_BASE_URL = 'http://localhost:5000/api';

export interface Blog {
  _id: string;
  authorName: string;
  title: string;
  publicationDate: string;
  category: string;
  subCategory: string;
  summary: string;
  travelTags: string[];
  mainContent: string;
  images: { url: string; publicId: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogResponse {
  blogs: Blog[];
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
}

export const blogApi = {
  // Get all blogs with pagination
  getBlogs: async (page: number = 1): Promise<BlogResponse> => {
    const response = await fetch(`${API_BASE_URL}/blogs?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    return response.json();
  },

  // Get single blog
  getBlog: async (id: string): Promise<Blog> => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog');
    }
    return response.json();
  },

  // Create blog
  createBlog: async (formData: FormData): Promise<Blog> => {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create blog');
    }
    return response.json();
  },

  // Update blog
  updateBlog: async (id: string, formData: FormData): Promise<Blog> => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update blog');
    }
    return response.json();
  },

  // Delete blog
  deleteBlog: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete blog');
    }
  },
}; 