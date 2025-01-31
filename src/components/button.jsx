export default function Button({onClick, children, className }) {
  return <button onClick={onClick} className={`w-full rounded-full p-[14px] bg-blue flex items-center justify-center text-16-700 text-text ${className}`}>{children}</button>;
}