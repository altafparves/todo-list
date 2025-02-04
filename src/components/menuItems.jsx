import { useNavigate } from "react-router-dom";
import { FaInbox } from "react-icons/fa";
import { BsCalendar3 } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";



export default function MenuItems({ name, total, isActive, color, path, onClick, }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className={`flex flex-row justify-between items-center w-full p-[12px] rounded-[6px] ${isActive ? `text-white ${color}` : "bg-button text-text"}`} onClick={handleClick}>
      <div className="flex flex-row gap-[8px] items-center">
        <div className={`w-[26px] flex items-center justify-center h-[26px] rounded-full ${isActive ? `bg-text` : `${color}`} `}>
          {name === "All" ? (
            <FaInbox className="w-[18px] h-[18px]" color={`${isActive ? `#1660F6` : `#FFFFFA`}`} />
          ) : name === "Today" ? (
            <BsCalendar3 className="w-[15px] h-[15px]" color={`${isActive ? `#F2C31A` : `#FFFFFA`}`} />
          ) : name === "High Priority" ? (
            <p className={`text-16-700 ${isActive ? `text-red` : `#FFFFF`}`}>!</p>
          ) : (
            <FaCheck className="w-[18px] h-[18px]" color={`${isActive ? `#828282` : `#FFFFFA`}`} />
          )}
        </div>
        <p className={`text-14-700 ${isActive ? "text-text" : "text-secondary-text"}`}>{name}</p>
      </div>
      <p className={`text-14-700 ${isActive ? "text-text" : "text-secondary-text"}`}>{total}</p>
    </button>
  );
}