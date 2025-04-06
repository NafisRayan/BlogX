import React from 'react';

interface BlogHeaderSectionProps {
  onSearch: (search: string) => void;
}

export const BlogHeaderSection = ({ onSearch }: BlogHeaderSectionProps) => {
  // Debounce search input
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = debounce(onSearch, 500); // 500ms delay

  return (
    <header className="w-full px-4 sm:px-8 md:px-12 lg:px-16 pt-10 pb-6"> {/* Adjusted padding */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#002244] mb-6">Blogs</h1> {/* Added Title */}
        <div className="relative flex items-center bg-[#eff6ff] p-3 rounded-lg shadow-sm"> {/* Search bar container */}
          <img src="/icon.svg" alt="menu" className="h-6 w-6 mr-3 text-gray-500" /> {/* Assuming icon.svg is menu */}
          <input
            type="text"
            placeholder="Search blog by Title/Author's name/Destination/Category"
            className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500" // Updated styles
            onChange={(e) => debouncedSearch(e.target.value)} // Use debounced search
          />
           <img src="/icon-1.svg" alt="search" className="h-6 w-6 ml-3 text-gray-500" /> {/* Assuming icon-1.svg is search */}
        </div>
      </div>
    </header>
  );
};
