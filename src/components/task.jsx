import { FaRegCalendarCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoAsync, editTodoAsync } from "../store/todoSlice";
import { useCallback, useState,useRef,useEffect } from "react";
import debounce from "lodash/debounce";
import { FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Task({ task }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const taskRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || "");
  const handleDelete = () => {
    dispatch(deleteTodoAsync({ todo_id: task.todo_id, token }));
  };

  const [localIsCompleted, setLocalIsCompleted] = useState(task.is_completed === "done"); 

  useEffect(() => {
    setLocalIsCompleted(task.is_completed === "done");
  }, [task]);

  console.log("ini",localIsCompleted);


   const handleComplete = () => {
     setLocalIsCompleted(!localIsCompleted);

     setTimeout(() => {
       const newStatus = localIsCompleted ? "not started" : "done"; 
       dispatch(editTodoAsync({ todo_id: task.todo_id, updates: { is_completed: newStatus }, token }));
     }, 1000);
   };

  // edit title
  const debouncedEditTitle = useCallback(
    debounce((newTitle) => {
      dispatch(editTodoAsync({ todo_id: task.todo_id, updates: { title: newTitle }, token }));
    }, 500),
    [dispatch, token, task.todo_id]
  );

  const handleEditTitleChange = (e) => {
    const newTitle = e.target.value;
    setEditTitle(newTitle);
    debouncedEditTitle(newTitle);
  };

  // edit desc
  const debouncedEditDesc = useCallback(
    debounce((newDesc) => {
      dispatch(editTodoAsync({ todo_id: task.todo_id, updates: { description: newDesc }, token }));
    }, 500),
    [dispatch, token, task.todo_id]
  );
  const handleEditDescChange = (e) => {
    const newDesc = e.target.value;
    setEditDesc(newDesc);
    debouncedEditDesc(newDesc);
  };

  // edit due date
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editDueDate, setEditDueDate] = useState(task.due_date ? new Date(task.due_date) : null); // Store as Date object

  const handleDateChange = (date) => {
    setEditDueDate(date);
    const formattedDate = date ? date.toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }) : null;
    dispatch(editTodoAsync({ todo_id: task.todo_id, updates: { due_date: formattedDate }, token }));
    setShowDatePicker(false);
  };

  // edit priority
  const [showTaskPriorityMenu, setShowTaskPriorityMenu] = useState(false);
  const [editPriority, setEditPriority] = useState(task.priority || "");

  const handlePrioritySelect = (level) => {
    setEditPriority(level);
    dispatch(editTodoAsync({ todo_id: task.todo_id, updates: { priority: level }, token }));
    setShowTaskPriorityMenu(false); // Close Task's menu
  };

  // edit completion status
  const [showTaskCompletionMenu, setShowTaskCompletionMenu] = useState(false);
  const [editCompletion, setEditCompletion] = useState(task.is_completed || "");
  const handleCompletionSelect = (status) => {
    setEditCompletion(status);
    dispatch(editTodoAsync({ todo_id: task.todo_id, updates: { is_completed: status }, token }));
    setShowTaskCompletionMenu(false);
  };

  // handle edit
  const handleEditBlur = (e) => {
    if (taskRef.current && !taskRef.current.contains(e.relatedTarget)) {
      setIsEditing(false);
      setEditTitle(task.title);
      setEditDesc(task.description || "");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEditBlur();
    }
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (taskRef.current && !taskRef.current.contains(event.target)) {
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="task w-full">
      <div onClick={handleEditClick} ref={taskRef} className="task ref={taskRef}  w-full border-b-1 transition duration-300 ease-in-out hover:bg-secondary border-button py-[12px] border-b flex flex-col gap-[8px]">
        <div className="flex flex-row items-center w-full gap-[8px]">
          <input type="checkbox" className="form-radio h-4 w-4 text-blue-600" checked={localIsCompleted} onChange={handleComplete} />
          <div className="w-full flex flex-row items-center">
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                className="w-full text-task-title text-text border-none bg-transparent focus:outline-none focus:ring-0 hover:bg-transparent"
                onChange={handleEditTitleChange}
                onBlur={handleEditBlur}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            ) : (
              <p className="text-task-title text-text cursor-pointer">{task.title}</p>
            )}
            {isEditing && (
              <button onClick={handleDelete} className="mr-[16px] transition-colors ease-in-out text-grey hover:text-red width-[24px] height-[24px]">
                <FaTrash />
              </button>
            )}
          </div>
        </div>
        {/* Description Input */}
        {isEditing && ( // Conditionally render the description input
          <input
            type="text"
            value={editDesc}
            className="w-full text-14-500 text-grey border-none bg-transparent focus:outline-none focus:ring-0 hover:bg-transparent ml-[24px]" // Added margin-left
            placeholder="Add Desc"
            onChange={handleEditDescChange}
            onBlur={handleEditBlur} // Important: Call handleEditBlur here too
            onKeyDown={handleKeyDown}
          />
        )}
        {task?.description &&
          !isEditing && ( // Show description if it exists and not editing
            <p className="ml-[24px] w-[80%] text-grey text-14-500">{task.description}</p>
          )}

        <div className="w-full pl-[24px] flex-wrap flex gap-[8px]">
          {/* Due Date */}
          {isEditing ? (
            <div className="relative ml-[24px]">
              <button className="flex items-center bg-button rounded-full px-[12px] py-[4px] gap-[10px] text-12-500 text-secondary-text" onClick={() => setShowDatePicker(!showDatePicker)}>
                <FaRegCalendarCheck className="text-lg" />
                {editDueDate ? editDueDate.toLocaleDateString("en-GB") : "Add Date"}
              </button>
              {showDatePicker && (
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-button p-2 rounded-lg shadow-lg z-50">
                  <DatePicker
                    selected={editDueDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy" // Customize date format
                    inline
                  />
                </div>
              )}
            </div>
          ) : (
            task.due_date && (
              <div className="rounded-full  w-fit bg-button text-12-500 text-secondary-text py-[4px] gap-[10px] px-[12px] flex flex-row justify-start items-center">
                <FaRegCalendarCheck className="text-lg" />
                {task.due_date}
              </div>
            )
          )}
          {/* {task.due_date && (
            <div className="rounded-full w-fit bg-button text-12-500 text-secondary-text py-[4px] gap-[10px] px-[12px] flex flex-row justify-start items-center">
              <FaRegCalendarCheck className="text-lg" />
              {task.due_date}
            </div>
          )} */}
          {/* completion */}
          {isEditing ? (
            <div className="relative ml-[24px]">
              <button
                className="flex items-center bg-button rounded-full px-[12px] py-[4px] gap-[10px] text-12-500 text-secondary-text"
                onClick={() => setShowTaskCompletionMenu(!showTaskCompletionMenu)} // Toggle menu
              >
                {editCompletion ? editCompletion : "Add Status"} {/* Show status or "Add Status" */}
              </button>

              {showTaskCompletionMenu && (
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-button p-2 rounded-lg shadow-lg z-50">
                  {["not started", "in progress", "done"].map((status) => (
                    <button key={status} className="block text-text w-full text-left px-4 py-2 text-14-500 hover:bg-secondary rounded-[12px]" onClick={() => handleCompletionSelect(status)}>
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            task.is_completed && <div className="rounded-full w-fit bg-button text-14-500 text-secondary-text py-[4px] gap-[10px] px-[12px] flex flex-row justify-start items-center">{task.is_completed}</div>
          )}

          {/* Priority */}
          {isEditing ? (
            <div className="relative ml-[24px]">
              <button
                className="flex items-center bg-button rounded-full px-[12px] py-[4px] gap-[10px] text-12-500 text-secondary-text"
                onClick={() => setShowTaskPriorityMenu(!showTaskPriorityMenu)} // Use Task's state
              >
                {editPriority ? editPriority : "Add Priority"}
              </button>

              {showTaskPriorityMenu && ( // Use Task's state
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-button p-2 rounded-lg shadow-lg z-50">
                  {["High", "Medium", "Low"].map((level) => (
                    <button key={level} className="block text-text w-full text-left px-4 py-2 text-14-500 hover:bg-secondary rounded-[12px]" onClick={() => handlePrioritySelect(level)}>
                      {level}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            task.priority && <div className="rounded-full w-fit bg-button text-14-500 text-secondary-text py-[4px] gap-[10px] px-[12px] flex flex-row justify-start items-center">{task.priority}</div>
          )}
        </div>
      </div>
    </div>
  );
}


