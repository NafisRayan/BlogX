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
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 md:px-12 lg:px-16 py-8">
      {blogs.map((blog) => (
        <article
          key={blog._id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative">
            {blog.coverImage && (
              <img
                src={blog.coverImage.url}
                alt={blog.title}
                className="w-full h-52 object-cover"
              />
            )}
            {/* Category Tag */}
            <div className="absolute top-4 left-4">
              <span className="bg-[#003b95] text-white px-3 py-1 rounded-full text-sm">
                {blog.category}
              </span>
            </div>
            {/* Save/Bookmark Button */}
            <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
              <img src="/bookmark.svg" alt="bookmark" className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-6">
            {/* Title and Author */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-[#002244] line-clamp-2 hover:text-[#003b95] cursor-pointer">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600">
                By <span className="text-[#003b95] font-medium">{blog.author}</span>
              </p>
            </div>

            {/* Summary */}
            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
              {blog.summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#eff6ff] text-[#003b95] px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats and Date */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                {/* Like Button */}
                <button
                  onClick={() => handleLike(blog._id)}
                  className="flex items-center gap-1.5"
                >
                  <img src="/heart.svg" alt="likes" className="w-4 h-4" />
                  <span>{blog.likes}</span>
                </button>
                {/* Views */}
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{blog.views} views</span>
                </div>
                {/* Comments */}
                <div className="flex items-center gap-1.5">
                  <span>💬</span>
                  <span>{blog.comments.length}</span>
                </div>
              </div>
              {/* Date */}
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
