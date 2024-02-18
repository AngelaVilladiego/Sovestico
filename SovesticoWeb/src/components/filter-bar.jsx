import FilterChip from "./filter-chip";
import FilterDropdownButton from "./filter-dropdown-button";
import { useEffect, useState } from "react";

function FilterBar({ onAddFilter, onRemoveFilter, passedState }) {
  const [filterState, setUseState] = useState(passedState);

  useEffect(() => {
    console.log("IN FILTER BAR:", passedState, filterState);
  }, []);

  return (
    <div className="w-full flex justify-between items-stretch my-6">
      <div className="grow flex flex-wrap justify-start items-center content-start gap-3">
        {filterState.loaded ? (
          filterState.filters
            .filter((p) => p.selected)
            .map((s) => {
              return (
                <FilterChip
                  key={s.name}
                  text={s.name}
                  onRemove={() => {
                    onRemoveFilter(s.name);
                  }}
                />
              );
            })
        ) : (
          <></>
        )}
      </div>
      <FilterDropdownButton
        principles={
          filterState.loaded
            ? filterState.filters.filter((f) => !f.selected).map((p) => p.name)
            : []
        }
        onAddPrinciple={(name) => {
          onAddFilter(name);
        }}
      />
    </div>
  );
}

export default FilterBar;
