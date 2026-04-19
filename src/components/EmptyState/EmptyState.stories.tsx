import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart3, Filter, Users } from "lucide-react";
import EmptyState from "./EmptyState";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#eef1f6",
          padding: "32px",
          width: "100%",
          minHeight: "260px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: "#f8f8fa",
            borderRadius: "12px",
            padding: "24px",
            width: "100%",
            minHeight: "180px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    icon: {
      control: false,
    },
    className: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoDashboardData: Story = {
  args: {
    title: "No hay información para mostrar en el dashboard.",
    icon: <BarChart3 className="h-6 w-6 text-gray-400" />,
  },
};

export const SelectFilterForSymptoms: Story = {
  args: {
    title: "Selecciona un filtro para mostrar información sobre síntomas.",
    icon: <Filter className="h-6 w-6 text-gray-400" />,
  },
};

export const NoUsersCreated: Story = {
  args: {
    title: "No hay usuarios creados. Haz clic al botón Crear Usuario.",
    icon: <Users className="h-6 w-6 text-gray-400" />,
  },
};