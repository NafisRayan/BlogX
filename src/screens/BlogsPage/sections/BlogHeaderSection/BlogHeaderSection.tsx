import { MicIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

export const BlogHeaderSection = (): JSX.Element => {
  return (
    // Added responsive padding and gap, flex-wrap for small screens
    <div className="flex flex-wrap items-center gap-4 md:gap-6 w-full mt-8 px-4 sm:px-8 md:px-12 lg:px-20">
      {/* Simplified structure, responsive padding */}
      <div className="flex items-center gap-2 relative bg-[#d2ecf4] rounded-full overflow-hidden shadow-[0px_4px_4px_#00000026] flex-1 p-2 min-w-[280px]"> {/* Added min-width */}
        <SearchIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 ml-2" /> {/* Adjusted size and margin */}

        <Input
          className="border-none bg-transparent font-normal text-base sm:text-lg md:text-xl tracking-normal sm:tracking-[0.50px] leading-tight sm:leading-6 text-[#949494] focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#949494] flex-1" // Responsive text size, simplified tracking/leading, added flex-1
          placeholder="Search blog by Title/Author/Destination/Category" // Corrected placeholder
        />

        <button className="p-2 rounded-full hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-gray-400"> {/* Added button for better semantics and focus */}
          <MicIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" /> {/* Adjusted size */}
        </button>
      </div>

      {/* Responsive button: width, height, padding, text size */}
      <Button className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 py-2 sm:py-3 bg-[#003b95] rounded-full text-white text-lg sm:text-xl md:text-2xl font-normal">
        Search {/* Corrected button text */}
      </Button>
    </div>
  );
};

/* Removed unnecessary icon wrapper divs */
/*
          <div className="flex items-center justify-center w-12 h-12">
            <div className="inline-flex items-center justify-center rounded-[100px] overflow-hidden">
              <div className="inline-flex items-center justify-center p-2">
                <SearchIcon className="w-6 h-6 text-gray-500" />
              </div>
            </div>
          </div>

          <div className="flex items-center flex-1">
            <Input
              className="border-none bg-transparent font-normal text-xl tracking-[0.50px] leading-6 text-[#949494] focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#949494]"
              placeholder={searchPlaceholder}
            />
          </div>

          <div className="flex items-center justify-end">
            <div className="flex items-center justify-center w-12 h-12">
              <div className="inline-flex items-center justify-center rounded-[100px] overflow-hidden">
                <div className="inline-flex items-center justify-center p-2">
                  <MicIcon className="w-6 h-6 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button className="w-[185px] h-14 px-[38px] py-[13px] bg-[#003b95] rounded-[100px] text-white text-2xl font-normal">
        SearchIcon
      </Button>
    </div>
  );
};
*/
