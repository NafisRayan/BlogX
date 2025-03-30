import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../../components/ui/pagination";

interface PaginationItemData {
  page: number;
  active: boolean;
}

interface BlogPaginationSectionProps {
  paginationItems: PaginationItemData[];
}

export const BlogPaginationSection = ({ paginationItems }: BlogPaginationSectionProps): JSX.Element => {
  return (
    <Pagination className="w-full sm:w-auto">
      <PaginationContent className="flex items-center justify-center sm:justify-end gap-3">
        <PaginationItem>
          <PaginationPrevious
            className="bg-[#e0f7fa] border-[#a8c8e1] w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-solid flex items-center justify-center hover:bg-gray-100 transition-colors pl-0 pr-0"
            href="#"
          >
            <span className="sr-only">Previous</span>
          </PaginationPrevious>
        </PaginationItem>

        <div className="flex items-center gap-3">
          {paginationItems.map((item, index) => (
            <React.Fragment key={index}>
              <PaginationItem>
                <PaginationLink
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-solid flex items-center justify-center font-semibold text-sm sm:text-base ${
                    item.active
                      ? "bg-[#d2ecf4] border-[#003b95] text-[#003b95] cursor-default"
                      : "bg-[#e0f7fa] border-[#a8c8e1] text-black hover:bg-gray-100 transition-colors"
                  }`}
                  href="#"
                  isActive={item.active}
                  aria-current={item.active ? "page" : undefined}
                >
                  {item.page}
                </PaginationLink>
              </PaginationItem>

              {index === 2 && paginationItems.length > 3 && (
                <PaginationItem>
                  <PaginationEllipsis className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-sm sm:text-base" />
                </PaginationItem>
              )}
            </React.Fragment>
          ))}
        </div>

        <PaginationItem>
          <PaginationNext
            className="bg-[#e0f7fa] border-[#a8c8e1] w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-solid flex items-center justify-center hover:bg-gray-100 transition-colors pl-0 pr-0"
            href="#"
          >
            <span className="sr-only">Next</span>
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
