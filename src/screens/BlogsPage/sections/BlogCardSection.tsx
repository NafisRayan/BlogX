import React from "react";
import { Blog } from "../../../lib/api";

interface BlogCardSectionProps {
  blogs: Blog[];
  isLoading: boolean;
}

export const BlogCardSection = ({ blogs, isLoading }: BlogCardSectionProps): JSX.Element => {
  if (isLoading) {
    return null; // Loading state is handled by BlogPostSection
  }

  if (blogs.length === 0) {
    return null; // Empty state is handled by BlogPostSection
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-4 sm:mx-8 md:mx-12 lg:mx-16 mt-8">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {blog.images && blog.images.length > 0 && (
            <img
              src={blog.images[0].url}
              alt={blog.title}
              className="w-full h-40 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{blog.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{blog.summary}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                By {blog.authorName}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(blog.publicationDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 