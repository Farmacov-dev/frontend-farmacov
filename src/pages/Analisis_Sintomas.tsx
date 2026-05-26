// src/pages/Analisis_Sintomas.tsx
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
  })

  const [vacunasSeleccionadas, setVacunasSeleccionadas] = useState<number[]>([])

  // traemos todos los datos sin filtro de vacuna para tener las opciones
  const { data: todosSintomas, isPending, isError } = useSintomas({
    sexo: filtros.sexo,
    grupoEdad: filtros.grupoEdad,
  })

  // vacunas únicas para el selector
  const vacunasDisponibles = todosSintomas ? extraerVacunas(todosSintomas) : []

  // vacunas seleccionadas con nombre para la gráfica
  const vacunasSeleccionadasConNombre = vacunasDisponibles.filter(
    (v) => vacunasSeleccionadas.includes(v.id)
  )

  // datos agrupados para la gráfica
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
          title="Analisis de Sintomas"
          subtitle="Analisis detallado de efectos secundarios graves por vacuna"
          date={ultimaActualizacion}
        />

        {/* filtros de contexto */}
        <div className="mb-6 flex justify-center">
          <FilterBar
            title="Filtros de Analisis"
            filters={filterOptions}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* selector de vacunas */}
        <div className="mb-6">
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

        {/* grafica grouped */}
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

        {/* COMPARATIVA DE SEVERIDAD (Dona) */}
        <div className="w-full mb-8">
          <SeveridadComparisonPanel vacunas={vacunasDisponibles} />
        </div>

        {/* perfil de riesgo-valor */}
        <div className="w-full">
          <RadarPerfilRiesgo />
        </div>

      </ContentWrapper>
    </main>
  )
}

export default Analisis_Sintomas