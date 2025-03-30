import { ChevronDownIcon, RotateCcwIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

export const BlogContainerSection = (): JSX.Element => {
  // Filter options data - Removed width property
  const filterOptions = [
    { id: 1, name: "Destination" },
    { id: 2, name: "Category" },
    { id: 3, name: "Sub-Category" },
  ];

  return (
    // Responsive margin, padding, flex-wrap, gap
    <section className="flex flex-wrap justify-between items-center w-full mt-8 md:mt-12 lg:mt-16 mx-auto px-4 sm:px-8 md:px-12 lg:px-20 gap-4 md:gap-6">
      {/* Left side filters - Removed fixed width, added flex-wrap */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {filterOptions.map((option) => (
          <Select key={option.id}>
            <SelectTrigger
              // Responsive height, padding, text size. Removed fixed width and font family. Added flex-1 for distribution.
              className="h-10 sm:h-11 bg-[#d2ecf4] border border-[#7099c8] text-[#003b95] text-base sm:text-lg font-normal rounded-[5px] flex justify-between items-center px-3 sm:px-4 flex-1 min-w-[120px]" // Added min-width
            >
              <SelectValue placeholder={option.name} />
              {/* Kept icon for now, adjusted size */}
              <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#003b95] ml-2" />
            </SelectTrigger>
            </Select>
        ))}
      </div>

      {/* Right side sort and reset - Removed fixed width, responsive gap */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Responsive height, padding, text size. Removed variant, fixed width, font family. */}
        <Button
          className="flex items-center justify-between gap-2 flex-1 h-10 sm:h-11 bg-[#d9f2f7] border border-[#a8c8e1] rounded-[5px] text-base sm:text-lg font-normal text-black px-3 sm:px-4 min-w-[100px]" // Added min-width
        >
          <span>Sort by</span>
          <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>

        {/* Responsive height, padding, text size. Removed variant, fixed width, font family. */}
        <Button
          className="flex items-center justify-between gap-2 flex-1 h-10 sm:h-11 bg-[#d9f2f7] border border-[#a8c8e1] rounded-[5px] text-base sm:text-lg font-normal text-black px-3 sm:px-4 min-w-[100px]" // Added min-width
        >
          <span>Reset</span>
          <RotateCcwIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>
    </section>
  );
};
