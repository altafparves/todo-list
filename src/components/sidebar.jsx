import { MenuItems } from "./menuItems";
import { IoIosLogOut } from "react-icons/io";
import useAuth from "../hooks/useAuth";

export default function Sidebar({ isOpen, className }) {
    const { user, logout } = useAuth();
  return (
    <div
      className={`pt-[60px] md:pt-[12px] right-0 absolute md:relative flex flex-col justify-between bg-secondary w-[300px] p-[12px] transform transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } ${className}`}
    >
      <div className="flex flex-col gap-[8px]">
        <div className="flex w-full flex-col gap-[10px]">
          <MenuItems name="All" total="5" isActive={true} color="bg-blue" />
          <MenuItems name="Today" total="5" isActive={false} color="bg-yellow" />
          <MenuItems name="High Priority" total="5" isActive={false} color="bg-red" />
          <MenuItems name="Completed" total="5" isActive={false} color="bg-grey" />
        </div>
      </div>
      <div className="w-full gap-[8px] items-center border border-button flex flex-col p-[12px] rounded-[6px]">
        <div className="flex-row items-center text-text  border-button border-b-[1px] gap-[12px] py-[8px] flex w-full">
          {/* avatar */}
          <div class="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg class="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
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