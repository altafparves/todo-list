export  function MenuItems({ name, total, isActive, color }) {
  return (
    <button className={`flex transition-all duration-300 ease-in-out flex-row justify-between items-center w-full rounded-[6px] p-[12px] ${isActive ? color : "bg-button"}`}>
      <div className="flex flex-row gap-[8px]">
        <div className={`icon ${color} w-[22px] h-[22px] rounded-full`}></div>
        <p className={`text-14-700  ${isActive ? "text-text" : "text-secondary-text"}`}>{name}</p>
      </div>
      <p className={`text-14-700  ${isActive ? "text-text" : "text-secondary-text"}`}>{total}</p>
    </button>
  );
}
