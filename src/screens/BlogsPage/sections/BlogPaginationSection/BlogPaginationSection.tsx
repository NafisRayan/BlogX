import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '../../../../components/ui/pagination';

interface BlogPaginationSectionProps {
  paginationItems: {
    page: number;
    active: boolean;
  }[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const BlogPaginationSection: React.FC<BlogPaginationSectionProps> = ({
  paginationItems,
  currentPage,
  onPageChange,
}) => {
  return (
    <Pagination>
      <PaginationContent className="flex items-center gap-2">
        {/* Previous Button */}
        <PaginationItem>
          <PaginationLink
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg border border-[#cce0ff] ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#003b95] hover:bg-[#eff6ff]'
            }`}
            disabled={currentPage === 1}
          >
            <img src="/keyboard-arrow-left.svg" alt="previous" className="w-5 h-5" />
            Previous
          </PaginationLink>
        </PaginationItem>

        {/* Page Numbers */}
        {paginationItems.map((item, index) => {
          // Show ellipsis for gaps larger than 2 pages
          if (
            index > 0 &&
            paginationItems[index - 1].page < item.page - 1
          ) {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={item.page}>
              <PaginationLink
                onClick={() => onPageChange(item.page)}
                isActive={currentPage === item.page}
                className={
                  currentPage === item.page
                    ? 'bg-[#003b95] text-white hover:bg-[#003b95]/90 w-10 h-10 rounded-lg flex items-center justify-center'
                    : 'text-[#003b95] hover:bg-[#eff6ff] w-10 h-10 rounded-lg flex items-center justify-center border border-[#cce0ff]'
                }
              >
                {item.page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next Button */}
        <PaginationItem>
          <PaginationLink
            onClick={() =>
              currentPage < paginationItems.length &&
              onPageChange(currentPage + 1)
            }
            className={`flex items-center gap-1 px-4 py-2 rounded-lg border border-[#cce0ff] ${
              currentPage === paginationItems.length
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#003b95] hover:bg-[#eff6ff]'
            }`}
            disabled={currentPage === paginationItems.length}
          >
            Next
            <img src="/keyboard-arrow-right.svg" alt="next" className="w-5 h-5" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
