// src/pages/Catalog.tsx
import { useState } from "react";
import { FaSyringe, FaClipboardList } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useSidebar } from "../context/SidebarContext";
import VaccineCatalogTable from "../components/VaccineCatalogTable/VaccineCatalogTable";
import PageHeader from "../components/PageHeader/PageHeader";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useVacunas } from "../hooks/useVacunas";

const Catalog = () => {
  const [activeItem, setActiveItem] = useState("catalog");
  const { collapsed, setCollapsed } = useSidebar();
  const navigate = useNavigate();

  const { data: vacunas, isPending, isError } = useVacunas()

  const userItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: MdDashboard,
      onClick: () => { setActiveItem("dashboard"); navigate("/dashboard"); },
    },
    {
      key: "analisis_sintomas",
      label: "Analisis de vacunas",
      icon: FaClipboardList,
      onClick: () => { setActiveItem("analisis_sintomas"); navigate("/analisis_sintomas"); },
    },
    {
      key: "catalog",
      label: "Catalogo de vacunas",
      icon: FaSyringe,
      onClick: () => { setActiveItem("catalog"); navigate("/catalog"); },
    },
  ];

  return (
    <DashboardLayout
      items={userItems}
      activeItem={activeItem}
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((prev) => !prev)}
      userName="Caro Ramirez"
      userRole="Director de finanzas"
    >
      <main className="flex flex-1 flex-col p-6 overflow-hidden">
        <div className="mb-6">
          <PageHeader
            title="Catalogo de vacunas"
            description="Explora el catalogo completo de vacunas disponibles, con información detallada sobre cada una."
            lastUpdated="Ultima actualización: 05 de marzo 2026"
          />
        </div>

        <section className="flex-1 rounded-xl bg-white p-4 shadow overflow-auto">
          {isPending && (
            <p className="text-gray-400 text-sm">Cargando vacunas...</p>
          )}
          {isError && (
            <p className="text-red-400 text-sm">Error cargando vacunas.</p>
          )}
          {!isPending && !isError && vacunas && (
            <VaccineCatalogTable vaccines={vacunas} />
          )}
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Catalog;