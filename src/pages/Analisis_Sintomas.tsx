import { useEffect, useState } from "react";
import { FaSyringe, FaClipboardList } from "react-icons/fa";
import PageHeader from "../components/PageHeader/PageHeader";
import ContentWrapper from "../components/content/ContentWrapper";
import FilterBar from "../components/filters/FilterBar";
import { useSidebar } from "../context/SidebarContext";
import ChartCard from "../components/charts/ChartCard";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import DashboardLayout from "../components/layout/DashboardLayout";

type ChartDataItem = {
  label: string;
  value: number;
};

const Analisis_Sintomas = () => {
  const [activeItem, setActiveItem] = useState("analisis_sintomas");
  const [data, setData] = useState<ChartDataItem[]>([]);
  const {collapsed, setCollapsed} = useSidebar();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    vacuna: "Vacuna",
    sexo: "Sexo",
    edad: "Edad",
    sintoma: "S\u00edntoma",
  });


  useEffect(() => {
    fetch("http://localhost:5173/nombre_mysq")
      .then((response) => response.json())
      .then((result) => {
        console.log("Datos recibidos:", result);

        const formattedData: ChartDataItem[] = Array.isArray(result)
          ? result.map((item: any) => ({
              label: item.label ?? item.nombre ?? "Sin nombre",
              value: Number(item.value ?? item.cantidad ?? 0),
            }))
          : [];

        setData(formattedData);
      })
      .catch((error) => console.error(error));
  }, []);

  const filterOptions = [
    {
      key: "vacuna",
      label: "Vacuna",
      value: filters.vacuna,
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
      value: filters.sexo,
      options: [
        { label: "Sexo", value: "all" },
        { label: "Masculino", value: "male" },
        { label: "Femenino", value: "female" },
      ],
    },
    {
      key: "edad",
      label: "Edad",
      value: filters.edad,
      options: [
        { label: "Edad", value: "all" },
        { label: "0 - 18", value: "0-18" },
        { label: "19 - 40", value: "19-40" },
        { label: "41 - 65", value: "41-65" },
        { label: "66+", value: "66+" },
      ],
    },
    {
      key: "sintoma",
      label: "S\u00edntoma",
      value: filters.sintoma,
      options: [
        { label: "S\u00edntoma", value: "all" },
        { label: "Fiebre", value: "fever" },
        { label: "Fatiga", value: "fatigue" },
        { label: "Dolor muscular", value: "pain" },
      ],
    },
  ];

  const userItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: MdDashboard,
      onClick: () => {
        setActiveItem("dashboard");
        navigate("/dashboard");
      },
    },
    {
      key: "analisis_sintomas",
      label: "Analisis de sintomas",
      icon: FaClipboardList,
      onClick: () => {
        setActiveItem("analisis_sintomas");
        navigate("/analisis_sintomas");
      },
    },
    {
      key: "catalog",
      label: "Catalogo de vacunas",
      icon: FaSyringe,
      onClick: () => {
        setActiveItem("catalog");
        navigate("/catalog");
      },
    },
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <DashboardLayout
      items={userItems}
      activeItem={activeItem}
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((prev) => !prev)}
      userName="Caro Ramirez"
      userRole="Director de finanzas"
    >
      <main className="flex-1 min-w-0 overflow-y-auto">
        <ContentWrapper>
          <PageHeader
            title="Analisis de Sintomas"
            subtitle="Analisis detallado de efectos secundarios graves por vacuna"
            date="05 de marzo 2026"
          />

          <div className="mb-8 flex justify-center">
            <FilterBar
              title="Filtros de Analisis"
              filters={filterOptions}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="w-full">
            <ChartCard
              title="Distribución de Analisis"
              subtitle="Comparativa de efectos secundarios reportados"
              data={data}
            />
          </div>
        </ContentWrapper>
      </main>
    </DashboardLayout>
  );
};

export default Analisis_Sintomas;
