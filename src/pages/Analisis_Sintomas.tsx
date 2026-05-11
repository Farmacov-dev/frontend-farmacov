// src/pages/Analisis_Sintomas.tsx
import { useState } from "react";
import { FaSyringe, FaClipboardList } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import PageHeader from "../components/PageHeader/PageHeader";
import ContentWrapper from "../components/content/ContentWrapper";
import FilterBar from "../components/filters/FilterBar";
import ChartCard from "../components/charts/ChartCard";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useSintomas } from "../hooks/useAnalisis";
import type { SintomaFiltros } from "../services/analisis/getSintomas";
import RadarPerfilRiesgo from "../components/charts/RadarPerfilRiesgo";
import { useUltimaActualizacion } from "../hooks/useUltimaActualizacion";

const Analisis_Sintomas = () => {
  const [activeItem, setActiveItem] = useState("analisis_sintomas");
  const { collapsed, setCollapsed } = useSidebar();
  const navigate = useNavigate();
  const ultimaActualizacion = useUltimaActualizacion()

  const [filtros, setFiltros] = useState<SintomaFiltros>({
    vacuna: undefined,
    sexo: undefined,
    edad: undefined,
    sintoma: undefined,
  })

  const { data: sintomas, isPending, isError } = useSintomas(filtros)

  const filterOptions = [
    {
      key: "vacuna",
      label: "Vacuna",
      value: filtros.vacuna ?? "all",
      options: [
        { label: "Vacuna", value: "all" },
        { label: "Pfizer", value: "pfizer" },
        { label: "Moderna", value: "moderna" },
        { label: "AstraZeneca", value: "astrazeneca" },
      ],
    },
    {
      key: "sexo",
      label: "Sexo",
      value: filtros.sexo ?? "all",
      options: [
        { label: "Sexo", value: "all" },
        { label: "Masculino", value: "M" },
        { label: "Femenino", value: "F" },
      ],
    },
    {
      key: "edad",
      label: "Edad",
      value: filtros.edad ?? "all",
      options: [
        { label: "Edad", value: "all" },
        { label: "0-17", value: "0-17" },
        { label: "18-29", value: "18-29" },
        { label: "30-49", value: "30-49" },
        { label: "50-64", value: "50-64" },
        { label: "65+", value: "65+" },
      ],
    },
    {
      key: "sintoma",
      label: "Síntoma",
      value: filtros.sintoma ?? "all",
      options: [
        { label: "Síntoma", value: "all" },
        { label: "Miocarditis", value: "miocarditis" },
        { label: "Anafilaxia", value: "anafilaxia" },
        { label: "Trombosis", value: "trombosis" },
        { label: "Parálisis", value: "paralisis" },
        { label: "Gastritis", value: "gastritis" },
      ],
    },
  ]

  const userItems = [
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
  ]

  const handleFilterChange = (key: string, value: string) => {
    setFiltros((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
    }))
  }

  return (
    <DashboardLayout
      items={userItems}
      activeItem={activeItem}
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((prev) => !prev)}
    >
      <main className="flex-1 min-w-0 overflow-y-auto">
        <ContentWrapper>
          <PageHeader
            title="Analisis de Sintomas"
            subtitle="Analisis detallado de efectos secundarios graves por vacuna"
            date={ultimaActualizacion}
          />

          <div className="mb-8 flex justify-center">
            <FilterBar
              title="Filtros de Analisis"
              filters={filterOptions}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* grafica de sintomas con filtros */}
          <div className="w-full mb-8">
            {isPending && (
              <p className="text-gray-400 text-sm">Cargando datos...</p>
            )}
            {isError && (
              <p className="text-red-400 text-sm">Error cargando análisis.</p>
            )}
            {!isPending && !isError && (
              <ChartCard
                title="Distribución de Análisis"
                subtitle="Comparativa de efectos secundarios reportados"
                data={sintomas}
              />
            )}
          </div>

          {/* perfil de riesgo-valor */}
          <div className="w-full">
            <RadarPerfilRiesgo />
          </div>

        </ContentWrapper>
      </main>
    </DashboardLayout>
  )
}

export default Analisis_Sintomas