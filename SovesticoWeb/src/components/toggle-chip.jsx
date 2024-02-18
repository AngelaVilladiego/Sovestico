function ToggleChip({ text, onToggle, isSelected }) {
  const selectedStyle = "bg-violet-500 text-white border-violet-500";
  const unselectedStyle = "bg-white  border-slate-100 text-slate-600";

  return (
    <div
      onClick={onToggle}
      className={` ${
        isSelected ? selectedStyle : unselectedStyle
      } cursor-pointer border-[1px] rounded-full inline-flex items-center justify-between text-semibold text-sm py-1 px-4 gap-2`}
    >
      <span className="whitespace-nowrap align-[middle] font-semibold pb-[2px] select-none pointer-events-none">
        {text}
      </span>
    </div>
  );
}

export default ToggleChip;
