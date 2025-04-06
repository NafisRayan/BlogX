import React from 'react';
import { Select } from '../../../../components/ui/select';
import { BlogFilters } from '../../BlogsPage';

interface BlogContainerSectionProps {
  filters: BlogFilters;
  onFilterChange: (filters: Partial<BlogFilters>) => void;
}

export const BlogContainerSection = ({
  filters,
  onFilterChange,
}: BlogContainerSectionProps) => {
  const categories = [
    'All',
    'Technology',
    'Travel',
    'Lifestyle',
    'Food',
    'Business',
  ];

  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'mostLiked', label: 'Most Liked' },
  ];

  return (
    <section className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filters.category === category
                  ? 'bg-[#003b95] text-white'
                  : 'bg-white text-[#003b95] hover:bg-[#003b95] hover:text-white'
              }`}
              onClick={() =>
                onFilterChange({
                  category: category === 'All' ? undefined : category,
                })
              }
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Selector */}
        <Select
          value={filters.sortBy || 'latest'}
          onValueChange={(value) =>
            onFilterChange({ sortBy: value as BlogFilters['sortBy'] })
          }
          options={sortOptions}
          className="min-w-[150px]"
        />
      </div>
    </section>
  );
};
