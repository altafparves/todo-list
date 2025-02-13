import Filter from "../components/Filter";
import Task from "../components/task";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { getTasksAsync } from "../store/todoSlice";
import * as motion from "motion/react-client";

const Completed = () => {
  const dispatch = useDispatch();
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

    dispatch(getTasksAsync({ token, filter, category: "completed" }));
  }, [dispatch, token, priorityFilter, completionFilter, formattedDateRange]);

  useEffect(() => {
    if (token) {
      fetchTasksWithFilters();
    }
  }, [token, fetchTasksWithFilters]);


const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

  return (
    <>
      <div className="relative w-full h-full overflow-auto scroll-smooth">
        <section className={`flex  h-full  flex-col justify-start  pt-[30px] pb-[20vh] px-[12px] md:px-[24px] lg:px-[100px] xl:px-[220px] min-h-screen overflow-y-auto scroll-smooth`}>
          {/* header */}
          <div className="header w-full flex flex-row justify-between mb-[30px]">
            <p className="text-page-title text-white">Completed</p>
            <p className="text-page-title text-white">{todos.length}</p>
          </div>
          <Filter
            filterType="completed"
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
            <motion.ul initial="hidden" animate="visible" variants={listVariants}>
              {todos.map((task) => (
                <motion.li key={task.todo_id} variants={itemVariants}>
                  <Task task={task} />
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <div className="w-full  h-full flex flex-col items-center justify-center gap-[20px]">
              <p className="text-[24px] font-bold text-grey flex flex-col items-center">No completed tasks yet.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Completed;
