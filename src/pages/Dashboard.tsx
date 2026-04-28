import { useState } from "react";
import { FaChartBar, FaSyringe, FaClipboardList, FaExclamationTriangle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Sidebar from "../components/Sidebar/Sidebar";
import PageHeader from "../components/PageHeader/PageHeader";
import KpiCard from "../components/KpiCard/KpiCard";
import ChartCard from "../components/charts/ChartCard";
import ComparisonModal from "../components/composed/ComparisonModal/ComparisonModal";
import DashboardLayout from "../components/layout/DashboardLayout";

const sidebarItems = [
  { key: "dashboard", label: "Dashboard", icon: MdDashboard },
  { key: "catalogo", label: "Catálogo", icon: FaSyringe },
  { key: "reportes", label: "Reportes", icon: FaClipboardList },
  { key: "alertas", label: "Alertas", icon: FaExclamationTriangle },
];

const symptomsData = [
  { label: "Miocarditis", value: 65 },
  { label: "Anafilaxia", value: 64 },
  { label: "Trombosis", value: 57 },
  { label: "Parálisis", value: 50 },
  { label: "Gastritis", value: 21 },
];

const effectivenessData = [
  { label: "Pfizer", value: 90 },
  { label: "Moderna", value: 85 },
  { label: "AZ", value: 70 },
  { label: "J&J", value: 66 },
  { label: "Sinovac", value: 55 },
];

const vaccineList = ["Pfizer", "Moderna", "AstraZeneca", "Johnson & Johnson", "Sinovac"];

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  function handleCompare(vaccineA: string, vaccineB: string) {
    console.log("Comparando:", vaccineA, vaccineB);
    setModalOpen(false);
  }

  return (
    <DashboardLayout>
      <Sidebar
        items={sidebarItems.map((item) => ({
          ...item,
          onClick: () => setActiveItem(item.key),
        }))}
        activeItem={activeItem}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
        userName="Caro Ramírez"
        userRole="Director de finanzas"
      />

      <main className="flex flex-1 flex-col gap-6 overflow-y-auto p-8 min-h-0">

        <PageHeader
          title="Dashboard Ejecutivo"
          description="Resumen general de vacunas y eventos adversos"
          date="27 Abril 2026"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Total Vacunas Registradas"
            value="1,284"
            change={12}
            color="#6366F1"
            icon={<FaSyringe size={24} />}
          />
          <KpiCard
            title="Eventos Adversos Reportados"
            value="342"
            change={-5}
            color="#EF4444"
            icon={<FaExclamationTriangle size={24} />}
          />
          <KpiCard
            title="Reportes del Mes"
            value="87"
            change={8}
            color="#10B981"
            icon={<FaClipboardList size={24} />}
          />
          <KpiCard
            title="Tasa de Efectividad Promedio"
            value="73%"
            change={3}
            color="#F59E0B"
            icon={<FaChartBar size={24} />}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 overflow-hidden">
          <ChartCard
            title="Frecuencia de Síntomas Adversos"
            subtitle="Distribución estimada por síntoma reportado"
            data={symptomsData}
          />
          <ChartCard
            title="Efectividad por Vacuna"
            subtitle="Porcentaje de efectividad estimada"
            data={effectivenessData}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-xl bg-[#5B84E9] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#4a73d8] transition-colors"
          >
            Comparar Vacunas
          </button>
        </div>

      </main>

      <ComparisonModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCompare={handleCompare}
        vaccines={vaccineList}
      />
    </DashboardLayout>
  );
}
