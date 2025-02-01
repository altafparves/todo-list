import Filter from "../components/Filter";
import Task from "../components/task";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { addTodoAsync,getTasksAsync } from "../store/todoSlice";
const Dashboard = () => {
//    
const dispatch = useDispatch();
const [taskTitle, setTaskTitle] = useState("");
const { loading, todos } = useSelector((state) => state.todos);
const token = useSelector((state) => state.auth.token);

useEffect(() => {
  if (token) {
    dispatch(getTasksAsync(token)); // Fetch tasks on mount
  }
}, [dispatch, token]);

const handleCreateTask = async () => {
  if (!taskTitle.trim()) return;
  await dispatch(addTodoAsync({ title: taskTitle, token }));
  setTaskTitle("");
};


  return (
    <>
      {/* <DashboardLayout> */}
      <section className="overflow-auto relative w-full flex flex-col justify-start h-full pt-[30px]">
        {/* header */}
        <div className="header w-full flex flex-row justify-between mb-[30px]">
          <p className="text-page-title text-white">All</p>
          <p className="text-page-title text-white">{todos.length}</p>
        </div>
        <Filter></Filter>
        {/* Render task list */}
        {loading ? <p>Loading tasks...</p> : todos.length > 0 ? todos.map((task) => <Task key={task.todo_id} task={task} />) : <p>No tasks available</p>}
        {/* create new task */}
        <div className="w-full absolute left-0 right-50 bottom-16 px-[10px] py-[16px] flex flex-row justify-between items-center bg-button rounded-t-[16px]">
          <input
            type="text"
            className="text-16-500 w-[80%] appearance-none bg-inherit  text-text leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Create a new Task"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <button className="bg-blue rounded-full text-16-700 text-text py-[16px] px-[32px]" onClick={handleCreateTask}>
            {loading ? "Creating..." : "Create +"}
          </button>
        </div>
      </section>
    </>
  );
};


export default Dashboard;
