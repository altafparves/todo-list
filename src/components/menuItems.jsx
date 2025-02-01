// import { useNavigate } from "react-router-dom";

// export default function MenuItems({ name, total, isActive, color, path }) {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     if (path) {
//       navigate(path);
//     }
//   };

//   return (
//     <button className={`flex flex-row justify-between items-center w-full p-[12px] rounded-[6px] ${isActive ? "bg-blue text-white" : "bg-button text-text"}`} onClick={handleClick}>
//       <div className="flex flex-row gap-[8px] items-center">
//         <div className={`w-[8px] h-[8px] rounded-full ${color}`}></div>
//         <p className={`text-14-700  ${isActive ? "text-text" : "text-secondary-text"}`}>{name}</p>
//       </div>
//       <p className={`text-14-700  ${isActive ? "text-text" : "text-secondary-text"}`}>{total}</p>
//     </button>
//   );
// }
import { useNavigate } from "react-router-dom";

export default function MenuItems({ name, total, isActive, color, path, onClick }) {
  // Add onClick prop
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
    if (onClick) {
      // Call the onClick handler from the parent
      onClick();
    }
  };

  return (
    <button className={`flex flex-row justify-between items-center w-full p-[12px] rounded-[6px] ${isActive ? `text-white ${color}` : "bg-button text-text"}`} onClick={handleClick}>
      <div className="flex flex-row gap-[8px] items-center">
        <div className={`w-[8px] h-[8px] rounded-full ${isActive ? `bg-text ` : `${color}`} `}></div>
        <p className={`text-14-700 ${isActive ? "text-text" : "text-secondary-text"}`}>{name}</p>
      </div>
      <p className={`text-14-700 ${isActive ? "text-text" : "text-secondary-text"}`}>{total}</p>
    </button>
  );
}