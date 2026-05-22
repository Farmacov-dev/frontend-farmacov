import type { Meta, StoryObj } from "@storybook/react-vite";
import UserTable from "./UserTable";

const meta = {
  title: "Components/UserTable",
  component: UserTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UserTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockUsers = [
  {
    id: 1,
    hora: "10:45 AM",
    nombre: "Susana Gonz\u00e1lez",
    iniciales: "SG",
    colorAvatar: "#14B8A6",
    accion: "Cre\u00f3 usuario",
    resultado: "Exitoso" as const,
  },
  {
    id: 2,
    hora: "10:30 AM",
    nombre: "Roberto G\u00f3mez",
    iniciales: "RG",
    colorAvatar: "#7C3AED",
    accion: "Intent\u00f3 cambiar datos de vacunas",
    resultado: "Fallido" as const,
  },
  {
    id: 3,
    hora: "10:30 AM",
    nombre: "Andr\u00e9s Garc\u00eda",
    iniciales: "AG",
    colorAvatar: "#F59E0B",
    accion: "Consult\u00f3 dashboard",
    resultado: "Exitoso" as const,
  },
  {
    id: 4,
    hora: "10:30 AM",
    nombre: "Artemio Urbina",
    iniciales: "AU",
    colorAvatar: "#1D4ED8",
    accion: "Elimin\u00f3 usuario",
    resultado: "Exitoso" as const,
  },
];

export const Default: Story = {
  render: () => <UserTable users={mockUsers} />,
};

