import type { Meta, StoryObj } from "@storybook/react-vite";
import UserProfile from "./UserProfile";

const meta = {
  title: "Components/UserProfile",
  component: UserProfile,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "16px",
          background: "#ECEFF3",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    userName: {
      control: { type: "text" },
    },
    userRole: {
      control: { type: "text" },
    },
    collapsed: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof UserProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CaroRamirez: Story = {
  name: "Caro Ramírez - Directora de Finanzas",
  args: {
    userName: "Caro Ramirez",
    userRole: "Directora de Finanzas",
    collapsed: false,
  },
};

export const AlejandroFernandez: Story = {
  name: "Alejandro Fernández - Administrador",
  args: {
    userName: "Alejandro Fernandez",
    userRole: "Administrador",
    collapsed: false,
  },
};

export const Colapsado: Story = {
  name: "Colapsado",
  args: {
    userName: "Caro Ramirez",
    userRole: "Directora de Finanzas",
    collapsed: true,
  },
};