import type { IconType } from "react-icons";

interface NavItemProps {
  label: string;
  icon?: IconType;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

const NavItem = ({
  label,
  icon: Icon,
  active = false,
  collapsed = false,
  onClick,
}: NavItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center rounded-lg px-3 py-2 font-inter text-sm transition-colors duration-150 ${
        collapsed ? "justify-center" : "gap-[10px]"
      } ${
        active
          ? "bg-[#6366F1] font-semibold text-white"
          : "bg-transparent font-normal text-[#374151] hover:bg-[#F3F4F6]"
      }`}
    >
      {Icon && <Icon size={16} />}
      {!collapsed && <span>{label}</span>}
    </div>
  );
};

export default NavItem;