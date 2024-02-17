import FilterChip from "./filter-chip";
import FilterDropdownButton from "./filter-dropdown-button";
import { useEffect, useState } from "react";

const principles = [
  "Governance",
  "Labor Practices",
  "Environmentalism",
  "Diversity",
  "Animal Rights",
  "Sustainability",
  "Societal",
];

function FilterBar({ onAddFilter, onRemoveFilter }) {
  const [filterState, setFilterState] = useState({
    loaded: false,
    filters: [],
  });

  useEffect(() => {
    let res = [];
    if (!filterState.loaded) {
      principles.forEach((p) => {
        res.push({ name: p, selected: false });
      });

      setFilterState({ filters: res, loaded: true });
    }
  }, []);

  useEffect(() => {
    // console.log("!!_!_!_!!_!_!_!!_!_!_!!_!_!_");
    console.log("filter state is:", filterState);
    // console.log("filters are", filterState.filters);
    // console.log(
    //   "filters",
    //   filterState.filters.filter((f) => f.selected).map((p) => p.name)
    // );
    // console.log(
    //   "not filters",
    //   filterState.filters.filter((f) => !f.selected).map((p) => p.name)
    // );
    // console.log("!!_!_!_!!_!_!_!!_!_!_!!_!_!_");
  }, [filterState]);

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
                    handleRemovePrinciple(s.name);
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
          handleAddPrinciple(name);
          console.log("yuh");
        }}
      />
    </div>
  );
}

export default FilterBar;
