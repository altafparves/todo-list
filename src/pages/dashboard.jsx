import Filter from "../components/Filter";
import Task from "../components/task";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState, useEffect,useCallback } from "react";
import { addTodoAsync, getTasksAsync } from "../store/todoSlice";

const Dashboard = () => {
const dispatch = useDispatch();
const [taskTitle, setTaskTitle] = useState("");
const { loading, todos } = useSelector((state) => state.todos);
const token = useSelector((state) => state.auth.token);

// filter state
const [priorityFilter, setPriorityFilter] = useState(null);
const [completionFilter, setCompletionFilter] = useState(null);
const [formattedDateRange, setFormattedDateRange] = useState({
  start: null,
  end: null,
});

const fetchTasksWithFilters = useCallback(() => {
  const filter = {}; // Start with an empty filter object

  if (priorityFilter) {
    // Check if priorityFilter has a value
    filter.priority = priorityFilter;
  }

  if (completionFilter) {
    // Check if completionFilter has a value (it can be true/false or null)
    filter.is_complete = completionFilter;
  }

  if (formattedDateRange.start && formattedDateRange.end) {
    // Check if both start and end dates are present
    filter.start = formattedDateRange.start;
    filter.end = formattedDateRange.end;
  }

  dispatch(getTasksAsync({ token, filter }));
}, [dispatch, token, priorityFilter, completionFilter, formattedDateRange]);

useEffect(() => {
  if (token) {
    fetchTasksWithFilters();
  }
}, [token, fetchTasksWithFilters]);

const handleCreateTask = async () => {
  if (!taskTitle.trim()) return;
  await dispatch(addTodoAsync({ title: taskTitle, token }));
  setTaskTitle("");
};

  return (
    <>
      <div className="relative w-full h-full overflow-auto scroll-smooth">
        <section className={`flex  flex-col justify-start h-auto pt-[30px] pb-[20vh] px-[12px] md:px-[24px] lg:px-[100px] xl:px-[220px]`}>
          {/* header */}
          <div className="header w-full flex flex-row justify-between mb-[30px]">
            <p className="text-page-title text-white">All</p>
            <p className="text-page-title text-white">{todos.length}</p>
          </div>
          <Filter completionFilter={completionFilter} setCompletionFilter={setCompletionFilter} priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} formattedDateRange={formattedDateRange} setFormattedDateRange={setFormattedDateRange} />
          {/* Render task list */}
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-10 h-10 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : todos.length > 0 ? (
            todos.map((task) => <Task key={task.todo_id} task={task} />)
          ) : (
            <p>No tasks available</p>
          )}
        </section>

        {/* Create new task */}
        <div className="fixed bottom-0 w-full md:w-[calc(100%-255px)] px-[12px] md:px-[24px] lg:px-[100px] xl:px-[220px] h-auto">
          <div className="w-full px-[10px] py-[16px] flex flex-row justify-between items-center bg-button rounded-t-[16px]">
            <input
              type="text"
              className="text-16-500 w-[60%] sm:w-[80%] appearance-none bg-inherit text-text leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Create a new Task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <button className="bg-blue rounded-full text-14-700  lg:text-16-700 text-text py-[8px] lg:py-[12px] px-[16px] lg:px-[32px] whitespace-nowrap" onClick={handleCreateTask}>
              {loading ? "Creating..." : "Create +"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
