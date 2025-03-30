import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../../components/ui/pagination"; // Adjusted import path

// Define the structure of a pagination item
interface PaginationItemData {
  page: number;
  active: boolean;
}

// Define the props for the component
interface BlogPaginationSectionProps {
  paginationItems: PaginationItemData[];
  // Add other props like onPageChange handler if needed later
}

export const BlogPaginationSection = ({ paginationItems }: BlogPaginationSectionProps): JSX.Element => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            // Consider making these interactive later
            className="bg-[#e0f7fa] border-[#a8c8e1] opacity-30 w-10 h-10 rounded border border-solid flex items-center justify-center cursor-not-allowed" // Added cursor style for disabled look
            href="#"
            aria-disabled="true" // Accessibility improvement
          />
        </PaginationItem>

        {/* Added flex-wrap for pagination items on smaller screens */}
        <div className="flex flex-wrap gap-1">
          {paginationItems.map((item, index) => (
            <React.Fragment key={index}>
              <PaginationItem>
                <PaginationLink
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded border border-solid flex items-center justify-center font-semibold text-sm sm:text-base ${
                    item.active
                      ? "bg-[#d2ecf4] border-[#003b95] text-[#003b95] cursor-default" // Added cursor style
                      : "bg-[#e0f7fa] border-[#a8c8e1] text-black hover:bg-gray-100" // Added hover state
                  }`}
                  href="#" // Should ideally link to actual pages or trigger page change
                  isActive={item.active}
                  aria-current={item.active ? "page" : undefined} // Accessibility improvement
                >
                  {item.page}
                </PaginationLink>
              </PaginationItem>

              {/* Render ellipsis conditionally based on logic (hardcoded for now) */}
              {index === 2 && paginationItems.length > 3 && ( // Added check for length
                <PaginationItem>
                  <PaginationEllipsis className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center font-semibold text-sm sm:text-base" />
                </PaginationItem>
              )}
            </React.Fragment>
          ))}
        </div>

        <PaginationItem>
          <PaginationNext
            // Consider making these interactive later
            className="bg-[#e0f7fa] border-[#a8c8e1] w-9 h-9 sm:w-10 sm:h-10 rounded border border-solid flex items-center justify-center hover:bg-gray-100" // Added hover state
            href="#"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
