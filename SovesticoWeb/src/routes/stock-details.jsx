import { useLocation } from "react-router-dom";
import OverviewCard from "../components/overview-card/overview-card";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import TitledCard from "../components/titled-card";

function StockDetails() {
  let passedState = useLocation();
  let stock = passedState.state;
  let stockProcessed = false;
  const [fetchingSummary, setFetchingSummary] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  let activeStyles = "border-b-2 border-neutral-900 text-neutral-900";
  let inactiveStyles = "border-b-2 border-white text-slate-400";

  const handleTabClick = (name) => {
    if (name == activeTab) {
      return;
    }
    setActiveTab(name);
  };

  useEffect(() => {
    if (stockProcessed) {
      return;
    }

    let newData = [];
    let today = new Date();
    let max = stock.data.length - 1;

    stock.data.map((item, index) => {
      let value = item.value;
      let date = new Date();
      date.setDate(today.getDate() - (max - index));
      date = date.toLocaleDateString("en-us");

      let newValue = (Math.round(value * 100) / 100).toFixed(2);

      newData.push({ date: date, value: newValue });
    });

    stock.data = newData;
    console.log(newData);
  }, []);

  return (
    <div className="pt-10 px-20 w-full pb-10">
      <div className="w-full">
        <h1 className="text-xl font-semibold mb-2 ">
          {stock.name} ({stock.symbol})
        </h1>
        <div className="font-medium text-lg mb-2">
          <span className="mr-3">${stock.price}</span>
          <span
            className={`${
              stock.change > 0 ? "text-emerald-700" : "text-red-700"
            } `}
          >
            ({stock.change > 0 ? "+" : ""}
            {stock.change}%)
          </span>
        </div>
      </div>

      <div
        id="tab-group"
        className="w-full border-b-2 border-slate-200 flex align-baseline justify-evenly text-lg mb-8"
      >
        <div
          onClick={() => {
            handleTabClick("Overview");
          }}
          className={`${
            activeTab == "Overview" ? activeStyles : inactiveStyles
          } cursor-pointer font-semibold py-2 px-4`}
        >
          <span>Overview</span>
        </div>
        <div
          onClick={() => {
            handleTabClick("News");
          }}
          className={`${
            activeTab == "News" ? activeStyles : inactiveStyles
          } cursor-pointer font-semibold py-2 px-4`}
        >
          <span>News</span>
        </div>
      </div>

      <div className="w-full">
        {activeTab == "Overview" ? (
          <>
            <div className="mb-10 grid h-44 border-slate-100 border-2 grid-cols-4 place-items-center items-stretch justify-center mt-8 rounded-md bg-slate-100">
              <div className="flex flex-col justify-center gap-3 align-center text-center w-full h-full bg-white rounded-ee-md rounded-ss-md border-r-2 border-slate-200">
                <h3 className="font-semibold text-2xl text-slate-800">ESG</h3>
                <p className={`font-bold text-4xl text-slate-900`}>
                  {stock.esg}
                </p>
              </div>
              <div className="h-full aspect-square  py-6">
                <TitledCard className="h-full" title="Environment">
                  <p className={`font-bold text-4xl text-slate-900`}>
                    {stock.environmentScore}
                  </p>
                </TitledCard>
              </div>
              <div className="h-full aspect-square  py-6">
                <TitledCard className="h-full" title="Social">
                  <p className={`font-bold text-4xl text-slate-900`}>
                    {stock.socialScore}
                  </p>
                </TitledCard>
              </div>
              <div className="h-full aspect-square  py-6">
                <TitledCard className="h-full" title="Governance">
                  <p className={`font-bold text-4xl text-slate-900`}>
                    {stock.governanceScore}
                  </p>
                </TitledCard>
              </div>
            </div>

            <div className="w-full flex align-top justify-between gap-8">
              <div className="w-1/2">
                <h3 className="text-lg font-semibold">About</h3>
                <p className="text-pretty">{stock.about}</p>
              </div>
              <div className="w-1/2 pt-10">
                <ResponsiveContainer width="99%" height={400}>
                  <AreaChart
                    data={stock.data}
                    margin={{ top: 5, left: 10, right: 5, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#82ca9d"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#82ca9d"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <YAxis
                      domain={[Math.min(stock.data), Math.max(stock.data)]}
                    />
                    <XAxis tick={true} axisLine={true} dataKey="date" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
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
          </>
        ) : (
          <div className="flex w-full h-full flex-col items-center justify-center">
            <p className="text-lg">Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StockDetails;
