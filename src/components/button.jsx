export default function Button({onClick, children, className }) {
  return <button onClick={onClick} className={`w-full rounded-full p-[14px] bg-black flex items-center justify-center text-14-700 text-base ${className}`}>{children}</button>;
}