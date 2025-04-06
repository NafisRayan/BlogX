import React from 'react';

interface BlogHeaderSectionProps {
  onSearch: (search: string) => void;
}

export const BlogHeaderSection = ({ onSearch }: BlogHeaderSectionProps) => {
  return (
    <header className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-6 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto">
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003b95]"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </header>
  );
};
