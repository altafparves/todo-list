import { FaRegCalendarCheck } from "react-icons/fa6";

export default function Task() {
  return (
    <>
      <div className="task w-full mt-[16px]">
        {/* task */}
        <div className="task w-full border-b-1 transition duration-300 ease-in-out hover:bg-button border-button py-[10px] border-b flex flex-col gap-[8px]">
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
          <div className="w-full pl-[24px] flex-wrap flex gap-[8px]">
            <div className="rounded-full w-fit bg-button text-12-500 text-secondary-text py-[4px] gap-[10px] px-[12px] flex flex-row justify-start items-center">
              <FaRegCalendarCheck className="text-lg" />
              01/12/2025
            </div>
            <div className="rounded-full w-fit bg-button text-14-500 text-secondary-text py-[4px] gap-[10px] px-[12px] flex flex-row justify-start items-center">Not Started</div>
            <div className="rounded-full w-fit bg-button text-14-500 text-secondary-text py-[4px] gap-[10px] px-[12px] flex flex-row justify-start items-center">High</div>
          </div>
        </div>
      </div>
    </>
  );
}
