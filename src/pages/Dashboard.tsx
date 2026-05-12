// src/pages/Dashboard.tsx
import { useState } from "react";
import { FaChartBar, FaSyringe, FaClipboardList, FaExclamationTriangle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader/PageHeader";
import KpiCard from "../components/KpiCard/KpiCard";
import ChartCard from "../components/charts/ChartCard";
import ComparisonModal from "../components/composed/ComparisonModal/ComparisonModal";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useSidebar } from "../context/SidebarContext";
import { useKpis, useTopSintomas, useEfectividad, useCostosVacuna } from "../hooks/useDashboard";

const vaccineList = ["Pfizer", "Moderna", "AstraZeneca", "Johnson & Johnson", "Sinovac"];

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const { collapsed, setCollapsed } = useSidebar();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const { data: kpis, isPending: kpisPending } = useKpis();
  const { data: sintomas, isPending: sintomasPending } = useTopSintomas();
  const { data: costosVacuna, isPending: costosVacunaPending } = useCostosVacuna();
  const { data: efectividad, isPending: efectividadPending } = useEfectividad();

  const sidebarItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: MdDashboard,
      onClick: () => { setActiveItem("dashboard"); navigate("/dashboard"); },
    },
    {
      key: "analisis_sintomas",
      label: "Analisis de sintomas",
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

  function handleCompare(vaccineA: string, vaccineB: string) {
    console.log("Comparando:", vaccineA, vaccineB);
    setModalOpen(false);
    navigate(`/comparacion?a=${vaccineA}&b=${vaccineB}`);
  }

  return (
    <DashboardLayout
      items={sidebarItems}
      activeItem={activeItem}
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((prev) => !prev)}
    >
      <main className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-8">
        <PageHeader
          title="Dashboard Ejecutivo"
          description="Resumen general de vacunas y eventos adversos"
          date={kpis?.ultimaActualizacion ?? "Cargando fecha..."}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpisPending ? (
            <p className="col-span-4 text-gray-400">Cargando KPIs...</p>
          ) : (
            <>
              <KpiCard
                title="Total Vacunas Registradas"
                value={kpis?.totalVacunasRegistradas.toLocaleString("es-MX") ?? "-"}
                change={kpis?.changeVacunas ?? null}
                positiveDirection="up"
                color="#6366F1"
                icon={<FaSyringe size={24} />}
              />
              <KpiCard
                title="Eventos Adversos Reportados"
                value={kpis?.eventosAdversosReportados.toLocaleString("es-MX") ?? "-"}
                change={kpis?.changeEventos ?? null}
                positiveDirection="down"
                color="#EF4444"
                icon={<FaExclamationTriangle size={24} />}
              />
              <KpiCard
                title="Reportes del Mes"
                value={kpis?.reportesDelMes.toLocaleString("es-MX") ?? "-"}
                change={kpis?.changeReportes ?? null}
                positiveDirection="neutral"
                color="#10B981"
                icon={<FaClipboardList size={24} />}
              />
              <KpiCard
                title="Tasa de Efectividad Promedio"
                value={kpis ? `${kpis.tasaEfectividadPromedio}%` : "-"}
                change={kpis?.changeEfectividad ?? null}
                positiveDirection="up"
                color="#F59E0B"
                icon={<FaChartBar size={24} />}
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 overflow-hidden xl:grid-cols-2">
          <ChartCard
            title="Frecuencia de Sintomas Adversos"
            subtitle="Distribucion estimada por sintoma reportado"
            data={sintomasPending ? [] : sintomas}
          />
          <ChartCard
            title="Efectividad por Vacuna"
            subtitle="Porcentaje de efectividad estimada"
            data={efectividadPending ? [] : efectividad}
          />
        </div>
        <div className="flex justify-center">
          <div className="w-full xl:w-[calc(50%-0.75rem)]">
            <ChartCard
              title="Costos por Vacuna"
              subtitle="Costo unitario estimado por farmaceutica"
              data={costosVacunaPending ? [] : costosVacuna}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-xl bg-[#5B84E9] px-6 py-3 text-sm font-semibold text-white shadow transition-colors hover:bg-[#4a73d8]"
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
