import { useState } from "react";
import { HiAdjustments } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button className="flex items-center mb-2 flex-row gap-2 text-white bg-button px-4 py-2 text-sm font-medium rounded-lg" onClick={() => setIsOpen(!isOpen)}>
        <HiAdjustments className="text-lg" />
        Filter
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} // Start off-screen to the right
            animate={{ opacity: 1, x: 0 }} // Slide in from the right
            exit={{ opacity: 0, x: "100%" }} // Slide out to the right
            transition={{ duration: 0.2 }} // Adjust duration as needed
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg origin-top-right" // Position on the right
          >
            <ul className="p-2 space-y-2">
              <li className="p-2 hover:bg-gray-200 rounded-lg cursor-pointer">Date</li>
              <li className="p-2 hover:bg-gray-200 rounded-lg cursor-pointer">Priority Scale</li>
              <li className="p-2 hover:bg-gray-200 rounded-lg cursor-pointer">Completion Status</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
