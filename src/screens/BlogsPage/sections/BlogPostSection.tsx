import React from "react";
import { Blog } from "../../../lib/api";

interface BlogPostSectionProps {
  blogs: Blog[];
  isLoading: boolean;
}

export const BlogPostSection = ({ blogs, isLoading }: BlogPostSectionProps): JSX.Element => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003b95]"></div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No blogs found. Be the first to post!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 sm:mx-8 md:mx-12 lg:mx-16 mt-8">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {blog.images && blog.images.length > 0 && (
            <img
              src={blog.images[0].url}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-600 mb-4">{blog.summary}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                By {blog.authorName}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(blog.publicationDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 