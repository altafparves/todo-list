import React from "react";
import { FiSearch } from "react-icons/fi";

export default function Search() {
  return (
    <div className="flex items-center w-[80%] md:w-[40%] gap-[12px] flex-row p-[12px] py-[6px] bg-button rounded-md">
      <FiSearch className="w-5 h-5" color="#FFFFFA" />
      <input type="text" className="bg-inherit py-[4px] text-secondary-text w-full  text-14-500 focus:outline-none" placeholder="Search" />
    </div>
  );
}
