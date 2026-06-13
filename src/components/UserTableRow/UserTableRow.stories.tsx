import type { Meta, StoryObj } from "@storybook/react-vite";
import UserTableRow from "./UserTableRow";
import type { User } from "./UserTableRow";

const meta = {
  title: "Components/UserTableRow",
  component: UserTableRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UserTableRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const successUser: User = {
  id: 1,
  hora: "10:45 AM",
  nombre: "Susana Gonz\u00e1lez",
  iniciales: "SG",
  colorAvatar: "#14B8A6",
  accion: "Cre\u00f3 usuario",
  resultado: "Exitoso",
};

const failUser: User = {
  id: 2,
  hora: "10:30 AM",
  nombre: "Roberto G\u00f3mez",
  iniciales: "RG",
  colorAvatar: "#7C3AED",
  accion: "Intent\u00f3 cambiar datos de vacunas",
  resultado: "Fallido",
};

export const Exitoso: Story = {
  render: () => (
    <table className="w-full">
      <tbody>
        <UserTableRow user={successUser} />
      </tbody>
    </table>
  ),
};

export const Fallido: Story = {
  render: () => (
    <table className="w-full">
      <tbody>
        <UserTableRow user={failUser} />
      </tbody>
    </table>
  ),
};

