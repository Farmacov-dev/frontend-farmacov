// src/pages/Dashboard.tsx
import { useState } from "react";
import { FaChartBar, FaSyringe, FaClipboardList, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader/PageHeader";
import KpiCard from "../components/KpiCard/KpiCard";
import ChartCard from "../components/charts/ChartCard";
import ComparisonModal from "../components/composed/ComparisonModal/ComparisonModal";
import { useKpis, useTopSintomas, useSeguridadVacuna, useCostosVacuna } from "../hooks/useDashboard";
import { useUltimaActualizacion } from "../hooks/useUltimaActualizacion";

const vaccineList = [
  "Comirnaty",
  "Spikevax",
  "Vaxzevria",
  "Janssen",
  "CoronaVac",
  "Sinopharm BBIBP",
  "Covaxin",
  "Nuvaxovid",
  "Sputnik V",
  "Convidecia"
];

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const { data: kpis, isPending: kpisPending } = useKpis();
  const { data: sintomas, isPending: sintomasPending } = useTopSintomas();
  const { data: costosVacuna, isPending: costosVacunaPending } = useCostosVacuna();
  const { data: seguridad, isPending: seguridadPending } = useSeguridadVacuna();

  const ultimaActualizacion = useUltimaActualizacion();

  function handleCompare(vaccineA: string, vaccineB: string) {
    console.log("Comparando:", vaccineA, vaccineB);
    setModalOpen(false);
    navigate(`/comparacion?a=${vaccineA}&b=${vaccineB}`);
  }

  return (
    <>
      <main className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-8">
        <PageHeader
          title="Dashboard Ejecutivo"
          description="Resumen general de vacunas y eventos adversos"
          date={ultimaActualizacion}
        />

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

        <div className="grid grid-cols-1 gap-6 overflow-hidden xl:grid-cols-2">
          <ChartCard
            title="Frecuencia de Sintomas Adversos"
            subtitle="Distribucion estimada por sintoma reportado"
            data={sintomasPending ? [] : sintomas}
          />
          <ChartCard
            title="Seguridad por Vacuna"
            subtitle="Indice de seguridad compuesto"
            data={seguridadPending ? [] : seguridad}
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
    </>
  );
}