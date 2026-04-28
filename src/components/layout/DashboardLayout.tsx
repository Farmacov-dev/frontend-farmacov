import React from "react";
import type { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { logoutUser } from "../../services/auth";

type SidebarItem = {
  key: string;
  label: string;
  icon: IconType;
  onClick?: () => void;
};

type DashboardLayoutProps = {
  children: React.ReactNode;
  items: SidebarItem[];
  activeItem: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  userName?: string;
  userRole?: string;
};

const DashboardLayout = ({
  children,
  items,
  activeItem,
  collapsed,
  onToggleCollapse,
  userName = "Caro Ramirez",
  userRole = "Director de finanzas",
}: DashboardLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F7FB]">
      <Sidebar
        items={items}
        activeItem={activeItem}
        collapsed={collapsed}
        onToggleCollapse={onToggleCollapse}
        onLogoutClick={handleLogout}
        userName={userName}
        userRole={userRole}
      />
      <div className="flex-1 min-w-0 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
