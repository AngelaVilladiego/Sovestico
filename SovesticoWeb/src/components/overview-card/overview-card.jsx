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

import "./overview-card.css";

function OverviewCard({ stock, onClick }) {
  return (
    <div
      onClick={onClick}
      className="overview-card rounded-md py-8 px-8 hover:cursor-pointer w-full hover:bg-slate-50"
    >
      <p className="text-2xl font-semibold pb-4">
        {stock.name} ({stock.symbol})
      </p>
      <div className="grid grid-cols-3">
        <div>
          <p className="font-medium text-xl pb-2">ESG {stock.esg}</p>
          <div className="flex text-emerald-700  text-med">
            <ChevronUpIcon className="h-6 w-6 mr-3 self-center" />
            <span>{stock.strongestPrinciple}</span>
          </div>
          <div className="flex text-red-700 text-md">
            <ChevronDownIcon className="h-6 w-6 mr-3 self-center" />
            <span>{stock.weakestPrinciple}</span>
          </div>
        </div>

        <div className="">
          <p className="text-xl font-medium">${stock.price}</p>
          <p
            className={`${
              stock.change > 0 ? "text-emerald-700" : "text-red-700"
            } text-md`}
          >
            {stock.change > 0 ? "+" : ""}
            {stock.change}%
          </p>
        </div>

        <div className="place-self-stretch justify-self-stretch">
          <ResponsiveContainer
            width="99%"
            height="100%"
            className="pointer-events-none"
          >
            <AreaChart
              data={stock.data}
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
                domain={[Math.min(stock.data), Math.max(stock.data)]}
              />
              <XAxis tick={false} axisLine={false} dataKey="index" />
              <Area
                dataKey="value"
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
