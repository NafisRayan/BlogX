import { Menu, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

interface BlogHeaderSectionProps {
  onSearch: (searchTerm: string) => void;
}

export const BlogHeaderSection = ({ onSearch }: BlogHeaderSectionProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 md:gap-6 w-full mt-8 px-4 sm:px-8 md:px-12 lg:px-20">
      {/* Input container */}
      <div className="flex items-center relative bg-[#d2ecf4] rounded-full overflow-hidden shadow-[0px_4px_4px_#00000026] flex-1 min-w-[280px]">
        {/* Menu icon positioned absolutely inside the container */}
        <Menu className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
        
        {/* Input field with padding for both icons */}
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border-none bg-transparent font-normal text-base sm:text-lg md:text-xl tracking-normal sm:tracking-[0.50px] leading-tight sm:leading-6 text-[#949494] focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#949494] flex-1 h-12 sm:h-14 pl-16 pr-12"
          placeholder="Search blog by Title/Author's name/Destination/Category"
        />
        
        {/* Search icon positioned absolutely inside the container */}
        <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-500 pointer-events-none" />
      </div>

      {/* Search button */}
      <Button 
        onClick={handleSearch}
        className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 py-2 sm:py-3 bg-[#003b95] rounded-full text-white text-lg sm:text-xl md:text-2xl font-normal"
      >
        Search
      </Button>
    </div>
  );
};
