import { FaRegCalendarCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoAsync, editTodoAsync } from "../store/todoSlice";
import { useSwipeable } from "react-swipeable";
import { useCallback, useState,useRef,useEffect } from "react";
import debounce from "lodash/debounce";


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

const handleComplete = () => {
  const newStatus = task.is_completed === "done" ? "not started" : "done";
  dispatch(editTodoAsync({ todo_id: task.todo_id, updates: { is_completed: newStatus }, token }));
};

const handleEditClick = () => {
  setIsEditing(true);
};

const handleEditBlur = (e) => {
  if (taskRef.current && !taskRef.current.contains(e.relatedTarget)) {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDesc(task.description || "");
  }
};

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

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleEditBlur(); 
  }
};

const handlers = useSwipeable({
  onSwipedLeft: () => handleDelete(),
  preventScrollOnSwipe: true,
  trackMouse: true,
});


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




console.log("ini isEditing",isEditing);

  return (
    <div {...handlers} className="task w-full">
      <div onClick={handleEditClick} ref={taskRef} className="task ref={taskRef}  w-full border-b-1 transition duration-300 ease-in-out hover:bg-button border-button py-[12px] border-b flex flex-col gap-[8px]">
        <div className="flex flex-row items-center w-full gap-[8px]">
          <input type="checkbox" className="form-radio h-4 w-4 text-blue-600" checked={task.is_completed === "done"} onChange={handleComplete} />
          <div className="w-full flex flex-row items-center">
            {" "}
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                className="w-full text-15-700 text-text border-none bg-transparent focus:outline-none focus:ring-0 hover:bg-transparent"
                onChange={handleEditTitleChange}
                onBlur={handleEditBlur}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            ) : (
              <p className="text-15-700 text-text cursor-pointer">{task.title}</p>
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
  );
}

