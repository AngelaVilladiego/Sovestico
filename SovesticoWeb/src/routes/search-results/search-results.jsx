import OverviewCard from "../../components/overview-card/overview-card";
import "./search-results.css";
import { getData, getData2 } from "../../utilities/random-stock-month";

function SearchResults() {
  const dummyData = getData();
  const dummyStock = {
    name: "Nvidia",
    symbol: "NVDA",
    esg: 90,
    strongestPrinciple: "Sustainability",
    weakestPrinciple: "Governance",
    price: 66.38,
    change: 114.06,
    data: dummyData,
  };

  const dummyData2 = getData2();
  const dummyStock2 = {
    name: "IBM",
    symbol: "IBM",
    esg: 72,
    strongestPrinciple: "Diversity",
    weakestPrinciple: "Labor Practices",
    price: 1038.2,
    change: -114.06,
    data: dummyData2,
  };

  return (
    <div className="flex flex-col justify-center items-center px-40 py-40 overflow-y-auto">
      <OverviewCard
        stock={dummyStock}
        onClick={() => {
          console.log("clicked 1");
        }}
      />
      <OverviewCard
        stock={dummyStock2}
        onClick={() => {
          console.log("clicked 2");
        }}
      />
      <OverviewCard
        stock={dummyStock}
        onClick={() => {
          console.log("clicked 1");
        }}
      />
      <OverviewCard
        stock={dummyStock2}
        onClick={() => {
          console.log("clicked 2");
        }}
      />
    </div>
  );
}

export default SearchResults;
