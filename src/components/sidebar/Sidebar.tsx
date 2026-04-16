import React from "react";
import SidebarItem from "./SidebarItem";
import UserProfile from "./UserProfile";

const Sidebar = () => {
  return (
    <aside className="w-[260px] min-h-screen bg-white border-r border-slate-200 px-4 py-6 flex flex-col justify-between">
      <div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Farmacov</h2>
          <p className="text-sm text-slate-500 mt-1">Portal Ejecutivo</p>
        </div>

        <nav className="mt-8 flex flex-col gap-2">
          <SidebarItem label="Dashboard" />
          <SidebarItem label="Análisis de síntomas" active />
          <SidebarItem label="Catálogo de vacunas" />
          <SidebarItem label="Anotaciones" />
        </nav>
      </div>

      <div>
        <UserProfile
          name="Caro Ramírez"
          role="Director de finanzas"
        />
      </div>
    </aside>
  );
};

export default Sidebar;