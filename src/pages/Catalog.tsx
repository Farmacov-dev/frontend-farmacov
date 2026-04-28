import { useState } from "react";
import { FaSyringe, FaClipboardList } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import VaccineCatalogTable from "../components/VaccineCatalogTable/VaccineCatalogTable";
import PageHeader from "../components/PageHeader/PageHeader";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";

const Catalog = () => {
  const [activeItem, setActiveItem] = useState("catalog");
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const userItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: MdDashboard,
      onClick: () => {
        setActiveItem("dashboard");
        navigate("/dashboard");
      },
    },
    {
      key: "analisis_sintomas",
      label: "Analisis de vacunas",
      icon: FaClipboardList,
      onClick: () => {
        setActiveItem("analisis_sintomas");
        navigate("/analisis_sintomas");
      },
    },
    {
      key: "catalog",
      label: "Catalogo de vacunas",
      icon: FaSyringe,
      onClick: () => {
        setActiveItem("catalog");
        navigate("/catalog");
      },
    },
  ];

  const mockVaccines = [
    { id: "1", name: "Cominarty", farmaceutica: "Pfizer", costo: 19.5, costoMayoreo: 15.8, temperatura: "-70Â°C", efectividad: 95, longevidad: "2 horas (ambiente)" },
    { id: "2", name: "Spikevax", farmaceutica: "Moderna", costo: 25.0, costoMayoreo: 20.5, temperatura: "-20Â°C", efectividad: 94, longevidad: "12 horas (ambiente)" },
    { id: "3", name: "Vaxzevria", farmaceutica: "AstraZeneca", costo: 4.0, costoMayoreo: 2.8, temperatura: "2-8Â°C", efectividad: 74, longevidad: "6 meses (refrigerado)" },
    { id: "4", name: "Janssen", farmaceutica: "Johnson & Johnson", costo: 10.0, costoMayoreo: 8.5, temperatura: "2-8Â°C", efectividad: 66, longevidad: "3 meses (refrigerado)" },
    { id: "5", name: "CoronaVac", farmaceutica: "Sinovac", costo: 13.6, costoMayoreo: 10.2, temperatura: "-18Â°C", efectividad: 51, longevidad: "12 meses (refrigerado)" },
    { id: "6", name: "Sinopharm", farmaceutica: "Sinopharm", costo: 36.0, costoMayoreo: 28.0, temperatura: "2-8Â°C", efectividad: 79, longevidad: "24 meses (refrigerado)" },
  ];

  return (
    <DashboardLayout
      items={userItems}
      activeItem={activeItem}
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed(!collapsed)}
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

        <section className="flex-1 rounded-xl bg-white p-4 shadow overflow-auto text-align: left">
          <VaccineCatalogTable vaccines={mockVaccines} />
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Catalog;
