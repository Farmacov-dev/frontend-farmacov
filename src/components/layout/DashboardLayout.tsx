// src/components/layout/DashboardLayout.tsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaSyringe, FaClipboardList, FaUserShield, FaHistory, FaUsers, FaDatabase } from "react-icons/fa";
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
    },
    {
    key: "usuarios",
    label: "Gestión de Usuarios",
    icon: FaUsers,
    onClick: () => navigate("/usuarios"),
    },
    // --- NUESTRA NUEVA PANTALLA ---
    {
      key: "gestion-datos",
      label: "Gestión de Datos",
      icon: FaDatabase,
      onClick: () => navigate("/gestion-datos"),
    }
  ];

  // 2. Filtramos según el rol del usuario
  // No-admin users: Dashboard, Análisis de Sintomas, Catálogo de Vacunas
  // Admin users: Roles y Permisos, Historial, Gestión de Usuarios, Gestión de Datos
  const itemsFiltrados = sidebarItems.filter((item) => {
    const adminItems = ['roles-permisos', 'historial', 'usuarios', 'gestion-datos'];

    // Admin users see only admin sections
    if (isAdmin) {
      return adminItems.includes(item.key);
    }

    // Non-admin users see only non-admin sections with proper permissions
    if (item.key === 'dashboard') return canView('dashboard');
    if (item.key === 'catalog') return canView('catalogo');
    if (item.key === 'analisis_sintomas') return canView('analisis');

    return false;
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