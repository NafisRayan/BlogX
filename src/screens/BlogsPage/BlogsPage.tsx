import React from "react";
import { Button } from "../../components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { BlogCardSection } from "./sections/BlogCardSection";
import { BlogContainerSection } from "./sections/BlogContainerSection";
import { BlogHeaderSection } from "./sections/BlogHeaderSection";
import { BlogPaginationSection } from "./sections/BlogPaginationSection";
import { BlogPostSection } from "./sections/BlogPostSection";

export const BlogsPage = (): JSX.Element => {
  // Pagination data
  const paginationItems = [
    { page: 1, active: true },
    { page: 2, active: false },
    { page: 3, active: false },
    { page: 36, active: false },
  ];

  return (
    <main className="bg-[#e0f7fa] flex flex-row justify-center w-full">
      <div className="bg-[#e0f7fa] w-full max-w-[1512px] relative">
        {/* Blog Header Section */}
        <BlogHeaderSection />

        {/* Blog Container Section */}
        <BlogContainerSection />

        {/* Blog Post Section */}
        <BlogPostSection />

        {/* Blog Card Section */}
        <BlogCardSection />

        {/* Blog Pagination Section */}
        <BlogPaginationSection />

        {/* Post Blog Button and Pagination */}
        <div className="flex justify-between items-center mx-20 mt-8">
          <Button className="bg-[#003b95] text-white rounded-lg h-[46px] w-[213px]">
            <span className="font-normal text-xl [font-family:'Inter',Helvetica]">
              Post your blog
            </span>
          </Button>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="bg-[#e0f7fa] border-[#a8c8e1] opacity-30 w-10 h-10 rounded border border-solid flex items-center justify-center"
                  href="#"
                />
              </PaginationItem>

              {paginationItems.map((item, index) => (
                <React.Fragment key={index}>
                  <PaginationItem>
                    <PaginationLink
                      className={`w-10 h-10 rounded border border-solid flex items-center justify-center font-semibold text-base ${
                        item.active
                          ? "bg-[#d2ecf4] border-[#003b95] text-[#003b95]"
                          : "bg-[#e0f7fa] border-[#a8c8e1] text-black"
                      }`}
                      href="#"
                      isActive={item.active}
                    >
                      {item.page}
                    </PaginationLink>
                  </PaginationItem>

                  {index === 2 && (
                    <PaginationItem>
                      <PaginationEllipsis className="w-10 h-10 flex items-center justify-center font-semibold text-base" />
                    </PaginationItem>
                  )}
                </React.Fragment>
              ))}

              <PaginationItem>
                <PaginationNext
                  className="bg-[#e0f7fa] border-[#a8c8e1] w-10 h-10 rounded border border-solid flex items-center justify-center"
                  href="#"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </main>
  );
};
