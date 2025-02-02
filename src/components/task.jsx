import { FaRegCalendarCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoAsync, editTodoAsync } from "../store/todoSlice";
import { useSwipeable } from "react-swipeable";
import { useState } from "react";
import { useCallback } from "react";
import debounce from "lodash/debounce";


export default function Task({ task }) {
  const handlers = useSwipeable({
    onSwipedLeft: () => handleDelete(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
const dispatch = useDispatch();
const token = useSelector((state) => state.auth.token);
const [isEditing, setIsEditing] = useState(false);
const [editTitle, setEditTitle] = useState(task.title);
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

const handleEditBlur = () => {
  setIsEditing(false); // Exit edit mode on blur
  setEditTitle(task.title); // Reset to original title if no changes
};

const debouncedEdit = useCallback(
  debounce((newTitle) => {
    dispatch(editTodoAsync({ todo_id: task.todo_id, updates: { title: newTitle }, token }));
  }, 500),
  [dispatch, token, task.todo_id] // Add task.todo_id to dependency array
);

const handleEditChange = (e) => {
  const newTitle = e.target.value;
  setEditTitle(newTitle);
  debouncedEdit(newTitle);
};

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleEditBlur(); // Simulate blur on Enter key press
  }
};

  return (
    <div {...handlers} className="task w-full">
      <div className="task w-full border-b-1 transition duration-300 ease-in-out hover:bg-button border-button py-[12px] border-b flex flex-col gap-[8px]">
        <div className="flex flex-row items-center w-full gap-[8px]">
          <input type="checkbox" className="form-radio h-4 w-4 text-blue-600" checked={task.is_completed === "done"} onChange={handleComplete} />
          <div className="w-full flex flex-row items-center">
            {" "}
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                className="w-full text-15-700 text-text border-none bg-transparent focus:outline-none focus:ring-0 hover:bg-transparent"
                onChange={handleEditChange}
                onBlur={handleEditBlur} 
                onKeyDown={handleKeyDown} 
                autoFocus
              />
            ) : (
              <p className="text-15-700 text-text cursor-pointer" onClick={handleEditClick}>
                {" "}
                {/* Make the title clickable */}
                {task.title}
              </p>
            )}
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
  );
}

