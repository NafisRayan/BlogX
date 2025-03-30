import { Menu, SearchIcon } from "lucide-react"; // Changed MicIcon to Menu
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

export const BlogHeaderSection = (): JSX.Element => {
  return (
    // Added responsive padding and gap, flex-wrap for small screens
    <div className="flex flex-wrap items-center gap-4 md:gap-6 w-full mt-8 px-4 sm:px-8 md:px-12 lg:px-20">
      {/* Added Menu icon */}
      <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-400">
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Input container */}
      <div className="flex items-center relative bg-[#d2ecf4] rounded-full overflow-hidden shadow-[0px_4px_4px_#00000026] flex-1 min-w-[280px]"> {/* Removed p-2, added min-width */}
        {/* Input field with padding for the icon */}
        <Input
          className="border-none bg-transparent font-normal text-base sm:text-lg md:text-xl tracking-normal sm:tracking-[0.50px] leading-tight sm:leading-6 text-[#949494] focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#949494] flex-1 h-12 sm:h-14 pl-4 pr-12" // Added height, pl, pr
          placeholder="Search blog by Title/Author's name/Destination/Category" // Corrected placeholder text
        />
        {/* Search icon positioned absolutely inside the container */}
        <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-500 pointer-events-none" /> {/* Positioned icon */}
      </div>

      {/* Responsive button: width, height, padding, text size */}
      <Button className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 py-2 sm:py-3 bg-[#003b95] rounded-full text-white text-lg sm:text-xl md:text-2xl font-normal">
        Search {/* Corrected button text */}
      </Button>
    </div>
  );
};

/* Removed unnecessary icon wrapper divs and old code */
