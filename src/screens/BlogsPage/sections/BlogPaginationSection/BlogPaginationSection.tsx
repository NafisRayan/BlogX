import { BookmarkIcon, HeartIcon } from "lucide-react";
import React from "react";
import { Avatar } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../../components/ui/card";

export const BlogPaginationSection = (): JSX.Element => {
  // Blog post data for reusability
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
      commentIcon: ["/group-86-9.png", "/group-86-10.png", "/group-86-11.png"],
      followIcon: ["/group-87-9.png", "/group-87-10.png", "/group-87-11.png"],
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
      commentIcon: ["/group-86-10.png", "/group-86-10.png", "/group-86-11.png"],
      followIcon: ["/group-87-10.png", "/group-87-10.png", "/group-87-11.png"],
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
      commentIcon: ["/group-86-11.png", "/group-86-10.png", "/group-86-11.png"],
      followIcon: ["/group-87-11.png", "/group-87-10.png", "/group-87-11.png"],
    },
  ];

  return (
    <section className="flex flex-wrap justify-between w-full gap-4 py-8">
      {blogPosts.map((post, index) => (
        <Card
          key={post.id}
          className="flex flex-col w-full md:w-[418px] border-[#a8c8e1] shadow-[-1px_-1px_4px_#003b9533,2px_2px_4px_#003b9533] rounded-2xl"
        >
          <CardHeader className="flex flex-col h-[116px] items-start gap-2 pt-5 pb-px px-4">
            <h2 className="self-stretch mt-[-1px] font-bold text-[#0f1419] text-xl">
              {post.title}
            </h2>

            <div className="flex items-center gap-1.5">
              {post.categories.map((category, idx) => (
                <Badge
                  key={idx}
                  className={`h-6 px-3 py-[3px] bg-[#003b95] text-white rounded-[100px] font-normal text-xs ${idx === 0 ? "w-[77px]" : "w-[138px]"}`}
                >
                  {category}
                </Badge>
              ))}
            </div>

            <p className="self-stretch font-normal text-[#0f1419] text-base">
              {post.subtitle}
            </p>
          </CardHeader>

          <CardContent className="px-0">
            <div className="flex w-96 h-[134px] items-start justify-center gap-2.5 px-[13px] py-[21px] bg-[#c4e0ee] rounded-2xl mx-auto">
              <p className="w-[352px] mt-[-1px] font-normal text-sm">
                <span className="text-[#536471]">
                  {post.content}
                  <br />
                </span>
                <span className="font-light text-[#003b95] underline cursor-pointer">
                  Read more
                </span>
              </p>
            </div>

            <div className="flex h-6 items-start justify-between pt-0 pb-4 px-4 w-full">
              <div className="flex items-center gap-6 mb-[-16px]">
                <div className="flex w-[74.16px] items-center gap-2">
                  <HeartIcon className="w-6 h-6" />
                  <span className="font-medium text-[#536471] text-xs">
                    {post.likes}
                  </span>
                </div>

                <div className="flex w-[68.45px] items-center gap-2">
                  <div
                    className="relative w-[20.11px] h-3.5 bg-[100%_100%]"
                    style={{
                      backgroundImage: `url(${post.commentIcon[index]})`,
                    }}
                  />
                  <span className="mt-[-1px] font-medium text-[#536471] text-xs">
                    {post.views}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-[-16px]">
                <BookmarkIcon className="w-6 h-6" />
              </div>
            </div>

            <div className="relative w-96 h-[120px] overflow-hidden">
              <div className="flex items-center gap-1.5">
                {post.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col h-[120px] items-start gap-2 ${
                      idx === 0
                        ? "w-[140px]"
                        : idx === 1
                          ? "w-[177px]"
                          : "w-[163px]"
                    }`}
                  >
                    <img
                      className="flex-1 self-stretch w-full grow object-cover"
                      alt={`Blog image ${idx + 1}`}
                      src={img}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex h-[82px] items-center gap-2 px-4 py-2 rounded-[16px_16px_0px_0px]">
            <div className="flex items-center gap-2 w-full">
              <Avatar className="w-10 h-10">
                <img
                  className="w-full h-full object-cover"
                  alt="Author avatar"
                  src={post.author.avatar}
                />
              </Avatar>

              <div className="flex flex-col items-start gap-0.5 flex-1">
                <div className="mt-[-1px] text-base self-stretch">
                  <span className="font-bold text-[#0f1419]">
                    {post.author.name}
                  </span>
                  <span className="font-medium text-black">&nbsp;</span>
                </div>

                <div className="text-[#536471] text-xs self-stretch">
                  Published on: {post.author.publishDate}
                </div>
              </div>

              <Button className="w-[88px] h-6 flex items-center justify-center gap-[5px] px-3 py-[3px] bg-[#003b95] rounded-[100px] text-white text-xs font-normal">
                Follow
                <img
                  className="w-3 h-3"
                  alt="Follow icon"
                  src={post.followIcon[index]}
                />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};
