import { BookmarkIcon, HeartIcon, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../../components/ui/card";
import { blogApi } from "../../../../services/api";

interface Blog {
  _id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  coverImage: {
    url: string;
    public_id: string;
  };
  tags: string[];
  category: string;
  likes: number;
  views: number;
  comments: Array<{
    user: string;
    content: string;
    createdAt: string;
  }>;
  createdAt: string;
}

export const BlogCardSection = (): JSX.Element => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogApi.getBlogs();
        setBlogs(response.blogs);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blogs');
        setLoading(false);
        console.error('Error fetching blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

  const handleLike = async (blogId: string) => {
    try {
      await blogApi.likeBlog(blogId);
      // Refresh blogs after like
      const response = await blogApi.getBlogs();
      setBlogs(response.blogs);
    } catch (err) {
      console.error('Failed to like blog:', err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full px-4 sm:px-8 md:px-12 lg:px-20 py-8">
      {blogs.map((blog) => (
        <Card
          key={blog._id}
          className="flex flex-col border border-[#a8c8e1] shadow-[-1px_-1px_4px_#003b9533,2px_2px_4px_#003b9533] rounded-2xl overflow-hidden"
        >
          <CardHeader className="flex flex-col items-start gap-2 p-3 sm:p-4">
            <h2 className="self-stretch font-bold text-[#0f1419] text-lg sm:text-xl">
              {blog.title}
            </h2>

            <div className="flex flex-wrap items-center gap-1.5">
              <Badge
                className="px-2.5 py-1 bg-[#003b95] text-white rounded-full font-normal text-xs sm:text-sm"
              >
                {blog.category}
              </Badge>
              {blog.tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="px-2.5 py-1 bg-[#003b95] text-white rounded-full font-normal text-xs sm:text-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="self-stretch font-normal text-[#0f1419] text-sm sm:text-base">
              {blog.summary}
            </p>
          </CardHeader>

          <CardContent className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 pt-0">
            <div className="p-3 sm:p-4 bg-[#c4e0ee] rounded-lg">
              <div className="font-normal text-sm text-[#536471] line-clamp-3">
                {blog.content}
              </div>
              <a href="#" className="font-light text-[#003b95] underline cursor-pointer text-sm mt-1 inline-block">
                Read more
              </a>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div 
                  className="flex items-center gap-1.5 cursor-pointer" 
                  onClick={() => handleLike(blog._id)}
                >
                  <HeartIcon className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-[#536471] text-xs sm:text-sm">
                    {blog.likes}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <img
                    className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                    src="/group-86-6.png"
                    alt="Comments icon"
                  />
                  <span className="font-medium text-[#536471] text-xs sm:text-sm">
                    {blog.comments.length}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <BookmarkIcon className="w-5 h-5 text-gray-500" />
              </div>
            </div>

            {blog.coverImage && (
              <div className="w-full h-28 sm:h-32 overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover"
                  alt={blog.title}
                  src={blog.coverImage.url}
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex items-center gap-2 p-3 sm:p-4 mt-auto bg-gray-50 rounded-b-2xl">
            <div className="flex items-center gap-2 flex-1">
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                <AvatarFallback>
                  {blog.author.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start flex-1">
                <div className="font-bold text-[#0f1419] text-sm sm:text-base self-stretch line-clamp-1">
                  {blog.author}
                </div>
                <div className="text-[#536471] text-xs sm:text-sm self-stretch">
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              <Button
                className="flex items-center justify-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#003b95] rounded-full text-white text-xs sm:text-sm font-normal"
                size="sm"
              >
                Follow
                <PlusIcon className="w-3 h-3" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};
