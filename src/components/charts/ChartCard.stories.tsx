import type { Meta, StoryObj } from "@storybook/react";
import ChartCard from "./ChartCard";

const meta = {
  title: "Components/Charts/ChartCard",
  component: ChartCard,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["bar", "line", "area", "pie"],
      description: "Tipo de visualización de la gráfica",
    },
    title: { control: "text" },
    subtitle: { control: "text" },
  },
} satisfies Meta<typeof ChartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// grafica de barras
export const BarrasSintomas: Story = {
  args: {
    type: "bar",
    title: "Frecuencia de Síntomas Adversos",
    subtitle: "Distribución de los síntomas más reportados",
    data: [
      { label: "Miocarditis", value: 65 },
      { label: "Anafilaxia", value: 64 },
      { label: "Trombosis", value: 57 },
      { label: "Parálisis", value: 50 },
      { label: "Gastritis", value: 21 },
    ],
  },
};

// grafica de lineas
export const LineasEvolucion: Story = {
  args: {
    type: "line",
    title: "Reportes Mensuales",
    subtitle: "Tendencia de reportes en el último semestre",
    data: [
      { label: "Enero", value: 120 },
      { label: "Febrero", value: 150 },
      { label: "Marzo", value: 90 },
      { label: "Abril", value: 210 },
      { label: "Mayo", value: 180 },
    ],
  },
};

// grafica de area
export const AreaDistribucionEdad: Story = {
  args: {
    type: "area",
    title: "Incidencia por Edad",
    subtitle: "Volumen de reportes por grupo demográfico",
    data: [
      { label: "0-17", value: 45 },
      { label: "18-29", value: 130 },
      { label: "30-49", value: 250 },
      { label: "50-64", value: 180 },
      { label: "65+", value: 95 },
    ],
  },
};

// piechart
export const PastelVacunas: Story = {
  args: {
    type: "pie",
    title: "Distribución de Vacunas",
    subtitle: "Proporción de dosis aplicadas en la muestra",
    data: [
      { label: "Comirnaty", value: 45 },
      { label: "Spikevax", value: 30 },
      { label: "Vaxzevria", value: 15 },
      { label: "Janssen", value: 10 },
    ],
  },
};

// estado Vacio
export const SinDatos: Story = {
  args: {
    title: "Cargando métricas...",
    subtitle: "Esperando información del servidor",
    data: [],
  },
};