import FilterButton from "../components/FilterButton";
import { FaRegCalendarCheck } from "react-icons/fa6";
import Task from "../components/task";
const Dashboard = () => {
  return (
    <>
      {/* <DashboardLayout> */}
      <section className="overflow-auto relative w-full flex flex-col justify-start h-full pt-[30px]">
        {/* header */}
        <div className="header w-full flex flex-row justify-between mb-[30px]">
          <p className="text-page-title text-white">All</p>
          <p className="text-page-title text-white">30</p>
        </div>
        {/* filter */}
        <div className="w-full flex flex-col items-start gap-[12px]">
          <div className="w-full pb-[] flex justify-between border-b-2 border-button">
            <button className="text-14-400 border-b-2 border-blue text-text py-[8px] px-[12px]">List</button>
            {/* filter */}
            <FilterButton></FilterButton>
          </div>
          {/* filter chips */}
          <div className="flex flex-row w-fit items-center gap-[8px] justify-start">
            <p className="text-secondary-text pr-[8px] text-14-500">Filter: </p>
            <div className="rounded-full w-fit bg-button text-12-500 text-secondary-text py-[4px] gap-[10px] px-[12px] flex flex-row justify-start items-center">
              <FaRegCalendarCheck className="text-lg" />
              01/12/2025
            </div>
          </div>
        </div>
        {/* task */}
        <Task></Task>
        <button className="fixed bottom-[40px] left-[50%] bg-white rounded-full py-[16px] px-[32px]">+ Add Task</button>
      </section>
    </>
  );
};


export default Dashboard;
