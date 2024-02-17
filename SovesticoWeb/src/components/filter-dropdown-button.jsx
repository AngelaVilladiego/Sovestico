import { useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import OutsideAlerter from "../utilities/use-outside-alerter";

function FilterDropdownButton({ principles, onAddPrinciple }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClickFilter = (principle) => {
    console.log(principle);
    setIsExpanded(false);
    onAddPrinciple(principle);
  };

  return (
    <OutsideAlerter
      handleClickOutside={() => {
        console.log("handling");
        if (isExpanded) {
          setIsExpanded(false);
        }
      }}
    >
      <div className="relative filter-dropdown-parent">
        <button
          onClick={() => {
            console.log("clicked");
            setIsExpanded((prev) => !prev);
          }}
        >
          <AdjustmentsHorizontalIcon className="w-7 aspect-auto self-star" />
        </button>
        {isExpanded ? (
          <div className="absolute z-40 left-1/2 -translate-x-1/2 bg-white">
            <ul className="text-sm border-slate-100 border-[1px] rounded-lg overflow-clip ">
              {principles.map((principle) => (
                <li
                  key={principle}
                  onClick={() => handleClickFilter(principle)}
                  onBlur={() => setIsExpanded(false)}
                  className="flex justify-between px-5 py-2 border-b-[1px] border-t-[1px] border-gray-200 group hover:cursor-pointer hover:bg-slate-100"
                >
                  <span>{principle}</span>
                  <PlusIcon className="w-4" />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </OutsideAlerter>
  );
}

export default FilterDropdownButton;
