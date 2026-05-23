// src/components/layout/DashboardLayout.tsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaSyringe, FaClipboardList, FaUserShield, FaHistory } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { useSidebar } from "../../context/SidebarContext";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Consumimos los contextos directamente aquí
  const { collapsed, setCollapsed } = useSidebar();
  const { userName, userRole, logout, canView, isAdmin } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // 1. Centralizamos todos los items posibles de la aplicación
  const sidebarItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: MdDashboard,
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "analisis_sintomas",
      label: "Analisis de sintomas",
      icon: FaClipboardList,
      onClick: () => navigate("/analisis_sintomas"),
    },
    {
      key: "catalog",
      label: "Catalogo de vacunas",
      icon: FaSyringe,
      onClick: () => navigate("/catalog"),
    },
    {
      key: "roles-permisos",
      label: "Roles y Permisos",
      icon: FaUserShield,
      onClick: () => navigate("/roles-permisos"),
    },
    {
      key: "historial",
      label: "Historial",
      icon: FaHistory,
      onClick: () => navigate("/historial"),
    }
  ];

  // 2. Filtramos usando tu lógica de permisos exacta
  const itemsFiltrados = sidebarItems.filter((item) => {
    if (item.key === 'dashboard') return canView('dashboard');
    if (item.key === 'catalog') return canView('catalogo');
    if (item.key === 'analisis_sintomas') return canView('analisis');
    if (item.key === 'roles-permisos') return isAdmin;
    if (item.key === 'historial') return isAdmin;
    return true;
  });

  // 3. Calculamos qué item está activo basándonos en la URL actual
  const activeItem = location.pathname.replace("/", "");

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F7FB]">
      <Sidebar
        items={itemsFiltrados}
        activeItem={activeItem}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onLogoutClick={handleLogout}
        userName={userName}
        userRole={userRole}
      />
      <div className="flex-1 min-w-0 overflow-x-hidden flex flex-col">
        {/* 4. Aquí es donde React Router inyectará las pantallas */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;