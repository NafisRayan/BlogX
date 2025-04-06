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
import blogService from "../../../../services/blog-service";
import userService from "../../../../services/user-service";
import { Blog, User } from "../../../../types/models";

export const BlogCardSection = (): JSX.Element => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsResponse, user] = await Promise.all([
          blogService.getBlogs(),
          userService.getCurrentUser()
        ]);
        setBlogs(blogsResponse.data);
        setCurrentUser(user);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLike = async (blogId: string) => {
    try {
      const response = await blogService.likeBlog(blogId);
      setBlogs(prev => 
        prev.map(blog => 
          blog._id === blogId 
            ? { ...blog, likes: response.data.likes }
            : blog
        )
      );
    } catch (err) {
      console.error('Error liking blog:', err);
    }
  };

  const handleBookmark = async (blogId: string) => {
    if (!currentUser) return;

    try {
      const response = await blogService.toggleBookmark(blogId, currentUser._id);
      setBlogs(prev => 
        prev.map(blog => 
          blog._id === blogId 
            ? { 
                ...blog, 
                bookmarks: response.data.bookmarked 
                  ? [...blog.bookmarks, currentUser._id]
                  : blog.bookmarks.filter(id => id !== currentUser._id)
              }
            : blog
        )
      );
    } catch (err) {
      console.error('Error bookmarking blog:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
              <Badge className="px-2.5 py-1 bg-[#003b95] text-white rounded-full font-normal text-xs sm:text-sm">
                {blog.category}
              </Badge>
              {blog.subcategories.map((subcategory, index) => (
                <Badge
                  key={index}
                  className="px-2.5 py-1 bg-[#003b95] text-white rounded-full font-normal text-xs sm:text-sm"
                >
                  {subcategory}
                </Badge>
              ))}
            </div>

            <p className="self-stretch font-normal text-[#0f1419] text-sm sm:text-base">
              {blog.subtitle}
            </p>
          </CardHeader>

          <CardContent className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 pt-0">
            <div className="p-3 sm:p-4 bg-[#c4e0ee] rounded-lg">
              <div className="font-normal text-sm text-[#536471] line-clamp-3">
                {blog.summary}
              </div>
              <a href="#" className="font-light text-[#003b95] underline cursor-pointer text-sm mt-1 inline-block">
                Read more
              </a>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => handleLike(blog._id)}>
                  <HeartIcon className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-[#536471] text-xs sm:text-sm">
                    {blog.likes}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <img
                    className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                    src="/group-86.png"
                    alt="Comments icon"
                  />
                  <span className="font-medium text-[#536471] text-xs sm:text-sm">
                    {blog.comments}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <BookmarkIcon 
                  className={`w-5 h-5 cursor-pointer ${
                    currentUser && blog.bookmarks.includes(currentUser._id)
                      ? 'text-[#003b95] fill-current'
                      : 'text-gray-500'
                  }`}
                  onClick={() => handleBookmark(blog._id)}
                />
              </div>
            </div>

            <div className="w-full h-28 sm:h-32 overflow-hidden rounded-lg">
              <div className="flex items-center gap-1 h-full">
                {blog.images.map((image, index) => (
                  <div key={index} className="flex-1 h-full">
                    <img
                      className="w-full h-full object-cover"
                      alt={image.alt}
                      src={image.url}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex items-center gap-2 p-3 sm:p-4 mt-auto bg-gray-50 rounded-b-2xl">
            <div className="flex items-center gap-2 flex-1">
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                <AvatarImage src={blog.author.avatarUrl || undefined} alt={blog.author.name} />
                <AvatarFallback>
                  {blog.author.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start flex-1">
                <div className="font-bold text-[#0f1419] text-sm sm:text-base self-stretch line-clamp-1">
                  {blog.author.name}
                </div>
                <div className="text-[#536471] text-xs sm:text-sm self-stretch">
                  {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
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
