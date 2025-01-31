import { MenuItems } from "./menuItems";

export default function Sidebar({ isOpen, className }) {
    console.log(isOpen);
  return (
    <div
      className={`pt-[60px] md:pt-[12px] right-0 absolute md:relative flex flex-col justify-between bg-secondary w-[300px] p-[12px] transform transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } ${className}`}
    >
      <div className="flex flex-col gap-[8px]">
        <div className="flex w-full flex-col gap-[10px]">
          <MenuItems name="All" total="5" isActive={true} color="bg-blue" />
          <MenuItems name="Today" total="5" isActive={false} color="bg-yellow" />
          <MenuItems name="High Priority" total="5" isActive={false} color="bg-red" />
          <MenuItems name="Completed" total="5" isActive={false} color="bg-grey" />
        </div>

      </div>
    </div>
  );
}