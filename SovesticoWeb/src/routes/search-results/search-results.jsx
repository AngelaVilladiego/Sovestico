import OverviewCard from "../../components/overview-card/overview-card";
import "./search-results.css";

function SearchResults() {
  return (
    <div className="results-container">
      <div className="stock-results grow flex flex-col justify-center items-center w-9/12 px-40 py-40 bg-white">
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
        <OverviewCard />
      </div>
    </div>
  );
}

export default SearchResults;
