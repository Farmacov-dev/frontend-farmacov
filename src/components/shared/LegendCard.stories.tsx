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