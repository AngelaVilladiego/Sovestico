import OverviewCard from "../../components/overview-card/overview-card";
import "./search-results.css";
import { getData, getData2 } from "../../utilities/random-stock-month";
import FilterBar from "../../components/filter-bar";
import { PRINCIPLES } from "../../../globals";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function SearchResults() {
  const passedState = useLocation();
  const [filterState, setFilterState] = useState(passedState.state);

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

  useEffect(() => {}, [filterState]);

  const handleRemovePrinciple = (name) => {
    console.log("removing this filter:", name);
    let oldFilterState = filterState;
    const ind = oldFilterState.filters.findIndex((f) => {
      console.log("** name **", f.name, "** matches? **", name, f.name == name);
      return f.name == name;
    });
    console.log(ind);
    let newFilterList = oldFilterState.filters;
    newFilterList[ind] = { name: name, selected: false };

    console.log("after adding:", { ...filterState, filters: newFilterList });
    setFilterState({ ...filterState, filters: newFilterList });
  };

  const handleAddPrinciple = (name) => {
    console.log("adding this filter:", name);
    let oldFilterState = filterState;
    console.log("new: before change", oldFilterState);
    const ind = oldFilterState.filters.findIndex((f) => {
      console.log("** name **", f.name, "** matches? **", name, f.name == name);
      return f.name == name;
    });
    console.log(ind);
    let newFilterList = oldFilterState.filters;
    newFilterList[ind] = { name: name, selected: true };

    console.log("after adding:", { ...filterState, filters: newFilterList });
    setFilterState({ ...filterState, filters: newFilterList });
  };

  return (
    <div className="pt-16 px-40 w-full">
      <div className="search-content mx-auto">
        <h1 className="text-3xl font-semibold">Recommended for you</h1>
        <FilterBar
          onAddFilter={(p) => {
            handleAddPrinciple(p);
          }}
          onRemoveFilter={(p) => {
            handleRemovePrinciple(p);
          }}
          passedState={filterState}
        />
        <div className="flex flex-col justify-center items-center w-full">
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
      </div>
    </div>
  );
}

export default SearchResults;
