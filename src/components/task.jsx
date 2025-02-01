import { FaRegCalendarCheck } from "react-icons/fa6";

export default function Task({ task }) {
  return (
    <>
      <div className="task w-full">
        <div className="task w-full border-b-1 transition duration-300 ease-in-out hover:bg-button border-button py-[12px] border-b flex flex-col gap-[8px]">
          <div className="flex flex-row items-center w-full gap-[8px]">
            <input type="radio" className="form-radio h-4 w-4 text-blue-600" />
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-15-700 text-text">{task.title}</p>
            </div>
          </div>
          {task?.description && <p className="ml-[24px] w-[80%] text-grey text-14-500">{task.description}</p>}

          <div className="w-full pl-[24px] flex-wrap flex gap-[8px]">
            {task.due_date && (
              <div className="rounded-full w-fit bg-button text-12-500 text-secondary-text py-[4px] gap-[10px] px-[12px] flex flex-row justify-start items-center">
                <FaRegCalendarCheck className="text-lg" />
                {task.due_date}
              </div>
            )}
            {task.is_completed && <div className="rounded-full w-fit bg-button text-14-500 text-secondary-text py-[4px] gap-[10px] px-[12px] flex flex-row justify-start items-center">{task.is_completed}</div>}
            {task.priority && <div className="rounded-full w-fit bg-button text-14-500 text-secondary-text py-[4px] gap-[10px] px-[12px] flex flex-row justify-start items-center">{task.priority}</div>}
          </div>
        </div>
      </div>
    </>
  );
}

