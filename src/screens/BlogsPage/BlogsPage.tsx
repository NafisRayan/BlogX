import React from "react";
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
import { BlogPaginationSection } from "./sections/BlogPaginationSection"; // Import the new component

export const BlogsPage = (): JSX.Element => {
  const navigate = useNavigate();

  // Pagination data
  const paginationItems = [
    { page: 1, active: true },
    { page: 2, active: false },
    { page: 3, active: false },
    { page: 36, active: false },
  ];

  return (
    <main className="bg-[#e0f7fa] flex flex-row justify-center w-full min-h-screen">
      <div className="w-full max-w-[1512px] relative pb-8"> {/* Removed redundant bg, Added padding-bottom */}
        {/* Blog Header Section */}
        <BlogHeaderSection />

        {/* Blog Container Section */}
        <BlogContainerSection />

        {/* Blog Post Section */}
        <BlogPostSection />

        {/* Blog Card Section */}
        <BlogCardSection />

        {/* Removed incorrect BlogPaginationSection usage */}

        {/* Post Blog Button and Pagination */}
        {/* Responsive margins, flex-wrap for small screens */}
        <div className="flex flex-wrap justify-between items-center gap-4 mx-4 sm:mx-8 md:mx-12 lg:mx-20 mt-8">
          <Button
            className="bg-[#003b95] text-white rounded-lg px-6 py-2.5 text-lg sm:text-xl w-full sm:w-auto" // Responsive padding, text size, and width
            onClick={() => navigate('/blog-form')} // Use navigate here
          >
            Post your blog {/* Removed span and specific font family */}
          </Button>

          {/* Use the new BlogPaginationSection component */}
          <BlogPaginationSection paginationItems={paginationItems} />

        </div>
      </div>
    </main>
  );
};
