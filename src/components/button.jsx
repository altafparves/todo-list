export default function Button({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-full p-[14px] bg-blue flex items-center justify-center text-16-700 text-text 
                  transition duration-300 ease-in-out 
                  hover:bg-sky-800 hover:shadow-lg 
                  active:scale-95 
                  ${className}`}
    >
      {children}
    </button>
  );
}
