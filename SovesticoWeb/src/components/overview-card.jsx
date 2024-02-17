import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { LineChart, Line, ResponsiveContainer, XAxis } from "recharts";
import dummyData from "../utilities/random-stock-month";

function OverviewCard() {
  return (
    <div className="w-full border-neutral-400 border-2 rounded-md">
      <p>Nvidia (NVDA)</p>
      <div className="grid grid-cols-3">

        <div>
          <p>ESG 90</p>
          <div className="flex text-emerald-700">
            <ChevronUpIcon className="h-4 w-4 mr-3 self-center" />
            <span>Sustainability</span>
          </div>
          <div className="flex text-red-700">
            <ChevronDownIcon className="h-4 w-4 mr-3 self-center" />
            <span>Governance</span>
          </div>
        </div>

        <div>
          <p>$66.38</p>
          <p className="text-emerald-700">+114.06%</p>
        </div>

        <div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dummyData}>
                    <XAxis dataKey=""

                </LineChart>
            </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default OverviewCard;
