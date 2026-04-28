import { useState } from "react";
import { FaSyringe, FaClipboardList } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import VaccineCatalogTable from "../components/VaccineCatalogTable/VaccineCatalogTable";
import Sidebar from "../components/Sidebar/Sidebar";
import PageHeader from "../components/PageHeader/PageHeader";
import { useNavigate } from "react-router-dom";

const Catalog = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const navigate = useNavigate();

const userItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: MdDashboard,
    onClick: () => navigate("/dashboard"),
  },
  {
    key: "analisis",
    label: "Análisis de síntomas",
    icon: FaClipboardList,
    onClick: () => navigate("/analisis_sintomas"),
  },
  {
    key: "catalogo",
    label: "Catálogo de vacunas",
    icon: FaSyringe,
    onClick: () => navigate("/catalog"),
  },
];

const mockVaccines = [
  { id: '1', name: 'Cominarty', farmaceutica: 'Pfizer', costo: 19.50, costoMayoreo: 15.80, temperatura: '-70°C', efectividad: 95, longevidad: '2 horas (ambiente)' },
  { id: '2', name: 'Spikevax', farmaceutica: 'Moderna', costo: 25.00, costoMayoreo: 20.50, temperatura: '-20°C', efectividad: 94, longevidad: '12 horas (ambiente)' },
  { id: '3', name: 'Vaxzevria', farmaceutica: 'AstraZeneca', costo: 4.00, costoMayoreo: 2.80, temperatura: '2-8°C', efectividad: 74, longevidad: '6 meses (refrigerado)' },
  { id: '4', name: 'Janssen', farmaceutica: 'Johnson & Johnson', costo: 10.00, costoMayoreo: 8.50, temperatura: '2-8°C', efectividad: 66, longevidad: '3 meses (refrigerado)' },
  { id: '5', name: 'CoronaVac', farmaceutica: 'Sinovac', costo: 13.60, costoMayoreo: 10.20, temperatura: '-18°C', efectividad: 51, longevidad: '12 meses (refrigerado)' },
  { id: '6', name: 'Sinopharm', farmaceutica: 'Sinopharm', costo: 36.00, costoMayoreo: 28.00, temperatura: '2-8°C', efectividad: 79, longevidad: '24 meses (refrigerado)' },
];




  return (
    <div className="flex h-screen bg-[#F5F7FA]">
      <Sidebar
        items={userItems}
        activeItem="catalogo"
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onLogoutClick={() => navigate("/")}
        userName="Caro Ramirez"
        userRole="Director de finanzas"
      />

      <main className="flex flex-1 flex-col p-6 overflow-hidden">
        <div className="mb-6">
          <PageHeader
            title="Catálogo de vacunas"
            description="Explora el catálogo completo de vacunas disponibles, con información detallada sobre cada una."
            lastUpdated="Última actualización: 05 de marzo 2026"
          />
        </div>

        <section className="flex-1 rounded-xl bg-white p-4 shadow overflow-auto text-align: left">
          <VaccineCatalogTable vaccines={mockVaccines} />
        </section>
      </main>
    </div>
  );
};

export default Catalog;