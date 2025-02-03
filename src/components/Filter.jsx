import { useState } from "react";
import { HiAdjustments } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Filter({priorityFilter,setPriorityFilter,completionFilter,setCompletionFilter,formattedDateRange,setFormattedDateRange}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateFilterActive, setDateFilterActive] = useState(false);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  const [showCompletionMenu, setShowCompletionMenu] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

  const handleDateSelect = (dates) => {
    const [start, end] = dates;
    setSelectedDateRange([start, end]);

    if (start && end) {
      setShowDatePicker(false);
      setDateFilterActive(true);
      const formattedStart = start.toISOString().slice(0, 10);
      const formattedEnd = end.toISOString().slice(0, 10);
      setFormattedDateRange({ start: formattedStart, end: formattedEnd });
    } else if (start) {
      const formattedStart = start.toISOString().slice(0, 10);
      setFormattedDateRange({ start: formattedStart, end: null });
    } else {
      setFormattedDateRange({ start: null, end: null });
    }
  };

  const handleRemoveDateFilter = () => {
    setSelectedDateRange([null, null]);
    setDateFilterActive(false);
    setShowDatePicker(false);
    setFormattedDateRange({ start: null, end: null });
  };

  const handlePrioritySelect = (priority) => {
    setPriorityFilter(priority);
    setShowPriorityMenu(false);
  };

  const handleRemovePriorityFilter = () => {
    setPriorityFilter(null);
    setShowPriorityMenu(false);
  };

  const handleCompletionSelect = (status) => {
    setCompletionFilter(status);
    setShowCompletionMenu(false);
  };

  const handleRemoveCompletionFilter = () => {
    setCompletionFilter(null);
    setShowCompletionMenu(false);
  };

  return (
    <div className="w-full flex flex-col items-start gap-[12px] mb-[12px]">
      <div className="w-full pb-2 flex justify-between border-b-2 border-button">
        <button className="text-14-400 border-b-2 border-blue text-text py-[8px] px-[12px]">List</button>
        {/* Filter */}
        <div className="relative inline-block">
          <button className="flex items-center mb-2 flex-row gap-2 text-white bg-button px-4 py-2 text-sm font-medium rounded-lg" onClick={() => setIsOpen(!isOpen)}>
            <HiAdjustments className="text-lg" />
            Filter
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-button border rounded-lg shadow-lg origin-top-right"
              >
                <ul className="p-2 space-y-2 flex flex-col">
                  <button
                    className="p-2 w-full flex items-start text-text text-14-500 hover:text-14-700 hover:text-secondary hover:bg-gray-200 rounded-lg cursor-pointer"
                    onClick={() => {
                      setDateFilterActive(true);
                      setIsOpen(false);
                    }}
                  >
                    Date
                  </button>
                  <button
                    className="p-2 w-full flex items-start text-text text-14-500 hover:text-14-700 hover:text-secondary hover:bg-gray-200 rounded-lg cursor-pointer"
                    onClick={() => {
                      setPriorityFilter("High"); // Default value
                      setIsOpen(false);
                    }}
                  >
                    Priority Scale
                  </button>
                  <button
                    className="p-2 w-full flex items-start text-text text-14-500 hover:text-14-700 hover:text-secondary hover:bg-gray-200 rounded-lg cursor-pointer"
                    onClick={() => {
                      setCompletionFilter("not started"); // Default value
                      setIsOpen(false);
                    }}
                  >
                    Completion Status
                  </button>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-row w-fit items-center gap-[8px] justify-start">
        <p className="text-secondary-text pr-[8px] text-14-500">Filter: </p>

        {dateFilterActive && (
          <div className="relative">
            <button className="flex items-center bg-button rounded-full px-[12px] py-[4px] gap-[10px] text-12-500 text-secondary-text" onClick={() => setShowDatePicker(!showDatePicker)}>
              <FaRegCalendarCheck className="text-lg" />
              {selectedDateRange[0] && selectedDateRange[1]
                ? `${formattedDateRange.start} - ${formattedDateRange.end}` // Display formatted dates
                : "Pick a Date Range"}
              <button onClick={handleRemoveDateFilter}>
                <ImCancelCircle className="text-red-500 text-md" />
              </button>
            </button>

            {showDatePicker && (
              <div className="absolute top-12 left-2/3 transform -translate-x-1/2 bg-button p-4 rounded-lg shadow-lg z-50">
                <DatePicker selectsRange startDate={selectedDateRange[0]} endDate={selectedDateRange[1]} onChange={handleDateSelect} inline />
              </div>
            )}
          </div>
        )}

        {/* Priority Scale Chip */}
        {priorityFilter && (
          <div className="relative">
            <button className="flex items-center bg-button rounded-full px-[12px] py-[4px] gap-[10px] text-12-500 text-secondary-text" onClick={() => setShowPriorityMenu(!showPriorityMenu)}>
              Priority: {priorityFilter}
              <button onClick={handleRemovePriorityFilter}>
                <ImCancelCircle className="text-red-500 text-md" />
              </button>
            </button>

            {showPriorityMenu && (
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-button p-2 rounded-lg shadow-lg z-50">
                {["High", "Medium", "Low"].map((level) => (
                  <button key={level} className="block text-text  w-full text-left px-4 py-2 text-14-500 hover:bg-secondary rounded-[12px]" onClick={() => handlePrioritySelect(level)}>
                    {level}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Completion Status Chip */}
        {completionFilter && (
          <div className="relative">
            <button className="flex items-center bg-button rounded-full px-[12px] py-[4px] gap-[10px] text-12-500 text-secondary-text" onClick={() => setShowCompletionMenu(!showCompletionMenu)}>
              Status: {completionFilter}
              <button onClick={handleRemoveCompletionFilter}>
                <ImCancelCircle className="text-red-500 text-md" />
              </button>
            </button>

            {showCompletionMenu && (
              <div className="absolute top-12 left-1/2 w-full transform -translate-x-1/2 bg-button p-2 rounded-lg shadow-lg z-50">
                {["not started", "in progress", "done"].map((status) => (
                  <button key={status} className="block text-text  w-full text-left px-4 py-2 text-14-500 hover:bg-secondary rounded-[12px]" onClick={() => handleCompletionSelect(status)}>
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
