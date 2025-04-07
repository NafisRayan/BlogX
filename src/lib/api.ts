const API_BASE_URL = 'http://localhost:5000/api';

// Mock data for development
const MOCK_BLOGS: Blog[] = [
  {
    _id: '1',
    authorName: 'John Doe',
    title: 'Exploring Europe',
    publicationDate: '2024-02-20',
    category: 'travel',
    subCategory: 'hiking',
    summary: 'A journey through European landscapes',
    travelTags: ['alps'],
    mainContent: 'Detailed content about European travel experiences...',
    images: [],
    createdAt: '2024-02-20T00:00:00.000Z',
    updatedAt: '2024-02-20T00:00:00.000Z'
  },
  {
    _id: '2',
    authorName: 'Jane Smith',
    title: 'Asian Cuisine Adventure',
    publicationDate: '2024-02-19',
    category: 'food',
    subCategory: 'recipes',
    summary: 'Exploring Asian culinary delights',
    travelTags: [],
    mainContent: 'Detailed content about Asian cuisine...',
    images: [],
    createdAt: '2024-02-19T00:00:00.000Z',
    updatedAt: '2024-02-19T00:00:00.000Z'
  },
  {
    _id: '3',
    authorName: 'Mike Johnson',
    title: 'North American Road Trip',
    publicationDate: '2024-02-18',
    destination: 'north-america',
    category: 'travel',
    subCategory: 'hiking',
    summary: 'Exploring the national parks of North America',
    travelTags: [],
    mainContent: 'A comprehensive guide to road tripping across North America...',
    images: [],
    createdAt: '2024-02-18T00:00:00.000Z',
    updatedAt: '2024-02-18T00:00:00.000Z'
  }
];

export interface Blog {
  _id: string;
  authorName: string;
  title: string;
  publicationDate: string | { $date: { $numberLong: string } };
  destination?: string; // Made optional since it's not in the database yet
  category: string;
  subCategory: string;
  summary: string;
  travelTags: string[];
  mainContent: string;
  images: { 
    url: string; 
    publicId: string;
    _id?: { $oid: string } 
  }[];
  createdAt: string | { $date: { $numberLong: string } };
  updatedAt: string | { $date: { $numberLong: string } };
  __v?: { $numberInt: string };
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
    try {
      const response = await fetch(`${API_BASE_URL}/blogs?page=${page}`);
      if (!response.ok) {
        throw new Error('Server error: Failed to fetch blogs');
      }
      const data = await response.json();
      console.log('Raw API response:', data);

      // Ensure blogs array exists
      if (!data.blogs || !Array.isArray(data.blogs)) {
        console.error('Invalid API response format:', data);
        return {
          blogs: [],
          currentPage: page,
          totalPages: 0,
          totalBlogs: 0
        };
      }

      // Map the response to ensure all required fields are present
      const blogs = data.blogs.map(blog => ({
        ...blog,
        destination: blog.destination || '', // Provide default value for destination
        category: blog.category || '',
        subCategory: blog.subCategory || '',
        travelTags: blog.travelTags || []
      }));

      return {
        blogs,
        currentPage: data.currentPage || page,
        totalPages: data.totalPages || 1,
        totalBlogs: data.totalBlogs || blogs.length
      };
    } catch (error) {
      console.error('API Error:', error);
      // Return mock data when API fails
      return {
        blogs: MOCK_BLOGS,
        currentPage: page,
        totalPages: 1,
        totalBlogs: MOCK_BLOGS.length
      };
    }
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