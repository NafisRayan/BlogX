import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input"; // Import Input component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"; // Import Select components
// Removed Textarea import

export const BlogForm = () => { // Changed to named export
  const navigate = useNavigate();

  const handleBackToBlogs = () => {
    navigate('/blogs'); // Assuming '/blogs' is the route for the main blog page
  };

  // Helper function for label classes
  const labelClasses = "block text-black text-base sm:text-lg font-medium mb-1"; // Responsive text, adjusted weight/margin

  // Helper function for input/select/textarea classes (using components now)
  const inputBaseClasses = "mt-1 block w-full"; // Simplified base

  return (
    // Added max-width for better control on larger screens, more padding
    <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-3xl">
      {/* Removed text-shadow, font-['Inter'] */}
      <h1 className="text-black text-2xl sm:text-3xl font-semibold mb-6">
        Blog Form
      </h1>

      {/* Form fields */}
      <div className="space-y-4">
        <div>
          <label className={labelClasses}>Author Name:</label>
          <Input type="text" className={inputBaseClasses} />
        </div>
        <div>
          <label className={labelClasses}>Blog Title:</label>
          <Input
            type="text"
            placeholder="Enter the title of your blog post"
            className={inputBaseClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Category:</label>
          <Select>
            <SelectTrigger className={inputBaseClasses}>
              <SelectValue placeholder="-Select category-" />
            </SelectTrigger>
            <SelectContent>
              {/* Add actual options here */}
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="food">Food</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className={labelClasses}>Sub-category:</label>
           <Select>
            <SelectTrigger className={inputBaseClasses}>
              <SelectValue placeholder="-Select sub-category-" />
            </SelectTrigger>
            <SelectContent>
              {/* Add actual options here */}
              <SelectItem value="hiking">Hiking</SelectItem>
              <SelectItem value="webdev">Web Development</SelectItem>
              <SelectItem value="recipes">Recipes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className={labelClasses}>Summary:</label>
          <Input
            type="text"
            placeholder="Type here"
            className={inputBaseClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Publication Date:</label>
          <Input
            type="date" // Changed to date type for better UX
            placeholder="DD/MM/YYYY"
            className={inputBaseClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Travel tags:</label>
           <Select> {/* Assuming tags might be selectable */}
            <SelectTrigger className={inputBaseClasses}>
              <SelectValue placeholder="-Select tags-" />
            </SelectTrigger>
            <SelectContent>
              {/* Add actual options here */}
              <SelectItem value="alps">Alps</SelectItem>
              <SelectItem value="beach">Beach</SelectItem>
              <SelectItem value="city">City Break</SelectItem>
            </SelectContent>
          </Select>
          {/* Or use an Input for free-form tags:
           <Input type="text" placeholder="Comma-separated tags" className={inputBaseClasses} />
          */}
        </div>
        <div>
          <label className={labelClasses}>Main Content:</label>
          {/* Reverted back to standard textarea */}
          <textarea
            placeholder="Write your blog content here"
            className={`${inputBaseClasses} border rounded py-2 px-3 text-neutral-400 text-lg font-normal leading-tight focus:outline-none focus:shadow-outline min-h-[150px]`} // Re-added original styles + min-height
            rows={5}
          />
        </div>
        <div>
          <label className={labelClasses}>Images Upload:</label>
          {/* Basic file input - replace with a proper uploader component later */}
          <Input type="file" multiple className={`${inputBaseClasses} border p-2 h-auto`} />
          {/* Placeholder div removed */}
        </div>
      </div>

      {/* Action Buttons - Grouped */}
      <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
        <Button variant="outline">Preview</Button>
        <Button variant="outline">Autosave</Button>
        <Button className="bg-[#003b95] hover:bg-[#002a6b] text-white"> {/* Primary style */}
          Publish
        </Button>
        <Button variant="secondary" onClick={handleBackToBlogs}> {/* Secondary style */}
          Back to Blogs
        </Button>
      </div>
    </div>
  );
};

// Removed default export
