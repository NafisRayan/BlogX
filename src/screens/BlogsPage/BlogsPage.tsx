import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  // Removed direct Pagination imports, they are now in BlogPaginationSection
} from "../../components/ui/pagination";
import { BlogContainerSection } from "./sections/BlogContainerSection/BlogContainerSection";
import { BlogHeaderSection } from "./sections/BlogHeaderSection";
import { BlogPostSection } from "./sections/BlogPostSection";
import { BlogPaginationSection } from "./sections/BlogPaginationSection";
import { blogApi, Blog } from "../../lib/api";
import { toast } from "react-hot-toast";

// Filter state interface
export interface FilterState {
  destination: string;
  category: string;
  subCategory: string;
  sortBy: string;
}

export const BlogsPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    destination: "",
    category: "",
    subCategory: "",
    sortBy: "newest"
  });

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, filters]);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching blogs with filters:', filters);
      const response = await blogApi.getBlogs(currentPage);
      console.log('API Response:', response);
      
      // Filter and sort blogs client-side for demo purposes
      let filteredBlogs = [...response.blogs];
      console.log('Initial blogs:', filteredBlogs);
      
      // Apply destination filter
      if (filters.destination) {
        console.log('Applying destination filter:', filters.destination);
        filteredBlogs = filteredBlogs.filter(blog => {
          // Safely handle undefined or missing destination
          const blogDestination = blog?.destination || '';
          const filterDestination = filters.destination.toLowerCase();
          console.log('Checking blog:', blog._id, 'destination:', blogDestination);
          return blogDestination.toLowerCase() === filterDestination;
        });
        console.log('Filtered blogs by destination:', filteredBlogs);
      }
      
      // Apply category filter
      if (filters.category) {
        filteredBlogs = filteredBlogs.filter(blog => {
          const blogCategory = blog.category?.toLowerCase() || '';
          const selectedCategory = filters.category.toLowerCase();
          
          // Handle different variations of technology (tech/technology)
          if (selectedCategory === 'technology' && (blogCategory === 'technology' || blogCategory === 'tech')) {
            return true;
          }
          
          // Handle different variations of food categories
          if (selectedCategory === 'food' && (blogCategory === 'food' || blogCategory === 'cuisine' || blogCategory === 'cooking')) {
            return true;
          }
          
          // Direct match for travel
          if (selectedCategory === 'travel' && blogCategory === 'travel') {
            return true;
          }
          
          return false;
        });
      }
      
      // Apply subcategory filter
      if (filters.subCategory) {
        filteredBlogs = filteredBlogs.filter(blog => {
          const blogSubCategory = blog.subCategory?.toLowerCase() || '';
          const selectedSubCategory = filters.subCategory.toLowerCase();
          
          // Handle variations of web development
          if (selectedSubCategory === 'webdev' && 
              (blogSubCategory === 'webdev' || 
               blogSubCategory === 'web development' || 
               blogSubCategory === 'web dev' || 
               blogSubCategory === 'development')) {
            return true;
          }
          
          // Handle variations of recipes
          if (selectedSubCategory === 'recipes' && 
              (blogSubCategory === 'recipes' || 
               blogSubCategory === 'recipe' || 
               blogSubCategory === 'cooking')) {
            return true;
          }
          
          // Direct match for hiking
          if (selectedSubCategory === 'hiking' && blogSubCategory === 'hiking') {
            return true;
          }
          
          return false;
        });
      }
      
      // Apply sorting
      if (filters.sortBy) {
        filteredBlogs.sort((a, b) => {
          switch (filters.sortBy) {
            case 'newest':
              const dateA = typeof a.publicationDate === 'string' ? 
                new Date(a.publicationDate) : 
                new Date(parseInt(a.publicationDate.$date.$numberLong));
              const dateB = typeof b.publicationDate === 'string' ? 
                new Date(b.publicationDate) : 
                new Date(parseInt(b.publicationDate.$date.$numberLong));
              return dateB.getTime() - dateA.getTime();
            case 'oldest':
              const dateC = typeof a.publicationDate === 'string' ? 
                new Date(a.publicationDate) : 
                new Date(parseInt(a.publicationDate.$date.$numberLong));
              const dateD = typeof b.publicationDate === 'string' ? 
                new Date(b.publicationDate) : 
                new Date(parseInt(b.publicationDate.$date.$numberLong));
              return dateC.getTime() - dateD.getTime();
            case 'a-z':
              return a.title.localeCompare(b.title);
            case 'z-a':
              return b.title.localeCompare(a.title);
            default:
              return 0;
          }
        });
      }
      
      setBlogs(filteredBlogs);
      // Update total pages based on filtered results
      setTotalPages(Math.ceil(filteredBlogs.length / 10) || 1);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch blogs');
      // Set empty state rather than keeping stale data
      setBlogs([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <main className="bg-[#e0f7fa] flex flex-row justify-center w-full min-h-screen">
      <div className="w-full max-w-[1512px] relative pb-8"> {/* Removed redundant bg, Added padding-bottom */}
        {/* Blog Header Section */}
        <BlogHeaderSection />

        {/* Blog Container Section */}
        <BlogContainerSection 
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Blog Post Section */}
        <BlogPostSection blogs={blogs} isLoading={isLoading} />

        {/* Post Blog Button and Pagination */}
        {/* Responsive margins, flex-wrap for small screens */}
        <div className="flex flex-wrap justify-between items-center gap-6 mx-4 sm:mx-8 md:mx-12 lg:mx-16 mt-12">
          <Button
            className="bg-[#003b95] text-white rounded-lg px-6 py-2.5 text-lg sm:text-xl w-full sm:w-auto" // Responsive padding, text size, and width
            onClick={() => navigate('/blog-form')} // Use navigate here
          >
            Post your blog {/* Removed span and specific font family */}
          </Button>

          <BlogPaginationSection
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

        </div>
      </div>
    </main>
  );
};
