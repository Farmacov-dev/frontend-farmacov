// src/components/composed/SeveridadComparisonPanel/SeveridadComparisonPanel.tsx
// angel

import { useState, useMemo } from "react";
import { FaChartPie } from "react-icons/fa";
import ChartCard from "../../charts/ChartCard";
import SelectDropdown from "../../SelectDropdown/SelectDropdown";
import EmptyState from "../../EmptyState/EmptyState";
import LoadingState from "../../LoadingState/LoadingState";
import { useDistribucionSeveridadPorVacuna } from "../../../hooks/useDashboard";

interface VacunaOption {
  id: number;
  name?: string;
  nombre?: string;
}

interface SeveridadComparisonPanelProps {
  vacunas: VacunaOption[];
}

//reafctor: Tipamos estrictamente la respuesta del API para eliminar el 'any'
interface SeveridadData {
  leve: number;
  moderado: number;
  grave: number;
}

const SeveridadComparisonPanel = ({ vacunas }: SeveridadComparisonPanelProps) => {
  const [idA, setIdA] = useState<number | undefined>(undefined);
  const [idB, setIdB] = useState<number | undefined>(undefined);

  const { data: dataA, isPending: loadingA } = useDistribucionSeveridadPorVacuna(idA);
  const { data: dataB, isPending: loadingB } = useDistribucionSeveridadPorVacuna(idB);

  // refactor: Uso de la interfaz SeveridadData
  const formatData = (raw?: SeveridadData) => raw ? [
    { label: 'Leve', value: raw.leve },
    { label: 'Moderado', value: raw.moderado },
    { label: 'Grave', value: raw.grave }
  ] : [];

  const getNombre = (id: number | undefined) => {
    const vacuna = vacunas.find(v => v.id === id);
    return vacuna?.name || vacuna?.nombre || undefined;
  };

  const handleSelectA = (nombreSeleccionado: string) => {
    const seleccion = vacunas.find(v => v.name === nombreSeleccionado || v.nombre === nombreSeleccionado);
    setIdA(seleccion?.id);
  };

  const handleSelectB = (nombreSeleccionado: string) => {
    const seleccion = vacunas.find(v => v.name === nombreSeleccionado || v.nombre === nombreSeleccionado);
    setIdB(seleccion?.id);
  };

  // refactor: Filtramos dinámicamente para que no comparen la misma vacuna en ambos lados
  const opcionesA = useMemo(() => {
    return vacunas
      .filter(v => v.id !== idB)
      .map(v => v.name || v.nombre || "")
      .filter(Boolean);
  }, [vacunas, idB]);

  const opcionesB = useMemo(() => {
    return vacunas
      .filter(v => v.id !== idA)
      .map(v => v.name || v.nombre || "")
      .filter(Boolean);
  }, [vacunas, idA]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header del Panel */}

      <div className="bg-white rounded-card border border-stroke p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-dark">Comparativa de Severidad</h2>
            <p className="text-sm text-muted">Contrasta la distribución de efectos por fármaco</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <SelectDropdown
              options={opcionesA}
              placeholder="Vacuna A..."
              value={getNombre(idA)}
              onChange={handleSelectA}
            />

            <span className="text-muted-light font-bold px-2" aria-hidden="true">VS</span>

            <SelectDropdown
              options={opcionesB}
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
            <div className="flex-1 flex items-center justify-center min-h-[410px] rounded-card border-2 border-dashed border-stroke bg-surface">
              <EmptyState 
                title="Selecciona una vacuna para el panel izquierdo" 
                icon={<FaChartPie size={32} />} 
              />
            </div>
          ) : loadingA ? (
            <div className="flex-1 flex items-center justify-center min-h-[410px] rounded-card border border-stroke bg-white">
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
            <div className="flex-1 flex items-center justify-center min-h-[410px] rounded-card border-2 border-dashed border-stroke bg-surface">
              <EmptyState 
                title="Selecciona una vacuna para el panel derecho" 
                icon={<FaChartPie size={32} />} 
              />
            </div>
          ) : loadingB ? (
            <div className="flex-1 flex items-center justify-center min-h-[410px] rounded-card border border-stroke bg-white">
               <LoadingState color="#10B981" /> 
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