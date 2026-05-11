// src/components/charts/ChartCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import ChartCard from "./ChartCard";

const meta = {
  title: "charts/ChartCard",
  component: ChartCard,
} satisfies Meta<typeof ChartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sintomas: Story = {
  args: {
    title: "Frecuencia de Síntomas Adversos",
    subtitle: "Distribución estimada por síntoma reportado",
    data: [
      { label: "Miocarditis", value: 65 },
      { label: "Anafilaxia", value: 64 },
      { label: "Trombosis", value: 57 },
      { label: "Parálisis", value: 50 },
      { label: "Gastritis", value: 21 },
    ],
  },
};

export const Efectividad: Story = {
  args: {
    title: "Efectividad por Vacuna",
    subtitle: "Porcentaje de efectividad estimada",
    data: [
      { label: "Pfizer", value: 90 },
      { label: "Moderna", value: 85 },
      { label: "AZ", value: 70 },
      { label: "J&J", value: 66 },
      { label: "Sinovac", value: 55 },
    ],
  },
};

export const EmptyArray: Story = {
  args: {
    data: [],
  },
};