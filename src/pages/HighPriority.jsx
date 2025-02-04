import Filter from "../components/Filter";
import Task from "../components/task";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { addTodoAsync, getTasksAsync } from "../store/todoSlice";
import CreateTask from "../components/CreateTask";
const HighPriority = () => {
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
    const filter = {};

    if (priorityFilter) {
      filter.priority = priorityFilter;
    }

    if (completionFilter) {
      filter.is_complete = completionFilter;
    }

    if (formattedDateRange.start && formattedDateRange.end) {
      filter.start = formattedDateRange.start;
      filter.end = formattedDateRange.end;
    }

    dispatch(getTasksAsync({ token, filter, category: "high_priority" }));
  }, [dispatch, token, priorityFilter, completionFilter, formattedDateRange]);

  useEffect(() => {
    if (token) {
      fetchTasksWithFilters();
    }
  }, [token, fetchTasksWithFilters]);

  const handleCreateTask = async () => {
    if (!taskTitle.trim()) return;
    await dispatch(addTodoAsync({ title: taskTitle, is_completed: "not started",priority:'High', token }));
    setTaskTitle("");
  };

  return (
    <>
      <div className="relative w-full h-full overflow-auto scroll-smooth">
        <section className={`flex  flex-col justify-start h-full pt-[30px] pb-[20vh] px-[12px] md:px-[24px] lg:px-[100px] xl:px-[220px]`}>
          {/* header */}
          <div className="header w-full flex flex-row justify-between mb-[30px]">
            <p className="text-page-title text-white">High Priority</p>
            <p className="text-page-title text-white">{todos.length}</p>
          </div>
          <Filter
            filterType="important"
            completionFilter={completionFilter}
            setCompletionFilter={setCompletionFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            formattedDateRange={formattedDateRange}
            setFormattedDateRange={setFormattedDateRange}
          />
          {/* Render task list */}
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-10 h-10 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : todos.length > 0 ? (
            todos.map((task) => <Task key={task.todo_id} task={task} />)
          ) : (
            <div className="w-full  h-full flex flex-col items-center justify-center gap-[20px]">
              <p className="text-[24px] font-bold text-grey flex flex-col items-center">No high-priority tasks found.</p>
            </div>
          )}
        </section>
        {/* Create new task */}
        <CreateTask taskTitle={taskTitle} setTaskTitle={setTaskTitle} handleCreateTask={handleCreateTask} loading={loading}></CreateTask>
      </div>
    </>
  );
};

export default HighPriority;
