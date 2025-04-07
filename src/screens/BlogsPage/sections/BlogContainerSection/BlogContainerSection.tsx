import { ChevronDownIcon, RotateCcwIcon, SlidersHorizontal } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { FilterState } from "../../BlogsPage";

// Define filter options types
interface FilterOption {
  id: number;
  name: string;
  options: { value: string, label: string }[];
}

interface BlogContainerSectionProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const BlogContainerSection = ({ filters, onFilterChange }: BlogContainerSectionProps): JSX.Element => {
  // Local state to track changes before submitting to parent
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  // Update local state when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Filter options data
  const filterOptions: FilterOption[] = [
    { 
      id: 1, 
      name: "Destination",
      options: [
        { value: "europe", label: "Europe" },
        { value: "asia", label: "Asia" },
        { value: "north-america", label: "North America" },
        { value: "south-america", label: "South America" },
        { value: "africa", label: "Africa" },
        { value: "australia", label: "Australia" },
      ]
    },
    { 
      id: 2, 
      name: "Category",
      options: [
        { value: "travel", label: "Travel" },
        { value: "technology", label: "Technology" },
        { value: "food", label: "Food" }
      ]
    },
    { 
      id: 3, 
      name: "Sub-Category",
      options: [
        { value: "hiking", label: "Hiking" },
        { value: "webdev", label: "Web Development" },
        { value: "recipes", label: "Recipes" }
      ]
    },
  ];

  // Sort options
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "a-z", label: "A-Z" },
    { value: "z-a", label: "Z-A" },
  ];

  // Handle filter change
  const handleFilterChange = (value: string, filterId: number) => {
    const newFilters = { ...localFilters };
    
    switch(filterId) {
      case 1:
        newFilters.destination = value;
        break;
      case 2:
        newFilters.category = value;
        break;
      case 3:
        newFilters.subCategory = value;
        break;
      default:
        break;
    }
    
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    const newFilters = { ...localFilters, sortBy: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Reset all filters
  const handleReset = () => {
    const resetFilters: FilterState = {
      destination: "",
      category: "",
      subCategory: "",
      sortBy: "newest"
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    // Responsive margin, padding, flex-wrap, gap
    <section className="flex flex-wrap justify-between items-center w-full mt-8 md:mt-12 lg:mt-16 mx-auto px-4 sm:px-8 md:px-12 lg:px-20 gap-4 md:gap-6">
      {/* Left side filters - Removed fixed width, added flex-wrap */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {filterOptions.map((option) => (
          <Select 
            key={option.id} 
            value={option.id === 1 ? localFilters.destination : option.id === 2 ? localFilters.category : localFilters.subCategory}
            onValueChange={(value) => handleFilterChange(value, option.id)}
          >
            <SelectTrigger
              // Responsive height, padding, text size. Removed fixed width and font family. Added flex-1 for distribution.
              className="h-10 sm:h-11 bg-[#d2ecf4] border border-[#7099c8] text-[#003b95] text-base sm:text-lg font-normal rounded-[5px] flex justify-between items-center px-3 sm:px-4 flex-1 min-w-[120px]" // Added min-width
            >
              <SelectValue placeholder={option.name} />
              {/* Kept icon for now, adjusted size */}
              <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#003b95] ml-2" />
            </SelectTrigger>
            <SelectContent>
              {option.options.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      {/* Right side sort and reset - Removed fixed width, responsive gap */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Sort by dropdown */}
        <Select value={localFilters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger
            className="flex items-center justify-between gap-2 flex-1 h-10 sm:h-11 bg-[#d9f2f7] border border-[#a8c8e1] rounded-[5px] text-base sm:text-lg font-normal text-black px-3 sm:px-4 min-w-[100px]" // Added min-width
          >
            <span>Sort by</span>
            <SlidersHorizontal className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Reset button */}
        <Button
          onClick={handleReset}
          className="flex items-center justify-between gap-2 flex-1 h-10 sm:h-11 bg-[#d9f2f7] border border-[#a8c8e1] rounded-[5px] text-base sm:text-lg font-normal text-black px-3 sm:px-4 min-w-[100px]" // Added min-width
        >
          <span>Reset</span>
          <RotateCcwIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>
    </section>
  );
};
