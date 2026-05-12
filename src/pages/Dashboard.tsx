// src/pages/Dashboard.tsx
import { useState } from "react";
import { FaChartBar, FaSyringe, FaClipboardList, FaExclamationTriangle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useSidebar } from "../context/SidebarContext";
import PageHeader from "../components/PageHeader/PageHeader";
import KpiCard from "../components/KpiCard/KpiCard";
import ChartCard from "../components/charts/ChartCard";
import ComparisonModal from "../components/composed/ComparisonModal/ComparisonModal";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useKpis, useTopSintomas, useEfectividad } from "../hooks/useDashboard";

const vaccineList = ["Pfizer", "Moderna", "AstraZeneca", "Johnson & Johnson", "Sinovac"];

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const { collapsed, setCollapsed } = useSidebar();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // hooks de datos
  const { data: kpis, isPending: kpisPending } = useKpis()
  const { data: sintomas, isPending: sintomasPending } = useTopSintomas()
  const { data: efectividad, isPending: efectividadPending } = useEfectividad()

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
    navigate(`/comparacion?a=${vaccineA}&b=${vaccineB}`)
  }

  return (
    <DashboardLayout
      items={sidebarItems}
      activeItem={activeItem}
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((prev) => !prev)}
    >
      <main className="flex flex-1 flex-col gap-6 overflow-y-auto p-8 min-h-0">
        <PageHeader
          title="Dashboard Ejecutivo"
          description="Resumen general de vacunas y eventos adversos"
          date={kpis?.ultimaActualizacion ?? 'Cargando fecha...'}
        />

        {/* KPIs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpisPending ? (
            <p className="text-gray-400 col-span-4">Cargando KPIs...</p>
          ) : (
            <>
              <KpiCard
                title="Total Vacunas Registradas"
                value={kpis?.totalVacunasRegistradas.toLocaleString('es-MX') ?? '-'}
                change={kpis?.changeVacunas ?? null}
                positiveDirection="up"
                color="#6366F1"
                icon={<FaSyringe size={24} />}
              />
              <KpiCard
                title="Eventos Adversos Reportados"
                value={kpis?.eventosAdversosReportados.toLocaleString('es-MX') ?? '-'}
                change={kpis?.changeEventos ?? null}
                positiveDirection="down"
                color="#EF4444"
                icon={<FaExclamationTriangle size={24} />}
              />
              <KpiCard
                title="Reportes del Mes"
                value={kpis?.reportesDelMes.toLocaleString('es-MX') ?? '-'}
                change={kpis?.changeReportes ?? null}
                positiveDirection="neutral"
                color="#10B981"
                icon={<FaClipboardList size={24} />}
              />
              <KpiCard
                title="Tasa de Efectividad Promedio"
                value={kpis ? `${kpis.tasaEfectividadPromedio}%` : '-'}
                change={kpis?.changeEfectividad ?? null}
                positiveDirection="up"
                color="#F59E0B"
                icon={<FaChartBar size={24} />}
              />
            </>
          )}
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 overflow-hidden">
          <ChartCard
            title="Frecuencia de Síntomas Adversos"
            subtitle="Distribución estimada por síntoma reportado"
            data={sintomasPending ? [] : sintomas}
          />
          <ChartCard
            title="Efectividad por Vacuna"
            subtitle="Porcentaje de efectividad estimada"
            data={efectividadPending ? [] : efectividad}
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