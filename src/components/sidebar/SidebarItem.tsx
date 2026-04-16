import React from "react";

type SidebarItemProps = {
  label: string;
  active?: boolean;
};

const SidebarItem = ({ label, active = false }: SidebarItemProps) => {
  return (
    <button
      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition ${
        active
          ? "bg-blue-500 text-white"
          : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      {label}
    </button>
  );
};

export default SidebarItem;