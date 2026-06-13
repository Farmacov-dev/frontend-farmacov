// src/pages/Analisis_Sintomas.tsx
// angel

import { useState } from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import ContentWrapper from "../components/content/ContentWrapper";
import FilterBar from "../components/filters/FilterBar";
import { useSintomas } from "../hooks/useAnalisis";
import type { SintomaFiltros } from "../services/analisis/getSintomas";
import { extraerVacunas, agruparPorSintoma } from "../services/analisis/getSintomas";
import RadarPerfilRiesgo from "../components/charts/RadarPerfilRiesgo";
import { useUltimaActualizacion } from "../hooks/useUltimaActualizacion";
import VaccineCheckboxSelector from "../components/primary/VaccineCheckboxSelector/VaccineCheckboxSelector";
import GroupedBarChart from "../components/charts/GroupedBarChart";
import SeveridadComparisonPanel from "../components/composed/SeveridadComparisonPanel/SeveridadComparisonPanel";

const Analisis_Sintomas = () => {
  const ultimaActualizacion = useUltimaActualizacion()

  const [filtros, setFiltros] = useState<SintomaFiltros>({
    idVacunas: undefined,
    sexo: undefined,
    grupoEdad: undefined,
    esGrave: undefined,
  })

  const [vacunasSeleccionadas, setVacunasSeleccionadas] = useState<number[]>([])

  const { data: todosSintomas, isPending, isError } = useSintomas(filtros)

  const vacunasDisponibles = todosSintomas ? extraerVacunas(todosSintomas) : []

  const vacunasSeleccionadasConNombre = vacunasDisponibles.filter(
    (v) => vacunasSeleccionadas.includes(v.id)
  )

  const datosAgrupados = todosSintomas
    ? agruparPorSintoma(todosSintomas, vacunasSeleccionadas)
    : []

  const filterOptions = [
    {
      key: "sexo",
      label: "Sexo",
      value: filtros.sexo ?? "all",
      options: [
        { label: "Todos", value: "all" },
        { label: "Masculino", value: "M" },
        { label: "Femenino", value: "F" },
        { label: "Desconocido", value: "U" },
      ],
    },
    {
      key: "grupoEdad",
      label: "Edad",
      value: filtros.grupoEdad ?? "all",
      options: [
        { label: "Todos", value: "all" },
        { label: "0-17", value: "0-17" },
        { label: "18-29", value: "18-29" },
        { label: "30-49", value: "30-49" },
        { label: "50-64", value: "50-64" },
        { label: "65+", value: "65+" },
      ],
    },
    {
      key: "esGrave",
      label: "Gravedad",
      value: filtros.esGrave === undefined ? "all" : String(filtros.esGrave),
      options: [
        { label: "Todos", value: "all" },
        { label: "Graves", value: "true" },
        { label: "No graves", value: "false" },
      ],
    },
  ]

  const handleFilterChange = (key: string, value: string) => {
    setFiltros((prev) => ({
      ...prev,
      [key]: value === "all"
        ? undefined
        : key === "esGrave"
          ? value === "true"
          : value,
    }))
  }

  return (
    <main className="flex-1 min-w-0 overflow-y-auto">
      <ContentWrapper>
        <PageHeader
          title="Análisis de Síntomas"
          subtitle="Análisis detallado de efectos secundarios graves por vacuna"
          date={ultimaActualizacion}
        />

        <div className="mt-10 mb-2 w-full">
          <FilterBar
            title="Filtros de Análisis"
            filters={filterOptions}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="mb-3 w-full">
          {isPending ? (
            <p className="font-inter text-[13px] text-slate-500">
              Cargando vacunas...
            </p>
          ) : (
            <VaccineCheckboxSelector
              vacunas={vacunasDisponibles}
              seleccionadas={vacunasSeleccionadas}
              onChange={setVacunasSeleccionadas}
            />
          )}
        </div>

        <div className="w-full mb-8">
          {isError ? (
            <p className="font-inter text-[13px] text-red-500">
              Error cargando análisis.
            </p>
          ) : (
            <GroupedBarChart
              title="Distribución de síntomas"
              subtitle="Comparativa de reportes por vacuna seleccionada"
              data={datosAgrupados}
              vacunasSeleccionadas={vacunasSeleccionadasConNombre}
            />
          )}
        </div>

        <div className="w-full mb-8">
          <SeveridadComparisonPanel vacunas={vacunasDisponibles} />
        </div>

        <div className="w-full pb-8">
          <RadarPerfilRiesgo />
        </div>

      </ContentWrapper>
    </main>
  )
}

export default Analisis_Sintomas