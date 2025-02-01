import React, { useState, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { getTasksAsync } from "../store/todoSlice";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";

export default function Search() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      dispatch(getTasksAsync({ token, search: searchValue }));
    }, 500),
    [token]
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="flex items-center w-[80%] md:w-[40%] gap-[12px] flex-row p-[12px] py-[6px] bg-button rounded-md">
      <FiSearch className="w-5 h-5" color="#FFFFFA" />
      <input type="text" value={searchTerm} onChange={handleSearch} className="bg-inherit py-[4px] text-secondary-text w-full text-14-500 focus:outline-none" placeholder="Search" />
    </div>
  );
}