import React from 'react';
import { BlogData } from '../../BlogsPage';
import { blogApi } from '../../../../services/api';
import { Clock } from 'lucide-react';

interface BlogCardSectionProps {
  blogs: BlogData['blogs'];
  onRefresh: () => void;
}

export const BlogCardSection: React.FC<BlogCardSectionProps> = ({ blogs, onRefresh }) => {
  const handleLike = async (blogId: string) => {
    try {
      await blogApi.likeBlog(blogId);
      onRefresh();
    } catch (err) {
      console.error('Failed to like blog:', err);
    }
  };

  if (blogs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No blogs found.
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {blogs.map((blog) => (
        <article
          key={blog._id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          {blog.coverImage && (
            <img
              src={blog.coverImage.url}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {blog.summary}
            </p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {blog.readTime} min read
              </span>
              <span className="text-sm text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(blog._id)}
                  className="flex items-center gap-1 text-red-500"
                >
                  <span>❤️</span>
                  <span>{blog.likes}</span>
                </button>
                <div className="flex items-center gap-1 text-gray-500">
                  <span>💬</span>
                  <span>{blog.comments.length}</span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                By {blog.author}
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
