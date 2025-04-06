import React from 'react';
import { Select } from '../../../../components/ui/select'; // Use the existing Select component
import { Button } from '../../../../components/ui/button'; // Assuming Button component exists
import { BlogFilters } from '../../BlogsPage';

interface BlogContainerSectionProps {
  filters: BlogFilters;
  onFilterChange: (filters: Partial<BlogFilters>) => void;
}

// Placeholder data - replace with actual data fetching later
const destinationOptions = [
  { value: '', label: 'Destination' }, // Placeholder option
  { value: 'alps', label: 'Alps' },
  { value: 'coast', label: 'Coast' },
  { value: 'desert', label: 'Desert' },
  { value: 'forest', label: 'Forest' },
];
const categoryOptions = [
  { value: '', label: 'Category' }, // Placeholder option
  { value: 'hiking', label: 'Hiking' },
  { value: 'adventure', label: 'Adventure Travel' },
  { value: 'relaxation', label: 'Relaxation' },
  { value: 'culture', label: 'Culture' },
];
const subCategoryOptions = [
  { value: '', label: 'Sub-Category' }, // Placeholder option
  { value: 'guided', label: 'Guided Tours' },
  { value: 'solo', label: 'Solo Trips' },
  { value: 'family', label: 'Family Friendly' },
  { value: 'luxury', label: 'Luxury' },
];

const sortOptions = [
  // No placeholder needed if default is set
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'mostLiked', label: 'Most Liked' },
];

export const BlogContainerSection = ({
  filters,
  onFilterChange,
}: BlogContainerSectionProps) => {

  const handleReset = () => {
    onFilterChange({
      search: undefined,
      category: undefined,
      destination: undefined, // Reset new filters
      subCategory: undefined, // Reset new filters
      sortBy: 'latest',
      page: 1,
    });
    // TODO: Clear search input in BlogHeaderSection via a callback if needed
  };

  // Search button might trigger a consolidated filter update if needed,
  // but typically search is handled by the header input's debounced change.
  const handleSearchClick = () => {
    console.log("Applying filters:", filters);
    // Force a refetch if search isn't automatically triggered by filter changes
    onFilterChange({}); // Trigger useEffect in parent
  };

  // Helper to get current filter value or empty string for select defaultValue
  const getFilterValue = (key: keyof BlogFilters) => filters[key] || '';

  return (
    <section className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-4">
      <div className="flex flex-wrap justify-between items-center gap-4 max-w-7xl mx-auto">
        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3">
          {/* Destination Dropdown */}
          <Select
            value={getFilterValue('destination')} // Use new filter key
            onValueChange={(value) => onFilterChange({ destination: value || undefined })} // Use new filter key
            options={destinationOptions}
            // Apply styling similar to the image to the wrapper/select element
            // Note: The actual dropdown appearance depends on the browser/OS due to using native <select>
            className="w-[180px] [&>select]:bg-[#eff6ff] [&>select]:border-[#cce0ff] [&>select]:text-[#003b95] [&>select]:rounded-lg"
          />

          {/* Category Dropdown */}
          <Select
            value={getFilterValue('category')}
            onValueChange={(value) => onFilterChange({ category: value || undefined })}
            options={categoryOptions}
            className="w-[180px] [&>select]:bg-[#eff6ff] [&>select]:border-[#cce0ff] [&>select]:text-[#003b95] [&>select]:rounded-lg"
          />

          {/* Sub-Category Dropdown */}
          <Select
            value={getFilterValue('subCategory')} // Use new filter key
            onValueChange={(value) => onFilterChange({ subCategory: value || undefined })} // Use new filter key
            options={subCategoryOptions}
            className="w-[180px] [&>select]:bg-[#eff6ff] [&>select]:border-[#cce0ff] [&>select]:text-[#003b95] [&>select]:rounded-lg"
          />
        </div>

        {/* Sort, Reset, Search */}
        <div className="flex flex-wrap gap-3 items-center">
           {/* Sort Selector */}
           {/* TODO: Add Sort icon inside the select if possible, or next to it */}
           <Select
             value={filters.sortBy || 'latest'}
             onValueChange={(value) => onFilterChange({ sortBy: value as BlogFilters['sortBy'] })}
             options={sortOptions}
             className="w-[150px] [&>select]:bg-[#eff6ff] [&>select]:border-[#cce0ff] [&>select]:text-[#003b95] [&>select]:rounded-lg"
           />

          {/* Reset Button */}
          {/* Assuming Button component exists and accepts className */}
          <Button
            variant="outline" // Assuming variant="outline" provides appropriate base style
            className="bg-[#eff6ff] border-[#cce0ff] text-[#003b95] hover:bg-[#ddebf7] rounded-lg flex items-center"
            onClick={handleReset}
          >
             <img src="/bx-refresh-svg.svg" alt="reset" className="h-4 w-4 mr-2" /> {/* Reset Icon */}
            Reset
          </Button>

          {/* Search Button */}
          <Button
            className="bg-[#003b95] text-white hover:bg-[#002a6b] rounded-lg px-6"
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};
