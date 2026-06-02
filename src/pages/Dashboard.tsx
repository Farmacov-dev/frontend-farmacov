// src/pages/Dashboard.tsx
// angel

import { useState } from "react";
import { FaChartBar, FaSyringe, FaClipboardList, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader/PageHeader";
import KpiCard from "../components/KpiCard/KpiCard";
import ChartCard from "../components/charts/ChartCard";
import ComparisonModal from "../components/composed/ComparisonModal/ComparisonModal";
import { 
  useKpis, 
  useTopSintomas, 
  useSeguridadVacuna, 
  useCostosVacuna,
  useDistribucionSeveridad 
} from "../hooks/useDashboard";
import { useUltimaActualizacion } from "../hooks/useUltimaActualizacion";
import { useVacunas } from "../hooks/useVacunas";

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const { data: vacunas } = useVacunas();
  const vaccineList = (vacunas ?? []).map(v => ({
    id: v.id,
    nombre: v.name,
  }));

  const { data: kpis, isPending: kpisPending } = useKpis();
  const { data: sintomas, isPending: sintomasPending } = useTopSintomas();
  const { data: costosVacuna, isPending: costosVacunaPending } = useCostosVacuna();
  const { data: seguridad, isPending: seguridadPending } = useSeguridadVacuna();
  const { data: severidad, isPending: severidadPending } = useDistribucionSeveridad();

  const ultimaActualizacion = useUltimaActualizacion();

  function handleCompare(idA: number, idB: number, nombreA: string, nombreB: string) {
    setModalOpen(false);
    navigate(`/comparacion?a=${idA}&b=${idB}&nombreA=${nombreA}&nombreB=${nombreB}`);
  }

  // Transformamos el objeto de severidad al arreglo que espera ChartCard
  const severidadChartData = severidad ? [
    { label: 'Leve', value: severidad.leve },
    { label: 'Moderado', value: severidad.moderado },
    { label: 'Grave', value: severidad.grave }
  ] : [];

  return (
    <>
      <main className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-8">
        
        {/* Contenedor Flex para alinear el Header y el Botón en la misma fila */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <PageHeader
            title="Dashboard Ejecutivo"
            description="Resumen general de vacunas y eventos adversos"
            date={ultimaActualizacion}
          />

          {/*  Botón movido a la parte superior */}
          <div className="flex shrink-0 pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-xl bg-[#5B84E9] px-6 py-3 text-sm font-semibold text-white shadow transition-colors hover:bg-[#4a73d8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B84E9] focus-visible:ring-offset-2"
            >
              Comparar Vacunas
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpisPending ? (
            <p className="col-span-4 text-gray-400">Cargando KPIs...</p>
          ) : (
            <>
              <KpiCard
                title="Total Vacunas Registradas"
                value={kpis?.totalVacunas.toLocaleString("es-MX") ?? "-"}
                change={null}
                positiveDirection="up"
                color="#6366F1"
                icon={<FaSyringe size={24} />}
              />
              <KpiCard
                title="Eventos Adversos Reportados"
                value={kpis?.totalReportes.toLocaleString("es-MX") ?? "-"}
                change={null}
                positiveDirection="down"
                color="#EF4444"
                icon={<FaExclamationTriangle size={24} />}
              />
              <KpiCard
                title="Reportes del Mes"
                value={kpis?.reportesEsteMes.toLocaleString("es-MX") ?? "-"}
                change={null}
                positiveDirection="neutral"
                color="#10B981"
                icon={<FaClipboardList size={24} />}
              />
              <KpiCard
                title="Porcentaje de Reportes Graves"
                value={kpis ? `${kpis.porcentajeReportesGraves.toFixed(1)}%` : "-"}
                change={null}
                positiveDirection="up"
                color="#F59E0B"
                icon={<FaChartBar size={24} />}
              />
            </>
          )}
        </div>

        {/* fila 1 de graficas */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <ChartCard
            title="Frecuencia de Sintomas Adversos"
            subtitle="Distribucion estimada por sintoma reportado"
            data={sintomasPending ? [] : sintomas}
            type="bar"
          />
          <ChartCard
            title="Seguridad por Vacuna"
            subtitle="Indice de seguridad compuesto"
            data={seguridadPending ? [] : seguridad}
            type="line"
          />
        </div>

        {/* fila 2 de graficas: costos y la dona de severidad */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <ChartCard
            title="Costos por Vacuna"
            subtitle="Costo unitario estimado por farmaceutica"
            data={costosVacunaPending ? [] : costosVacuna}
          />
          <ChartCard
            title="Distribución de Severidad"
            subtitle="Proporción de reportes por nivel de gravedad"
            data={severidadPending ? [] : severidadChartData}
            type="pie"
          />
        </div>
      </main>

      <ComparisonModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCompare={handleCompare}
        vaccines={vaccineList}
      />
    </>
  );
}