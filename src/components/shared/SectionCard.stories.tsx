import type { Meta, StoryObj } from "@storybook/react";
import SectionCard from "./SectionCard";

const meta: Meta<typeof SectionCard> = {
  title: "Layout/SectionCard",
  component: SectionCard,
};

export default meta;
type Story = StoryObj<typeof SectionCard>;

export const Default: Story = {
  args: {
    title: "Información",
    children: <p>Contenido de ejemplo</p>,
  },
};

export const WithAction: Story = {
  args: {
    title: "Reporte",
    headerAction: (
      <button className="text-sm text-blue-500">Ver más</button>
    ),
    children: <p>Datos importantes</p>,
  },
};