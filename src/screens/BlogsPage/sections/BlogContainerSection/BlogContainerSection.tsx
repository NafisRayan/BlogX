import { ChevronDownIcon, RotateCcwIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

export const BlogContainerSection = (): JSX.Element => {
  // Filter options data
  const filterOptions = [
    { id: 1, name: "Destination", width: "w-[209px]" },
    { id: 2, name: "Category", width: "w-[218px]" },
    { id: 3, name: "Sub-Category", width: "w-[248px]" },
  ];

  return (
    <section className="flex justify-between w-full mt-[252px] mx-auto px-20">
      {/* Left side filters */}
      <div className="flex flex-col w-[709px] items-start gap-[7px]">
        <div className="flex items-center gap-[17px] w-full">
          {filterOptions.map((option) => (
            <Select key={option.id}>
              <SelectTrigger
                className={`${option.width} h-[46px] bg-[#d2ecf4] border-[#7099c8] text-[#003b95] text-2xl font-normal font-['Inter',Helvetica] rounded-[5px] flex justify-between items-center`}
              >
                <SelectValue placeholder={option.name} />
                <ChevronDownIcon className="h-2 w-3.5 text-[#003b95]" />
              </SelectTrigger>
            </Select>
          ))}
        </div>
      </div>

      {/* Right side sort and reset */}
      <div className="flex w-[353px] h-[46px] items-start gap-[18px]">
        <Button
          variant="outline"
          className="flex-1 h-[46px] bg-[#d9f2f7] border-[#a8c8e1] rounded-[5px] text-xl font-normal font-['Inter',Helvetica] text-black justify-between px-[15px] py-[3px]"
        >
          <span>Sort by</span>
          <ChevronDownIcon className="h-3.5 w-5" />
        </Button>

        <Button
          variant="outline"
          className="flex-1 h-[46px] bg-[#d9f2f7] border-[#a8c8e1] rounded-[5px] text-xl font-normal font-['Inter',Helvetica] text-black justify-between px-[15px] py-[3px]"
        >
          <span>Reset</span>
          <RotateCcwIcon className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
};
