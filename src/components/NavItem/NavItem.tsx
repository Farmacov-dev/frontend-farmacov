import type { ComponentType } from 'react';

  interface NavItemProps {
    label: string;
    icon?: ComponentType<{ size?: number; className?: string }>;
    active?: boolean;
    collapsed?: boolean;
    onClick?: () => void;
  }

  const NavItem = ({ label, icon: Icon, active = false, collapsed = false, onClick }: NavItemProps) => (
    <div
      onClick={onClick}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-sm font-[Inter,sans-serif] transition-colors 
  duration-150 ${
        active
          ? 'bg-indigo-500 text-white font-semibold'
          : 'bg-transparent text-gray-700 font-normal hover:bg-gray-100'
      }`}
    >
      {Icon && <Icon size={18} />}
      {!collapsed && label}
    </div>
  );

  export default NavItem;