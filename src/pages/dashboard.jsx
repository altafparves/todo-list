import DashboardLayout from "../layout/DashboardLayout";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { HiAdjustments } from "react-icons/hi";


const Dashboard = () => {
  return (
    <>
      <DashboardLayout>
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
              <button className="flex items-center mb-[8px] flex-row gap-[8px] text-text bg-button p-[8px] text-14-500 rounded-[12px]">
                <HiAdjustments className="text-lg" />
                Filter
              </button>
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
          {/* tasl */}
          <div className="task w-full">
            {/* task */}
            <div className="task w-full border-b-1 border-button py-[10px] border-b flex flex-col gap-[8px]">
              {/* left */}
              <div className="flex flex-row items-center w-full gap-[8px]">
                <input type="radio" value="option3" className="form-radio h-4 w-4 text-blue-600" />
                {/* title */}
                <div className="w-full flex flex-row justify-between items-center">
                  <p className="text-task-title text-text">Tugas 1 </p>
                  <p className=" text-12-500 text-grey">3 weeks ago</p>
                </div>
              </div>
              <p className=" ml-[24px] w-[80%] text-grey text-14-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, facere accusamus. Corrupti ut, eligendi exercitationem explicabo nesciunt est nisi culpa.</p>
              {/* status */}
              <div className="w-full pl-[24px] flex-row flex gap-[8px]">
                <div className="rounded-full w-fit bg-button text-12-500 text-secondary-text py-[4px] gap-[10px] px-[12px] flex flex-row justify-start items-center">
                  <FaRegCalendarCheck className="text-lg" />
                  01/12/2025
                </div>
                <div className="rounded-full w-fit bg-button text-14-500 text-secondary-text py-[4px] gap-[10px] px-[12px] flex flex-row justify-start items-center">Not Started</div>
                <div className="rounded-full w-fit bg-button text-14-500 text-secondary-text py-[4px] gap-[10px] px-[12px] flex flex-row justify-start items-center">High</div>
              </div>
            </div>
          </div>
          <button className="fixed bottom-[40px] left-[50%] bg-white rounded-full py-[16px] px-[32px]">+ Add Task</button>
        </section>
      </DashboardLayout>
    </>
  );
};


export default Dashboard;
