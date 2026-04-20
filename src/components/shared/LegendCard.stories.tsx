import type { Meta, StoryObj } from "@storybook/react";
import LegendCard from "./LegendCard";

const meta: Meta<typeof LegendCard> = {
  title: "Display/LegendCard",
  component: LegendCard,
};

export default meta;
type Story = StoryObj<typeof LegendCard>;

export const Default: Story = {
  args: {
    title: "Leyenda de Eficacia",
    items: [
      { label: "Excelente", color: "#22c55e" },
      { label: "Muy buena", color: "#3b82f6" },
      { label: "Regular", color: "#eab308" },
      { label: "Baja", color: "#ef4444" },
    ],
  },
};

export const WithManyItemsAndAction: Story = {
  name: "Muchos elementos + acción",
  args: {
    title: "Leyenda de síntomas",
    items: [
      { label: "Dolor", color: "#22c55e" },
      { label: "Fiebre", color: "#3b82f6" },
      { label: "Náusea", color: "#eab308" },
      { label: "Fatiga", color: "#ef4444" },
      { label: "Mareo", color: "#8b5cf6" },
      { label: "Escalofríos", color: "#f97316" },
      { label: "Tos", color: "#06b6d4" },
    ],
    action: (
      <button className="rounded-md border border-slate-300 px-3 py-1 text-xs text-slate-700 hover:bg-slate-100">
        Exportar
      </button>
    ),
  },
};