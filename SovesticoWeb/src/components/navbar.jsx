import { React } from "react";
import {
  UserCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  return (
    <div className="w-full flex items-center justify-between py-6 px-8 bg-white shadow-md z-10">
      <div className="grow flex justify-start items-center">
        <a href="/" className="font-brand text-3xl font-medium mr-auto">
          Sovestico
        </a>
      </div>
      <div className="w-6/12 relative text-gray-600">
        <div className="bg-white h-10 px-5 pr-16 rounded-full text-sm focus:outline-none border-2 border-slate-100">
          <input
            className="w-full h-full focus:outline-none font-body"
            type="search"
            name="search"
            placeholder="Search by name or symbol"
          />

          <button
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2 mr-4"
          >
            <MagnifyingGlassIcon className="text-gray-600 h-4 aspect-square" />
          </button>
        </div>
      </div>
      <div className=" grow flex justify-end items-center">
        <button>
          <UserCircleIcon className="h-10 aspect-square text-neutral-900" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
