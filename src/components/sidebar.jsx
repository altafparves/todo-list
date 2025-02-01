
import MenuItems from "./menuItems";
import { IoIosLogOut } from "react-icons/io";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
export default function Sidebar({ isOpen, className }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = (path) => {
    setActiveMenu(path);
    navigate(path); // Navigate to the selected path
  };

  return (
    <div
      className={`pt-[60px] md:pt-[12px] right-0 absolute md:relative flex flex-col justify-between bg-secondary w-[300px] p-[12px] transform transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } ${className}`}
    >
      <div className="flex flex-col gap-[8px]">
        <div className="flex w-full flex-col gap-[10px]">
          <MenuItems name="All" path="/" isActive={activeMenu === "/"} color={activeMenu === "/" ? "bg-blue" : ""} onClick={() => handleMenuClick("/")} />
          
          <MenuItems name="High Priority" path="/high-priority" isActive={activeMenu === "/high-priority"} color={activeMenu === "/high-priority" ? "bg-red" : ""} onClick={() => handleMenuClick("/high-priority")} />
          <MenuItems name="Completed" path="/completed" isActive={activeMenu === "/completed"} color={activeMenu === "/completed" ? "bg-grey" : ""} onClick={() => handleMenuClick("/completed")} />
        </div>
      </div>
      <div className="w-full gap-[8px] items-center border border-button flex flex-col p-[12px] rounded-[6px]">
        <div className="flex-row items-center text-text  border-button border-b-[1px] gap-[12px] py-[8px] flex w-full">
          <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg className="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
            </svg>
          </div>
          <p className="text-14-500 ">{user?.email}</p>
        </div>
        <button onClick={logout} className=" w-full gap-[8px] flex items-center flex-row  px-[6px] py-[3px] text-14-500 text-secondary-text">
          <IoIosLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </div>
  );
}