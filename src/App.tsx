import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import type { ComparisonRowProps } from "./components/ComparisonRow/ComparisonRow";
import { Search} from 'lucide-react'
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import KPICard from './components/KpiCard/KpiCard';
import ExportCatalogModal from './components/composed/ExportCatalogModal/ExportCatalogModal';

const comparisonRows: ComparisonRowProps[] = [
  {
    index: 1,
    label: "Eficacia",
    left: { value: "95%", status: "better" },
    right: { value: "94%", status: "worse" },
  },
  {
    index: 2,
    label: "Costo Unitario",
    left: { value: "$19.50 USD", status: "better" },
    right: { value: "$25.00 USD", status: "worse" },
  },
  {
    index: 3,
    label: "Costo al Mayoreo",
    left: { value: "$15.80 USD", status: "better" },
    right: { value: "$20.50 USD", status: "worse" },
  },
  {
    index: 4,
    label: "Número de Dosis",
    left: { value: "2 dosis", status: "neutral" },
    right: { value: "2 dosis", status: "neutral" },
  },
  {
    index: 5,
    label: "Temperatura de Conservación",
    left: { value: "-70°C", status: "neutral" },
    right: { value: "-20°C", status: "neutral" },
  },
  {
    index: 6,
    label: "Tiempo de Preservación",
    left: { value: "2 horas (ambiente)", status: "neutral" },
    right: { value: "12 horas (ambiente)", status: "neutral" },
  },
  {
    index: 7,
    label: "Tipo de Vacuna",
    left: { value: "ARNm", status: "neutral" },
    right: { value: "ARNm", status: "neutral" },
  },
  {
    index: 8,
    label: "Farmacéutica",
    left: { value: "Pfizer-BioNTech", status: "neutral" },
    right: { value: "Moderna", status: "neutral" },


  },
];

const userItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: DashboardOutlinedIcon,
    onClick: () => console.log('Dashboard'),
  },
  {
    key: 'analisis',
    label: 'Análisis de síntomas',
    icon: QueryStatsOutlinedIcon,
    onClick: () => console.log('Análisis'),
  },
  {
    key: 'catalogo',
    label: 'Catálogo de vacunas',
    icon: VaccinesOutlinedIcon,
    onClick: () => console.log('Catálogo'),
  },
  {
    key: 'anotaciones',
    label: 'Anotaciones',
    icon: AssignmentOutlinedIcon,
    onClick: () => console.log('Anotaciones'),
  },
];


function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [result, setResult] = useState<{
    format: "A4" | "Letter";
    orientation: "Vertical" | "Horizontal";
    content: string[];
  } | null>(null);

  return (
    <div>
      <ExportCatalogModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onExport={(config) => setResult(config)}
      />
    </div>
  );
}