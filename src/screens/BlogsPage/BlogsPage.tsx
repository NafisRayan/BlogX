import React, { useState, useEffect } from 'react';
import { blogApi } from '../../services/api';
import { BlogCardSection } from './sections/BlogCardSection';
import { BlogContainerSection } from './sections/BlogContainerSection';
import { BlogHeaderSection } from './sections/BlogHeaderSection';
import { BlogPostSection } from './sections/BlogPostSection';
import { BlogPaginationSection } from './sections/BlogPaginationSection';

export interface BlogFilters {
  page: number;
  limit: number;
  search?: string;
  destination?: string; // Added destination filter
  category?: string;
  subCategory?: string; // Added subCategory filter
  tags?: string[];
  sortBy?: 'latest' | 'popular' | 'mostLiked';
}

export interface BlogData {
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
    readTime: number;
    category: string;
    tags: string[];
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

export const BlogsPage = (): JSX.Element => {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<BlogFilters>({
    page: 1,
    limit: 9,
    sortBy: 'latest',
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogApi.getBlogs(filters);
        setBlogData(response);
      } catch (err) {
        setError('Failed to fetch blogs');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<BlogFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.search ||
            newFilters.category ||
            newFilters.destination ||
            newFilters.subCategory ||
            newFilters.sortBy ? 1 : prev.page,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const paginationItems = blogData
    ? Array.from({ length: blogData.pagination.pages }, (_, i) => ({
        page: i + 1,
        active: i + 1 === filters.page,
      }))
    : [];

  return (
    <main className="bg-[#e0f7fa] flex flex-row justify-center w-full min-h-screen">
      <div className="w-full max-w-[1512px] relative pb-8">
        <BlogHeaderSection
          onSearch={(search) => handleFilterChange({ search })}
        />

        <BlogPostSection />
        
        <BlogContainerSection
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {loading && <div className="text-center py-8">Loading blogs...</div>}
        
        {error && (
          <div className="text-center text-red-500 py-8">{error}</div>
        )}

        {blogData && !loading && !error && (
          <>
            <BlogCardSection
              blogs={blogData.blogs}
              onRefresh={() => handleFilterChange({})}
            />

            {blogData.pagination.pages > 1 && (
              <div className="flex justify-center mt-8">
                <BlogPaginationSection
                  paginationItems={paginationItems}
                  currentPage={filters.page}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};
