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
      <PaginationContent>
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
                    ? 'bg-[#003b95] text-white hover:bg-[#003b95]/90'
                    : ''
                }
              >
                {item.page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
};
