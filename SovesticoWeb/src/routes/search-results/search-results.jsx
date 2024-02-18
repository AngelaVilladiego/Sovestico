import OverviewCard from "../../components/overview-card/overview-card";
import "./search-results.css";
import { getData, getData2 } from "../../utilities/random-stock-month";
import FilterBar from "../../components/filter-bar";
import { PRINCIPLES } from "../../../globals";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { GetRecommendations } from "../../services/endpoints";
import { filterToKey, keyToFilter } from "../../services/filter-to-key";

function SearchResults() {
  const passedState = useLocation();
  const [filterState, setFilterState] = useState(passedState.state);
  const [resultsState, setResultsState] = useState({
    loading: true,
    stocks: [],
  });

  useEffect(() => {
    console.log("FROM VIEW", resultsState);
  }, [resultsState]);

  useEffect(() => {
    fetchRecommendations();
  }, [filterState]);

  const fetchRecommendations = () => {
    setResultsState({
      ...resultsState,
      loading: true,
    });

    let keys = [];

    filterState.filters.forEach((filter) => {
      if (filter.selected) {
        console.log("FILTER:", filter);
        let key = filterToKey(filter.name);
        console.log("KEY", key);
        keys.push(key);
      }
    });

    GetRecommendations(keys).then((data) => {
      setResultsState({
        ...resultsState,
        loading: false,
        stocks: data,
      });
    });
  };

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
          {resultsState.loading ? (
            <div className="p-8 flex flex-col gap-3 items-center max-w-6/12 h-screen text-gray-800">
              <div className="h-full flex flex-col justify-center items-center">
                <span className="text-gray-800 text-lg pb-3 font-fancy">
                  Loading...
                </span>
                <div className="pb-48" role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-memoblue-400"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          ) : (
            resultsState.stocks.map((stock) => (
              <OverviewCard
                key={stock.symbol}
                stock={{
                  environmentScore: stock.env_score,
                  socialScore: stock.soc_score,
                  governanceScore: stock.gov_score,
                  beta: stock.beta,
                  risk: stock.overallRisk,
                  about: stock.longBusinessSummary,
                  esg: stock.esg_score,
                  name: stock.shortName,
                  symbol: stock.symbol,
                  strongestPrinciple: keyToFilter(stock.strongest_principle),
                  weakestPrinciple: keyToFilter(stock.weakest_principle),
                  price: (
                    Math.round(
                      stock.price_history[stock.price_history.length - 1] * 100
                    ) / 100
                  ).toFixed(2),
                  change: (
                    Math.round(
                      ((stock.price_history[stock.price_history.length - 1] -
                        stock.price_history[stock.price_history.length - 2]) /
                        stock.price_history[stock.price_history.length - 2]) *
                        100 *
                        100
                    ) / 100
                  ).toFixed(2),
                  data: stock.price_history.map((value, index) => ({
                    index,
                    value,
                  })),
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
