import type { Meta, StoryObj } from "@storybook/react-vite";
import { Users, TrendingUp } from "lucide-react";
import KpiCard from "./KpiCard";

const meta = {
  title: "Components/KpiCard",
  component: KpiCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#f7f9fc",
          padding: "32px",
          minHeight: "240px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "320px",
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    title: { control: "text" },
    value: { control: "text" },
    change: { control: "number" },
    color: { control: "color" },
    icon: { control: false },
    className: { control: "text" },
  },
} satisfies Meta<typeof KpiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PositiveChange: Story = {
  name: "Indicador positivo",
  args: {
    title: "Pacientes monitoreados",
    value: "45,895",
    change: 8,
    color: "#1FC29A",
    icon: <Users size={28} strokeWidth={2.2} />,
  },
};

export const NegativeChange: Story = {
  name: "Indicador negativo",
  args: {
    title: "Tasa de incidencia",
    value: "2.7%",
    change: -0.3,
    color: "#C23FF0",
    icon: <TrendingUp size={28} strokeWidth={2.2} />,
  },
};