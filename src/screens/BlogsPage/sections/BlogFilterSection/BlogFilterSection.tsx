import { BookmarkIcon, HeartIcon } from "lucide-react";
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

export const BlogFilterSection = (): JSX.Element => {
  // Blog post data for mapping
  const blogPosts = [
    {
      id: 1,
      title: "Exciting Adventure in the Alps",
      subtitle: "Travel and you will born for a second time",
      categories: [
        { name: "Hiking", id: 1 },
        { name: "Adventure Travel", id: 2 },
      ],
      excerpt:
        "Explore the breathtaking views and thrilling experiences of hiking through the majestic Alps. From scenic trails to challenging peaks, discover why this adventure is a must for nature enthusiasts...",
      likes: 300,
      comments: "1.2k",
      images: [
        { src: "/img-33.png", alt: "Img" },
        { src: "/img-34.png", alt: "Img" },
        { src: "/img-35.png", alt: "Img" },
      ],
      author: {
        name: "Sam Guy",
        avatar: "/avatar-11.png",
        publishDate: "December 15, 2024",
      },
      commentIcon: ["/group-86.png", "/group-86-1.png", "/group-86-2.png"],
      followIcon: ["/group-87.png", "/group-87-1.png", "/group-87-2.png"],
    },
    {
      id: 2,
      title: "Exciting Adventure in the Alps",
      subtitle: "Travel and you will born for a second time",
      categories: [
        { name: "Hiking", id: 1 },
        { name: "Adventure Travel", id: 2 },
      ],
      excerpt:
        "Explore the breathtaking views and thrilling experiences of hiking through the majestic Alps. From scenic trails to challenging peaks, discover why this adventure is a must for nature enthusiasts...",
      likes: 300,
      comments: "1.2k",
      images: [
        { src: "/img-33.png", alt: "Img" },
        { src: "/img-34.png", alt: "Img" },
        { src: "/img-35.png", alt: "Img" },
      ],
      author: {
        name: "Sam Guy",
        avatar: "/avatar-11.png",
        publishDate: "December 15, 2024",
      },
      commentIcon: ["/group-86.png", "/group-86-1.png", "/group-86-2.png"],
      followIcon: ["/group-87.png", "/group-87-1.png", "/group-87-2.png"],
    },
    {
      id: 3,
      title: "Exciting Adventure in the Alps",
      subtitle: "Travel and you will born for a second time",
      categories: [
        { name: "Hiking", id: 1 },
        { name: "Adventure Travel", id: 2 },
      ],
      excerpt:
        "Explore the breathtaking views and thrilling experiences of hiking through the majestic Alps. From scenic trails to challenging peaks, discover why this adventure is a must for nature enthusiasts...",
      likes: 300,
      comments: "1.2k",
      images: [
        { src: "/img-33.png", alt: "Img" },
        { src: "/img-34.png", alt: "Img" },
        { src: "/img-35.png", alt: "Img" },
      ],
      author: {
        name: "Sam Guy",
        avatar: "/avatar-11.png",
        publishDate: "December 15, 2024",
      },
      commentIcon: ["/group-86.png", "/group-86-1.png", "/group-86-2.png"],
      followIcon: ["/group-87.png", "/group-87-1.png", "/group-87-2.png"],
    },
  ];

  return (
    <section className="flex w-full items-center justify-between">
      {blogPosts.map((post, index) => (
        <Card
          key={post.id}
          className={`flex flex-col w-[418px] items-center justify-center gap-[11px] bg-white rounded-2xl border border-solid border-[#a8c8e1] shadow-[-1px_-1px_4px_#003b9533,2px_2px_4px_#003b9533] ${index === 2 ? "mr-[-1.00px]" : ""}`}
        >
          <CardHeader className="flex flex-col h-[116px] items-start gap-2 pt-5 pb-px px-4 w-full rounded-[0px_0px_16px_16px]">
            <h2 className="self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-[#0f1419] text-xl tracking-[0] leading-[normal]">
              {post.title}
            </h2>

            <div className="inline-flex items-center gap-1.5">
              {post.categories.map((category) => (
                <Badge
                  key={category.id}
                  className={`flex ${category.name === "Hiking" ? "w-[77px]" : "w-[138px]"} h-6 items-center justify-center gap-2.5 px-3 py-[3px] bg-[#003b95] rounded-[100px]`}
                >
                  <span className="w-fit [font-family:'Inter',Helvetica] font-normal text-white text-xs tracking-[0] leading-[normal]">
                    {category.name}
                  </span>
                </Badge>
              ))}
            </div>

            <p className="self-stretch [font-family:'Inter',Helvetica] font-normal text-[#0f1419] text-base tracking-[0] leading-[normal]">
              {post.subtitle}
            </p>
          </CardHeader>

          <CardContent className="p-0 w-full">
            <div className="flex w-96 h-[134px] items-start justify-center gap-2.5 px-[13px] py-[21px] bg-[#c4e0ee] rounded-2xl">
              <p className="w-[352px] mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-sm tracking-[0] leading-[normal]">
                <span className="text-[#536471]">
                  {post.excerpt}
                  <br />
                </span>
                <span className="font-light text-[#003b95] underline cursor-pointer">
                  Read more
                </span>
              </p>
            </div>

            <div className="flex h-6 items-start justify-between pt-0 pb-4 px-4 w-full">
              <div className="inline-flex items-center justify-center gap-6 mb-[-16.00px]">
                <div className="flex w-[74.16px] items-center gap-2">
                  <HeartIcon className="w-6 h-6" />
                  <span className="font-medium text-[#536471] text-xs w-fit [font-family:'Inter',Helvetica] tracking-[0] leading-[normal]">
                    {post.likes}
                  </span>
                </div>

                <div className="flex w-[68.45px] items-center gap-2">
                  <div
                    className={`relative w-[20.11px] h-3.5 bg-[url(${post.commentIcon[index]})] bg-[100%_100%]`}
                  />
                  <span className="w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-[#536471] text-xs tracking-[0] leading-[normal]">
                    {post.comments}
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 mb-[-16.00px]">
                <BookmarkIcon className="w-6 h-6" />
              </div>
            </div>

            <div className="w-96 h-[120px] overflow-hidden">
              <div className="inline-flex items-center gap-1.5">
                {post.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`flex flex-col ${
                      imgIndex === 0
                        ? "w-[140px]"
                        : imgIndex === 1
                          ? "w-[177px]"
                          : "w-[163px]"
                    } h-[120px] items-start gap-2`}
                  >
                    <img
                      className="flex-1 self-stretch w-full grow object-cover"
                      alt={image.alt}
                      src={image.src}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex h-[82px] items-center gap-2 px-4 py-2 w-full rounded-[16px_16px_0px_0px]">
            <div className="flex items-center gap-2 flex-1 grow">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.author.avatar} alt="Author avatar" />
                <AvatarFallback>SG</AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start gap-0.5 flex-1 grow">
                <div className="mt-[-1.00px] text-base self-stretch [font-family:'Inter',Helvetica] font-normal tracking-[0] leading-[normal]">
                  <span className="font-bold text-[#0f1419]">
                    {post.author.name}
                  </span>
                  <span className="font-medium text-black">&nbsp;</span>
                </div>

                <div className="text-[#536471] text-xs self-stretch [font-family:'Inter',Helvetica] font-normal tracking-[0] leading-[normal]">
                  Published on: {post.author.publishDate}
                </div>
              </div>

              <Button className="flex w-[88px] h-6 items-center justify-center gap-[5px] px-3 py-[3px] bg-[#003b95] rounded-[100px]">
                <span className="w-fit [font-family:'Inter',Helvetica] font-normal text-white text-xs tracking-[0] leading-[normal]">
                  Follow
                </span>
                <img
                  className="w-3 h-3"
                  alt="Group"
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
