export default function CreateTask({taskTitle,setTaskTitle,handleCreateTask,loading}){
    const isButtonDisabled = !taskTitle.trim();
    return (
      <div className="fixed bottom-0 w-full md:w-[calc(100%-255px)] px-[12px] md:px-[24px] lg:px-[100px] xl:px-[220px] h-auto">
        <div className="w-full px-[10px] py-[16px] flex flex-row justify-between items-center bg-button rounded-t-[16px]">
          <input
            type="text"
            className="text-16-500 w-[60%] sm:w-[80%] appearance-none bg-inherit text-text leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Create a new Task"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <button
            className={`rounded-full text-14-700 lg:text-16-700 text-text py-[8px] lg:py-[12px] px-[16px] lg:px-[32px] whitespace-nowrap 
            ${isButtonDisabled ? "bg-grey cursor-not-allowed" : "bg-blue hover:bg-blue-700"} `} 
            onClick={handleCreateTask}
            disabled={isButtonDisabled}
          >
            {loading ? "Creating..." : "Create +"}
          </button>
        </div>
      </div>
    );
}