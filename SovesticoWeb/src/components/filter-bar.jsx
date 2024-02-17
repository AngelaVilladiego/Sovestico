import FilterChip from "./filter-chip";
import FilterDropdownButton from "./filter-dropdown-button";

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
  return (
    <div className="w-full flex justify-between items-stretch my-6">
      <div className="grow flex justify-start items-center content-start">
        <FilterChip
          text="Sustainability"
          onRemove={() => {
            console.log("removing this button");
          }}
        />
      </div>
      <FilterDropdownButton
        principles={principles}
        onAddPrinciple={(e) => {
          onAddFilter(e);
          console.log("yuh");
        }}
      />
    </div>
  );
}

export default FilterBar;
