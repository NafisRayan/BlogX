import React from "react";
import { useNavigate } from "react-router-dom"; // Added back
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export const BlogForm = () => {
  const navigate = useNavigate(); // Added back

  // Added back
  const handleBackToBlogs = () => {
    navigate('/blogs');
  };

  // Adjusted classes based on the image
  const labelClasses = "text-black text-lg sm:text-xl font-normal flex items-center justify-start"; // Adjusted for alignment
  const inputBaseClasses = "bg-[#d2ecf4] border border-gray-300 w-full text-gray-600 text-base sm:text-lg rounded-lg focus-visible:ring-1 focus-visible:ring-[#003b95] h-11 px-4"; // Adjusted styling
  const selectClasses = "bg-[#d2ecf4] border border-gray-300 text-gray-600 text-base sm:text-lg rounded-lg h-11"; // Adjusted styling

  return (
    <main className="bg-[#e0f7fa] flex flex-col items-center w-full min-h-screen py-8 px-4">
      <div className="w-full max-w-[1000px]"> {/* Adjusted max-width for better centering */}
        <h1 className="text-[32px] font-bold mb-10 text-left"> {/* Adjusted font weight and alignment */}
          Blog Form
        </h1>

        {/* Removed the white background container to match the image's simpler layout */}
        <div className="space-y-6"> {/* Adjusted spacing */}
          {/* Row 1: Author Name (Label Only) */}
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-x-8 gap-y-4 items-center"> {/* Custom grid for label alignment */}
             <label className={labelClasses}>Author Name:</label>
             {/* Input removed as per image */}
             <div></div> {/* Placeholder for grid structure */}
          </div>

          {/* Row 2: Blog Title & Publication Date */}
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr_max-content_1fr] gap-x-8 gap-y-4 items-center"> {/* Custom grid for label alignment */}
            <label className={labelClasses}>Blog Title :</label>
            <Input
              type="text"
              placeholder="Enter the title of your blog post"
              className={inputBaseClasses}
            />
            <label className={labelClasses}>Publication Date:</label>
            <Input
              type="text"
              placeholder="DD/MM/YYYY"
              className={inputBaseClasses}
            />
          </div>

          {/* Row 3: Category & Sub-category */}
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr_max-content_1fr] gap-x-8 gap-y-4 items-center"> {/* Custom grid for label alignment */}
            <label className={labelClasses}>Category :</label>
            <Select>
              <SelectTrigger className={selectClasses}>
                <SelectValue placeholder="-Select other options-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="food">Food</SelectItem>
              </SelectContent>
            </Select>
            <label className={labelClasses}>Sub-category :</label>
            <Select>
              <SelectTrigger className={selectClasses}>
                <SelectValue placeholder="-Select multiple options-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hiking">Hiking</SelectItem>
                <SelectItem value="webdev">Web Development</SelectItem>
                <SelectItem value="recipes">Recipes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Row 4: Summary & Travel tags */}
           <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr_max-content_1fr] gap-x-8 gap-y-4 items-start"> {/* Changed items-center to items-start for textarea */}
            <label className={`${labelClasses} pt-2`}>Summary :</label> {/* Added padding top */}
            <textarea
              placeholder="Type here"
              className={`${inputBaseClasses} min-h-[100px] p-3 resize-none`} // Adjusted height and padding
              rows={4} // Adjusted rows
            />
            <label className={labelClasses}>Travel tags:</label>
            <Select>
              <SelectTrigger className={selectClasses}>
                <SelectValue placeholder="-Select other options-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alps">Alps</SelectItem>
                <SelectItem value="beach">Beach</SelectItem>
                <SelectItem value="city">City Break</SelectItem>
              </SelectContent>
            </Select>
          </div>


          {/* Row 5: Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-x-8 gap-y-2 items-start"> {/* Custom grid for label alignment */}
            <label className={`${labelClasses} pt-2`}>Main Content</label> {/* Added padding top */}
            <textarea
              placeholder="Write your blog content here"
              className={`${inputBaseClasses} min-h-[150px] p-3 resize-none w-full`} // Adjusted height, padding
              rows={6} // Adjusted rows
            />
          </div>

          {/* Row 6: Images Upload */}
          <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-x-8 gap-y-2 items-center"> {/* Custom grid for label alignment */}
             <label className={labelClasses}>Images Upload :</label>
             <div className="border-2 border-dashed border-[#a0cde3] rounded-lg bg-[#d2ecf4] p-6 text-center text-gray-500 cursor-pointer hover:bg-[#c4e5ef] transition-colors w-full h-24 flex items-center justify-center"> {/* Adjusted styling */}
               Drop files to upload
             </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4 pt-8"> {/* Adjusted gap and padding */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-[#d2ecf4] text-black text-lg sm:text-xl px-10 py-2 rounded-full hover:bg-[#c4e5ef] transition-colors min-w-[150px] border border-gray-300"> {/* Adjusted styling */}
                Preview
              </Button>
              <Button className="bg-[#d2ecf4] text-black text-lg sm:text-xl px-10 py-2 rounded-full hover:bg-[#c4e5ef] transition-colors min-w-[150px] border border-gray-300"> {/* Adjusted styling */}
                Autosave
              </Button>
            </div>

            <Button className="w-full max-w-md bg-[#d2ecf4] text-black text-lg sm:text-xl py-2 rounded-full hover:bg-[#c4e5ef] transition-colors border border-gray-300 mt-2"> {/* Adjusted styling */}
              Publish
            </Button>
          </div>

          {/* Back to Blogs button added back */}
          <div className="text-center pt-4"> {/* Added padding top */}
            <Button
              variant="link" // Keeping variant="link" might override some background styles, let's remove it for solid background
              onClick={handleBackToBlogs}
              className="bg-[#003b95] text-white rounded-lg px-6 py-2.5 text-lg sm:text-xl w-full sm:w-auto hover:bg-[#002d73] transition-colors" // Applied new styles and added hover
            >
              Back to Blogs
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
