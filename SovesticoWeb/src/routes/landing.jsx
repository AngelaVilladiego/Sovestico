import { useEffect, useState } from "react";
import { PRINCIPLES } from "../../globals";
import ToggleChip from "../components/toggle-chip";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

function Landing() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggleFilter = (principle) => {
    let inList = selected.includes(principle);
    if (inList) {
      console.log("in list");
      setSelected(selected.filter((p) => p != principle));
    } else if (selected.length < 3) {
      setSelected([...selected, principle]);
    }
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const handleSubmit = () => {
    let state = { loaded: true, filters: [] };
    PRINCIPLES.map((p) => {
      state.filters.push({ name: p, selected: false });
    });
    state.filters.forEach((p) => {
      if (selected.includes(p.name)) {
        p.selected = true;
      }
    });
    navigate("/stocks", { state: state });
  };

  return (
    <div className="grow flex items-center justify-start px-24">
      <div className="w-1/2 align-start">
        <p className="font-brand weight-bold text-6xl">
          Put your money where your <i>heart</i> is.
        </p>
        <p className="font-body text-3xl pt-12 text-pretty">
          When you invest in a company, you're not just supporting a product -
          you're supporting their actions.
        </p>
      </div>
      <div className="w-1/3 h-3/4 mx-auto rounded-md border-1px border-slate-100 bg-slate-100 bg-opacity-25 backdrop-blur-md flex flex-col justify-center">
        <p className="font-body text-3xl text-center mb-4">
          What matters to you?
        </p>
        <p className="font-body text-md text-slate-600 text-center mb-8">
          Pick up to three.
        </p>
        <div className="flex flex-wrap gap-3 justify-center items-center mb-8">
          {PRINCIPLES.map((p) => (
            <ToggleChip
              key={p}
              text={p}
              onToggle={() => {
                toggleFilter(p);
              }}
              isSelected={selected.includes(p)}
            />
          ))}
        </div>
        <button
          className={`font-semibold mx-auto py-2 px-3 rounded-md ${
            selected.length == 0
              ? "bg-slate-50 text-slate-400 border-slate-400 border-[1px]"
              : "bg-black opacity-100 text-white border-[1px] border-black"
          }`}
          onClick={handleSubmit}
          disabled={selected.length == 0}
        >
          <span className="">Find my next investment</span>
          <ArrowRightIcon className="w-4 aspect-auto mx-auto" />
        </button>
      </div>
    </div>
  );
}

export default Landing;
