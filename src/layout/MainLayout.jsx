import { useState } from "react";
import Sidebar from "../components/sidebar";
import Search from "../components/search";
import { IoMenu } from "react-icons/io5";
import { Outlet } from "react-router-dom";


const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <>
      <section className="relative overflow-hidden flex flex-row md:flex-row-reverse w-screen h-screen bg-base">
        <div className="w-full">
          <div className="px-[12px]  md:px-[28px] justify-start md:justify-center flex flex-row items-center border-button border-b-2 w-full h-[64px]">
            <Search />
          </div>
          <section className="px-[12px] md:px-[24px] lg:px-[100px] xl:px-[220px] h-full flex-1 overflow-auto">
            <Outlet />
          </section>
        </div>
        <button className={`absolute z-20 right-[12px] top-[16px] md:hidden ${isSidebarOpen ? "rotate-0" : "rotate-180"}`} onClick={toggleSidebar}>
          <IoMenu className="w-9 h-9" color="#CECACB" />
        </button>
        <Sidebar isOpen={isSidebarOpen} className={`h-full z-10 md:translate-x-0 md:opacity-100 transition-all duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`} />
      </section>
    </>
  );
};

export default MainLayout;