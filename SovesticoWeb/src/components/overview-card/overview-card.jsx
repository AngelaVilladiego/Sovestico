import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import getData from "../../utilities/random-stock-month";
import "./overview-card.css";

function OverviewCard() {
  const dummyData = getData();

  return (
    <div className="overview-card rounded-md py-10 px-8 hover:cursor-pointer hover:bg-slate-50">
      <p className="text-3xl font-semibold pb-6">Nvidia (NVDA)</p>
      <div className="grid grid-cols-3">
        <div>
          <p className="font-medium text-2xl pb-2">ESG 90</p>
          <div className="flex text-emerald-700  text-lg">
            <ChevronUpIcon className="h-6 w-6 mr-3 self-center" />
            <span className="font-medium">Sustainability</span>
          </div>
          <div className="flex text-red-700 text-lg">
            <ChevronDownIcon className="h-6 w-6 mr-3 self-center" />
            <span>Governance</span>
          </div>
        </div>

        <div className="">
          <p className="text-2xl font-medium">$66.38</p>
          <p className="text-emerald-700 text-lg">+114.06%</p>
        </div>

        <div className="place-self-stretch justify-self-stretch">
          <ResponsiveContainer
            width="99%"
            height="100%"
            className="pointer-events-none"
          >
            <AreaChart
              data={dummyData}
              margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis
                width={0}
                tick={false}
                axisLine={false}
                domain={[
                  Math.min(...dummyData.map((item) => item.close)),
                  Math.max(...dummyData.map((item) => item.close)),
                ]}
              />
              <XAxis tick={false} axisLine={false} dataKey="date" />
              <Area
                dataKey="close"
                dot={false}
                stroke="#5a8a6c"
                strokeWidth="2px"
                fill="url(#colorGrad)"
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default OverviewCard;
