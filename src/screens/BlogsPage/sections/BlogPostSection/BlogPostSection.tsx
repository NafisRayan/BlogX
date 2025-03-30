import { BookmarkIcon, HeartIcon, PlusIcon } from "lucide-react";
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

export const BlogPostSection = (): JSX.Element => {
  // Blog post data for mapping
  const blogPosts = [
    {
      id: 1,
      title: "Exciting Adventure in the Alps",
      subtitle: "Travel and you will born for a second time",
      categories: ["Hiking", "Adventure Travel"],
      content:
        "Explore the breathtaking views and thrilling experiences of hiking through the majestic Alps. From scenic trails to challenging peaks, discover why this adventure is a must for nature enthusiasts...",
      likes: 300,
      views: "1.2k",
      images: ["/img-33.png", "/img-34.png", "/img-35.png"],
      author: {
        name: "Sam Guy",
        avatar: "/avatar-11.png",
        publishDate: "December 15, 2024",
      },
      groupIcon: "/group-86-3.png",
    },
    {
      id: 2,
      title: "Exciting Adventure in the Alps",
      subtitle: "Travel and you will born for a second time",
      categories: ["Hiking", "Adventure Travel"],
      content:
        "Explore the breathtaking views and thrilling experiences of hiking through the majestic Alps. From scenic trails to challenging peaks, discover why this adventure is a must for nature enthusiasts...",
      likes: 300,
      views: "1.2k",
      images: ["/img-33.png", "/img-34.png", "/img-35.png"],
      author: {
        name: "Sam Guy",
        avatar: "/avatar-11.png",
        publishDate: "December 15, 2024",
      },
      groupIcon: "/group-86-4.png",
    },
    {
      id: 3,
      title: "Exciting Adventure in the Alps",
      subtitle: "Travel and you will born for a second time",
      categories: ["Hiking", "Adventure Travel"],
      content:
        "Explore the breathtaking views and thrilling experiences of hiking through the majestic Alps. From scenic trails to challenging peaks, discover why this adventure is a must for nature enthusiasts...",
      likes: 300,
      views: "1.2k",
      images: ["/img-33.png", "/img-34.png", "/img-35.png"],
      author: {
        name: "Sam Guy",
        avatar: "/avatar-11.png",
        publishDate: "December 15, 2024",
      },
      groupIcon: "/group-86-5.png",
    },
  ];

  return (
    <div className="flex flex-wrap justify-between w-full gap-4">
      {blogPosts.map((post) => (
        <Card
          key={post.id}
          className="flex flex-col w-[418px] border-[#a8c8e1] shadow-[-1px_-1px_4px_#003b9533,2px_2px_4px_#003b9533] rounded-2xl"
        >
          <CardHeader className="flex flex-col h-[116px] items-start gap-2 pt-5 pb-px px-4">
            <h2 className="self-stretch mt-[-1.00px] font-bold text-[#0f1419] text-xl">
              {post.title}
            </h2>

            <div className="flex items-center gap-1.5">
              {post.categories.map((category, index) => (
                <Badge
                  key={index}
                  className={`h-6 px-3 py-[3px] bg-[#003b95] text-white rounded-[100px] font-normal text-xs ${
                    category === "Adventure Travel" ? "w-[138px]" : "w-[77px]"
                  }`}
                >
                  {category}
                </Badge>
              ))}
            </div>

            <p className="self-stretch font-normal text-[#0f1419] text-base">
              {post.subtitle}
            </p>
          </CardHeader>

          <CardContent className="p-0">
            <div className="flex w-96 h-[134px] items-start justify-center px-[13px] py-[21px] bg-[#c4e0ee] rounded-2xl mx-auto">
              <div className="w-[352px] mt-[-1.00px] font-normal text-sm">
                <span className="text-[#536471]">
                  {post.content}
                  <br />
                </span>
                <span className="font-light text-[#003b95] underline cursor-pointer">
                  Read more
                </span>
              </div>
            </div>

            <div className="flex h-6 items-start justify-between pt-0 pb-4 px-4 w-full">
              <div className="flex items-center gap-6 mb-[-16.00px]">
                <div className="flex items-center gap-2 w-[74.16px]">
                  <HeartIcon className="w-6 h-6" />
                  <span className="font-medium text-[#536471] text-xs">
                    {post.likes}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-[68.45px]">
                  <div
                    className="relative w-[20.11px] h-3.5 bg-[100%_100%]"
                    style={{ backgroundImage: `url(${post.groupIcon})` }}
                  />
                  <span className="font-medium text-[#536471] text-xs mt-[-1.00px]">
                    {post.views}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-[-16.00px]">
                <BookmarkIcon className="w-6 h-6" />
              </div>
            </div>

            <div className="w-96 h-[120px] overflow-hidden">
              <div className="flex items-center gap-1.5">
                {post.images.map((image, index) => (
                  <div
                    key={index}
                    className={`flex flex-col h-[120px] items-start gap-2 ${
                      index === 0
                        ? "w-[140px]"
                        : index === 1
                          ? "w-[177px]"
                          : "w-[163px]"
                    }`}
                  >
                    <img
                      className="flex-1 self-stretch w-full grow object-cover"
                      alt={`Blog image ${index + 1}`}
                      src={image}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex h-[82px] items-center gap-2 px-4 py-2 rounded-[16px_16px_0px_0px]">
            <div className="flex items-center gap-2 flex-1">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.author.avatar} alt="Author avatar" />
                <AvatarFallback>SG</AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start gap-0.5 flex-1">
                <div className="mt-[-1.00px] text-base self-stretch">
                  <span className="font-bold text-[#0f1419]">
                    {post.author.name}
                  </span>
                  <span className="font-medium text-black">&nbsp;</span>
                </div>

                <div className="text-[#536471] text-xs self-stretch">
                  Published on: {post.author.publishDate}
                </div>
              </div>

              <Button className="flex h-6 items-center justify-center gap-[5px] px-3 py-[3px] bg-[#003b95] rounded-[100px] text-white text-xs font-normal">
                Follow
                <PlusIcon className="w-3 h-3" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
