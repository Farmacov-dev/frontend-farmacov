"use client";

import {
  LayoutGrid,
  Users as UsersIcon,
  FileText,
  CheckCircle,
  Briefcase,
  LogOut,
} from "lucide-react";
import UserAvatar from "./UserAvatar.tsx";

const NAV = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Análisis de Síntomas", href: "/users", icon: UsersIcon },
  { name: "Catálogo de Vacunas", href: "/reports", icon: FileText },
  { name: "Anotaciones", href: "/validation", icon: CheckCircle },
];

export default function Sidebar() {
  const pathname = window.location.pathname;

  return (
    <aside className="fixed left-0 top-0 z-10 flex h-screen w-[250px] flex-col bg-[#F1F5F9] shadow-lg">
      <div className="p-6 pb-4">
        <div className="mt-[15px] mb-[50px] flex items-center justify-left gap-4 py-6">
          <div className="flex items-center justify-center rounded-lg bg-[#6B97EE] p-2">

          </div>

          <div className="flex flex-col">
            <span className="text-lg font-bold text-black">Farmacov</span>
            <span className="text-xs text-black">
              Portal Ejecutivo
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-3 overflow-y-auto px-6 pb-6">
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <a
              key={item.name}
              href={item.href}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-xs transition-all duration-200 ${
                isActive
                  ? "text-black"
                  : "text-[#c7c9d1] hover:bg-[#8dadee] hover:text-white"
              }`}
              style={isActive ? { backgroundColor: "#6B97EE" } : {}}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </a>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-6">
        <div className="mb-4 flex items-center gap-3">
          <UserAvatar />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-black">Director de Finanzas</span>
            <span className="text-xs text-black">director@farmacov.com</span>
          </div>
        </div>

        <button
          type="button"
          className="flex w-full items-center gap-3 px-4 py-3 text-sm border-2 border-[#CDD0D4] text-black  transition-all duration-200 hover:bg-white/10 hover:text-white"
        >
          <LogOut size={20} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}