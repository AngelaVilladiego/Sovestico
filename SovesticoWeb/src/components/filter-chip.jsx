import { XMarkIcon } from "@heroicons/react/24/outline";

function FilterChip({ text, onRemove }) {
  return (
    <div className="rounded-full bg-violet-500 text-white inline-flex items-center justify-between text-semibold text-sm py-1 px-4 gap-2">
      <span className="align-[middle] font-semibold pb-[2px] select-none pointer-events-none">
        {text}
      </span>
      <button onClick={onRemove} className="p-2 -m-2">
        <XMarkIcon className="w-4 aspect-auto " />
      </button>
    </div>
  );
}

export default FilterChip;
