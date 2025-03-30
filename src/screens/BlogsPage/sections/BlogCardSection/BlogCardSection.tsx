import { BookmarkIcon, HeartIcon, PlusIcon } from "lucide-react"; // Added PlusIcon
import React from "react";
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

export const BlogCardSection = (): JSX.Element => {
  // Blog card data for mapping
  const blogCards = [
    {
      id: 1,
      title: "Exciting Adventure in the Alps",
      subtitle: "Travel and you will born for a second time",
      categories: ["Hiking", "Adventure Travel"],
      description:
        "Explore the breathtaking views and thrilling experiences of hiking through the majestic Alps. From scenic trails to challenging peaks, discover why this adventure is a must for nature enthusiasts...",
      likes: 300,
      comments: "1.2k",
      images: ["/img-33.png", "/img-34.png", "/img-35.png"],
      author: {
        name: "Sam Guy",
        avatar: "/avatar-11.png",
        date: "December 15, 2024",
      },
      commentIcon: "/group-86-6.png",
    },
    {
      id: 2,
      title: "Exciting Adventure in the Alps",
      subtitle: "Travel and you will born for a second time",
      categories: ["Hiking", "Adventure Travel"],
      description:
        "Explore the breathtaking views and thrilling experiences of hiking through the majestic Alps. From scenic trails to challenging peaks, discover why this adventure is a must for nature enthusiasts...",
      likes: 300,
      comments: "1.2k",
      images: ["/img-33.png", "/img-34.png", "/img-35.png"],
      author: {
        name: "Sam Guy",
        avatar: "/avatar-11.png",
        date: "December 15, 2024",
      },
      commentIcon: "/group-86-7.png",
    },
    {
      id: 3,
      title: "Exciting Adventure in the Alps",
      subtitle: "Travel and you will born for a second time",
      categories: ["Hiking", "Adventure Travel"],
      description:
        "Explore the breathtaking views and thrilling experiences of hiking through the majestic Alps. From scenic trails to challenging peaks, discover why this adventure is a must for nature enthusiasts...",
      likes: 300,
      comments: "1.2k",
      images: ["/img-33.png", "/img-34.png", "/img-35.png"],
      author: {
        name: "Sam Guy",
        avatar: "/avatar-11.png",
        date: "December 15, 2024",
      },
      commentIcon: "/group-86-8.png", // Assuming this is the correct icon path
    },
  ];

  return (
    // Responsive grid layout, padding, gap
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full px-4 sm:px-8 md:px-12 lg:px-20 py-8">
      {blogCards.map((card) => (
        <Card
          key={card.id}
          // Removed fixed width, added overflow-hidden
          className="flex flex-col border border-[#a8c8e1] shadow-[-1px_-1px_4px_#003b9533,2px_2px_4px_#003b9533] rounded-2xl overflow-hidden"
        >
          {/* Responsive padding, removed fixed height */}
          <CardHeader className="flex flex-col items-start gap-2 p-3 sm:p-4">
            {/* Responsive text size */}
            <h2 className="self-stretch font-bold text-[#0f1419] text-lg sm:text-xl">
              {card.title}
            </h2>

            {/* Badges wrap naturally */}
            <div className="flex flex-wrap items-center gap-1.5">
              {card.categories.map((category, index) => (
                <Badge
                  key={index}
                  // Responsive padding/text, removed fixed height
                  className="px-2.5 py-1 bg-[#003b95] text-white rounded-full font-normal text-xs sm:text-sm"
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Responsive text size */}
            <p className="self-stretch font-normal text-[#0f1419] text-sm sm:text-base">
              {card.subtitle}
            </p>
          </CardHeader>

          {/* Added padding to CardContent */}
          <CardContent className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 pt-0">
            {/* Description block: responsive padding */}
            <div className="p-3 sm:p-4 bg-[#c4e0ee] rounded-lg">
              {/* Responsive text size, added line-clamp */}
              <div className="font-normal text-sm text-[#536471] line-clamp-3">
                {card.description}
              </div>
              {/* Changed span to anchor */}
              <a href="#" className="font-light text-[#003b95] underline cursor-pointer text-sm mt-1 inline-block">
                Read more
              </a>
            </div>

            {/* Stats section: responsive padding/gap */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Likes */}
                <div className="flex items-center gap-1.5">
                  <HeartIcon className="w-5 h-5 text-red-500" /> {/* Adjusted size/color */}
                  <span className="font-medium text-[#536471] text-xs sm:text-sm">
                    {card.likes}
                  </span>
                </div>
                {/* Comments */}
                <div className="flex items-center gap-1.5">
                  <img // Changed div with background to img
                    className="w-4 h-4 sm:w-5 sm:h-5 object-contain" // Adjusted size
                    src={card.commentIcon}
                    alt="Comments icon"
                  />
                  <span className="font-medium text-[#536471] text-xs sm:text-sm">
                    {card.comments}
                  </span>
                </div>
              </div>
              {/* Bookmark */}
              <div className="flex items-center">
                <BookmarkIcon className="w-5 h-5 text-gray-500" /> {/* Adjusted size/color */}
              </div>
            </div>

            {/* Image section: responsive height, flex layout */}
            <div className="w-full h-28 sm:h-32 overflow-hidden rounded-lg"> {/* Responsive height */}
              <div className="flex items-center gap-1 h-full"> {/* Use gap, ensure full height */}
                {card.images.map((image, index) => (
                  <div
                    key={index}
                    // Use flex-1 for distribution, remove fixed widths
                    className="flex-1 h-full"
                  >
                    <img
                      className="w-full h-full object-cover" // Ensure image covers container
                      alt={`Blog image ${index + 1}`}
                      src={image}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          {/* Footer: responsive padding, removed fixed height */}
          <CardFooter className="flex items-center gap-2 p-3 sm:p-4 mt-auto bg-gray-50 rounded-b-2xl"> {/* Added mt-auto and bg color */}
            <div className="flex items-center gap-2 flex-1">
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10"> {/* Responsive avatar */}
                <AvatarImage src={card.author.avatar} alt={card.author.name} />
                <AvatarFallback>
                  {card.author.name.split(" ").map(n => n[0]).join("")} {/* Better fallback */}
                </AvatarFallback>
              </Avatar>

              {/* Simplified author info, responsive text */}
              <div className="flex flex-col items-start flex-1">
                <div className="font-bold text-[#0f1419] text-sm sm:text-base self-stretch line-clamp-1"> {/* Added line-clamp */}
                  {card.author.name}
                </div>
                <div className="text-[#536471] text-xs sm:text-sm self-stretch">
                  {card.author.date} {/* Simplified date display */}
                </div>
              </div>

              {/* Responsive button, using PlusIcon */}
              <Button
                className="flex items-center justify-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#003b95] rounded-full text-white text-xs sm:text-sm font-normal"
                size="sm" // Keep size sm for smaller button
              >
                Follow
                <PlusIcon className="w-3 h-3" /> {/* Use PlusIcon */}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};
