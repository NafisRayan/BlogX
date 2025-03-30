import { MicIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

export const BlogHeaderSection = (): JSX.Element => {
  // Data for search placeholder
  const searchPlaceholder =
    "SearchIcon blog by Title/Author's name/Destination/Category";

  return (
    <div className="flex items-center gap-[18px] w-full mt-8">
      <div className="flex items-center gap-1 relative bg-[#d2ecf4] rounded-[28px] overflow-hidden shadow-[0px_4px_4px_#00000026] flex-1">
        <div className="flex items-center gap-1 p-1 w-full">
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
