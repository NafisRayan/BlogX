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
      commentIcon: "/group-86-8.png",
    },
  ];

  return (
    <section className="w-full flex flex-wrap justify-between gap-4 py-8">
      {blogCards.map((card) => (
        <Card
          key={card.id}
          className="w-full md:w-[418px] border-[#a8c8e1] shadow-[-1px_-1px_4px_#003b9533,2px_2px_4px_#003b9533] rounded-2xl overflow-hidden"
        >
          <CardHeader className="p-4 pt-5 pb-0 space-y-2 h-[116px]">
            <h2 className="font-bold text-xl text-[#0f1419]">{card.title}</h2>

            <div className="flex items-center gap-1.5">
              {card.categories.map((category, index) => (
                <Badge
                  key={index}
                  className="bg-[#003b95] text-white rounded-full px-3 py-[3px] h-6 font-normal text-xs"
                >
                  {category}
                </Badge>
              ))}
            </div>

            <p className="text-base text-[#0f1419]">{card.subtitle}</p>
          </CardHeader>

          <CardContent className="p-0">
            <div className="bg-[#c4e0ee] rounded-2xl p-[21px] mx-4 mt-2">
              <p className="text-sm text-[#536471]">
                {card.description}
                <br />
                <span className="font-light text-[#003b95] underline cursor-pointer">
                  Read more
                </span>
              </p>
            </div>

            <div className="flex justify-between px-4 py-2">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <HeartIcon className="w-6 h-6" />
                  <span className="text-xs font-medium text-[#536471]">
                    {card.likes}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className="w-[20.11px] h-3.5 bg-[100%_100%]"
                    style={{ backgroundImage: `url(${card.commentIcon})` }}
                  />
                  <span className="text-xs font-medium text-[#536471]">
                    {card.comments}
                  </span>
                </div>
              </div>

              <div>
                <BookmarkIcon className="w-6 h-6" />
              </div>
            </div>

            <div className="w-full h-[120px] overflow-hidden flex">
              {card.images.map((image, index) => (
                <div
                  key={index}
                  className={`h-[120px] ${
                    index === 0
                      ? "w-[140px]"
                      : index === 1
                        ? "w-[177px]"
                        : "w-[163px]"
                  }`}
                >
                  <img
                    src={image}
                    alt="Blog image"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex items-center gap-2 p-4 h-[82px]">
            <div className="flex items-center gap-2 flex-1">
              <Avatar className="w-10 h-10">
                <AvatarImage src={card.author.avatar} alt={card.author.name} />
                <AvatarFallback>{card.author.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-0.5 flex-1">
                <span className="font-bold text-base text-[#0f1419]">
                  {card.author.name}
                </span>
                <span className="text-xs text-[#536471]">
                  Published on: {card.author.date}
                </span>
              </div>

              <Button
                className="bg-[#003b95] text-white rounded-full h-6 px-3 py-[3px] flex items-center gap-[5px]"
                size="sm"
              >
                <span className="text-xs font-normal">Follow</span>
                <img
                  className="w-3 h-3"
                  alt="Follow icon"
                  src={`/group-87-${card.id + 5}.png`}
                />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};
