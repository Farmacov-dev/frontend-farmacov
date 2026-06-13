import { FaShieldAlt, FaSignOutAlt, FaCompress } from "react-icons/fa";
import type { IconType } from "react-icons";
import NavItem from "../NavItem/NavItem";
import Button from "../primary/Button/Button";
import UserProfile from "./UserProfile";

interface SidebarItem {
  key: string;
  label: string;
  icon: IconType;
  onClick?: () => void;
}

interface SidebarProps {
  items: SidebarItem[];
  activeItem?: string;
  collapsed?: boolean;
  onLogoutClick?: () => void;
  onToggleCollapse?: () => void;
  userName?: string;
  userRole?: string;
}

const Sidebar = ({
  items,
  activeItem = "",
  collapsed = false,
  onLogoutClick,
  onToggleCollapse,
  userName = "",
  userRole = "",
}: SidebarProps) => {
  const renderNavItem = ({ key, label, icon: Icon, onClick }: SidebarItem) => (
    <NavItem
      key={key}
      label={label}
      icon={Icon}
      active={activeItem === key}
      collapsed={collapsed}
      onClick={onClick}
    />
  );

  const renderActionButton = (
    icon: React.ReactNode,
    label: string,
    onClick?: () => void
  ) => (
    <Button
      variant="sidebar"
      onClick={onClick}
      className={`flex w-full items-center ${
        collapsed ? "justify-center py-4" : "gap-2.5 px-4 py-[14px]"
      }`}
    >
      {icon}
      {!collapsed && label}
    </Button>
  );

  return (
    <aside
      className={`
        h-screen border-r border-[#D7DCE3] bg-[#ECEFF3]
        transition-all duration-200
        ${collapsed ? "w-24 min-w-[96px] p-4" : "w-[300px] min-w-[300px] p-5"}
      `}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className={`mb-6 flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-[#5B84E9] text-white">
              <FaShieldAlt size={20} />
            </div>

            {!collapsed && (
              <div className="leading-tight">
                <p className="text-[20px] font-bold text-[#111827]">Farmacov</p>
                <p className="mt-1 text-xs text-[#7B7B7B]">Portal Ejecutivo</p>
              </div>
            )}
          </div>

          <nav className="mt-2 flex flex-col gap-[18px]">
            {items.map(renderNavItem)}
          </nav>
        </div>

        <div className="flex flex-col gap-[18px]">
          <UserProfile
            userName={userName}
            userRole={userRole}
            collapsed={collapsed}
          />

          {renderActionButton(<FaSignOutAlt size={16} />, "Cerrar Sesion", onLogoutClick)}

          {renderActionButton(<FaCompress size={16} />, "Comprimir", onToggleCollapse)}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
