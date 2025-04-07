import React from "react";
import { Blog } from "../../../lib/api";
import { BookmarkIcon, HeartIcon, PlusIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../components/ui/card";

interface BlogPostSectionProps {
  blogs: Blog[];
  isLoading: boolean;
}

export const BlogPostSection = ({ blogs, isLoading }: BlogPostSectionProps): JSX.Element => {
  // Helper function to format date
  const formatDate = (date: string | { $date: { $numberLong: string } }) => {
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return new Date(parseInt(date.$date.$numberLong)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full px-4 sm:px-8 md:px-12 lg:px-20 mt-8 md:mt-12">
      {blogs.map((blog) => (
        <Card
          key={blog._id}
          className="bg-white flex flex-col border border-[#a8c8e1] shadow-[-1px_-1px_4px_#003b9533,2px_2px_4px_#003b9533] rounded-2xl overflow-hidden"
        >
          <CardHeader className="flex flex-col items-start gap-2 p-3 sm:p-4">
            <h2 className="self-stretch font-bold text-[#0f1419] text-lg sm:text-xl">
              {blog.title}
            </h2>

            <div className="flex flex-wrap items-center gap-1.5">
              {blog.category && (
                <Badge className="px-2.5 py-1 bg-[#003b95] text-white rounded-full font-normal text-xs sm:text-sm">
                  {blog.category}
                </Badge>
              )}
              {blog.subCategory && (
                <Badge className="px-2.5 py-1 bg-[#003b95] text-white rounded-full font-normal text-xs sm:text-sm">
                  {blog.subCategory}
                </Badge>
              )}
            </div>

            <p className="self-stretch font-normal text-[#0f1419] text-sm sm:text-base">
              {blog.summary}
            </p>
          </CardHeader>

          <CardContent className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 pt-0">
            <div className="p-3 sm:p-4 bg-[#c4e0ee] rounded-lg">
              <div className="font-normal text-sm text-[#536471] line-clamp-3">
                {blog.mainContent}
              </div>
              <a href="#" className="font-light text-[#003b95] underline cursor-pointer text-sm mt-1 inline-block">
                Read more
              </a>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1.5">
                  <HeartIcon className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-[#536471] text-xs sm:text-sm">
                    300
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="font-medium text-[#536471] text-xs sm:text-sm">
                    1.2k
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <BookmarkIcon className="w-5 h-5 text-gray-500" />
              </div>
            </div>

            {blog.images && blog.images.length > 0 && (
              <div className="w-full h-28 sm:h-32 overflow-hidden rounded-lg">
                <div className="flex items-center gap-1 h-full">
                  {blog.images.slice(0, 3).map((image, index) => (
                    <div key={index} className="flex-1 h-full">
                      <img
                        src={image.url}
                        alt={`Blog image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex items-center gap-2 p-3 sm:p-4 mt-auto bg-gray-50 rounded-b-2xl">
            <div className="flex items-center gap-2 flex-1">
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                <AvatarFallback>
                  {blog.authorName.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start flex-1">
                <div className="font-bold text-[#0f1419] text-sm sm:text-base self-stretch line-clamp-1">
                  {blog.authorName}
                </div>
                <div className="text-[#536471] text-xs sm:text-sm self-stretch">
                  {formatDate(blog.publicationDate)}
                </div>
              </div>

              <Button className="flex items-center justify-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#003b95] rounded-full text-white text-xs sm:text-sm font-normal">
                <div className="mr-1">Follow</div>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 0C2.6916 0 0 2.1534 0 4.8C0 6.5448 1.1388 8.109 3 8.9604V12L6.204 9.597C9.4182 9.5112 12 7.392 12 4.8C12 2.1534 9.3084 0 6 0ZM6 8.4H5.8002L4.2 9.6V8.1498L3.8154 8.0016C2.202 7.3806 1.2 6.1536 1.2 4.8C1.2 2.8146 3.3534 1.2 6 1.2C8.6466 1.2 10.8 2.8146 10.8 4.8C10.8 6.7854 8.6466 8.4 6 8.4Z" fill="white"/>
                  <path d="M6.6001 2.3999H5.4001V4.1999H3.6001V5.3999H5.4001V7.1999H6.6001V5.3999H8.4001V4.1999H6.6001V2.3999Z" fill="white"/>
                </svg>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}; 