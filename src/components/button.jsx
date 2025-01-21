export default function Button({ children, className }) {
  return <button className={`w-full rounded-full p-[14px] bg-black flex items-center justify-center text-14-700 text-base ${className}`}>{children}</button>;
}