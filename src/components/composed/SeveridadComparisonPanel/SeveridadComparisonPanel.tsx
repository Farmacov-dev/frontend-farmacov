// src/components/composed/SeveridadComparisonPanel/SeveridadComparisonPanel.tsx
import { useState } from "react";
import { FaChartPie } from "react-icons/fa";
import ChartCard from "../../charts/ChartCard";
import SelectDropdown from "../../SelectDropdown/SelectDropdown";
import EmptyState from "../../EmptyState/EmptyState";
import LoadingState from "../../LoadingState/LoadingState";
import { useDistribucionSeveridadPorVacuna } from "../../../hooks/useDashboard";

interface VacunaOption {
  id: number;
  name?: string;
  nombre?: string; // Por si el backend a veces regresa 'nombre' en vez de 'name'
}

interface SeveridadComparisonPanelProps {
  vacunas: VacunaOption[];
}

const SeveridadComparisonPanel = ({ vacunas }: SeveridadComparisonPanelProps) => {
  // Estados para guardar el ID de las vacunas a comparar
  const [idA, setIdA] = useState<number | undefined>(undefined);
  const [idB, setIdB] = useState<number | undefined>(undefined);

  // Hooks de datos
  const { data: dataA, isPending: loadingA } = useDistribucionSeveridadPorVacuna(idA);
  const { data: dataB, isPending: loadingB } = useDistribucionSeveridadPorVacuna(idB);

  // Formateador de datos para la dona
  const formatData = (raw: any) => raw ? [
    { label: 'Leve', value: raw.leve },
    { label: 'Moderado', value: raw.moderado },
    { label: 'Grave', value: raw.grave }
  ] : [];

  // Helper para sacar el nombre de la vacuna a partir de su ID
  const getNombre = (id: number | undefined) => {
    const vacuna = vacunas.find(v => v.id === id);
    return vacuna?.name || vacuna?.nombre || undefined;
  };

  // Helpers para traducir de String (del Dropdown) a ID (para el API)
  const handleSelectA = (nombreSeleccionado: string) => {
    const seleccion = vacunas.find(v => v.name === nombreSeleccionado || v.nombre === nombreSeleccionado);
    setIdA(seleccion?.id);
  };

  const handleSelectB = (nombreSeleccionado: string) => {
    const seleccion = vacunas.find(v => v.name === nombreSeleccionado || v.nombre === nombreSeleccionado);
    setIdB(seleccion?.id);
  };

  // Arreglo de strings puros para alimentar tu SelectDropdown
  const opcionesNombres = vacunas
    .map(v => v.name || v.nombre || "")
    .filter(Boolean); // Filtramos por si hay algún string vacío

  return (
    <div className="flex flex-col gap-6">
      {/* Header del Panel */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Comparativa de Severidad</h2>
            <p className="text-sm text-slate-500">Contrasta la distribución de efectos por fármaco</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <SelectDropdown
              options={opcionesNombres}
              placeholder="Vacuna A..."
              value={getNombre(idA)}
              onChange={handleSelectA}
            />

            <span className="text-slate-400 font-bold px-2">VS</span>

            <SelectDropdown
              options={opcionesNombres}
              placeholder="Vacuna B..."
              value={getNombre(idB)}
              onChange={handleSelectB}
            />
          </div>
        </div>
      </div>

      {/* Grid de Gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Lado A */}
        <div className="flex flex-col h-full">
          {!idA ? (
            <div className="flex-1 flex items-center justify-center min-h-[410px] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50">
              <EmptyState 
                title="Selecciona una vacuna para el panel izquierdo" 
                icon={<FaChartPie size={32} />} 
              />
            </div>
          ) : loadingA ? (
            <div className="flex-1 flex items-center justify-center min-h-[410px] rounded-2xl border border-slate-200 bg-white">
               <LoadingState />
            </div>
          ) : (
            <ChartCard
              title={`Severidad: ${getNombre(idA)}`}
              subtitle="Basado en reportes clínicos individuales"
              type="pie"
              data={formatData(dataA)}
            />
          )}
        </div>

        {/* Lado B */}
        <div className="flex flex-col h-full">
          {!idB ? (
            <div className="flex-1 flex items-center justify-center min-h-[410px] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50">
              <EmptyState 
                title="Selecciona una vacuna para el panel derecho" 
                icon={<FaChartPie size={32} />} 
              />
            </div>
          ) : loadingB ? (
            <div className="flex-1 flex items-center justify-center min-h-[410px] rounded-2xl border border-slate-200 bg-white">
               <LoadingState color="#10B981" /> {/* Color esmeralda opcional para diferenciar */}
            </div>
          ) : (
            <ChartCard
              title={`Severidad: ${getNombre(idB)}`}
              subtitle="Basado en reportes clínicos individuales"
              type="pie"
              data={formatData(dataB)}
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default SeveridadComparisonPanel;