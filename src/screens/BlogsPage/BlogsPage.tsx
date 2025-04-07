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
import { BlogCardSection } from "./sections/BlogCardSection";
import { BlogContainerSection } from "./sections/BlogContainerSection";
import { BlogHeaderSection } from "./sections/BlogHeaderSection";
import { BlogPostSection } from "./sections/BlogPostSection";
import { BlogPaginationSection } from "./sections/BlogPaginationSection";
import { blogApi, Blog } from "../../lib/api";
import { toast } from "react-hot-toast";

export const BlogsPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await blogApi.getBlogs(currentPage);
      setBlogs(response.blogs);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error('Failed to fetch blogs');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="bg-[#e0f7fa] flex flex-row justify-center w-full min-h-screen">
      <div className="w-full max-w-[1512px] relative pb-8"> {/* Removed redundant bg, Added padding-bottom */}
        {/* Blog Header Section */}
        <BlogHeaderSection />

        {/* Blog Container Section */}
        <BlogContainerSection />

        {/* Blog Post Section */}
        <BlogPostSection blogs={blogs} isLoading={isLoading} />

        {/* Blog Card Section */}
        <BlogCardSection blogs={blogs} isLoading={isLoading} />

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
