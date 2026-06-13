import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FaChartBar,
  FaSyringe,
  FaStickyNote,
  FaHome,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

import Sidebar from "./Sidebar";

const userItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: FaChartBar,
    onClick: () => console.log("Dashboard"),
  },
  {
    key: "analisis",
    label: "Análisis de síntomas",
    icon: FaChartBar,
    onClick: () => console.log("Análisis"),
  },
  {
    key: "catalogo",
    label: "Catálogo de vacunas",
    icon: FaSyringe,
    onClick: () => console.log("Catálogo"),
  },
  {
    key: "anotaciones",
    label: "Anotaciones",
    icon: FaStickyNote,
    onClick: () => console.log("Anotaciones"),
  },
];

const adminItems = [
  {
    key: "inicio",
    label: "Inicio",
    icon: FaHome,
    onClick: () => console.log("Inicio"),
  },
  {
    key: "usuarios",
    label: "Usuarios",
    icon: FaUsers,
    onClick: () => console.log("Usuarios"),
  },
  {
    key: "roles",
    label: "Roles y Permisos",
    icon: FaShieldAlt,
    onClick: () => console.log("Roles y Permisos"),
  },
];

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarWithState = (args: React.ComponentProps<typeof Sidebar>) => {
  const [collapsed, setCollapsed] = useState(args.collapsed ?? false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        {...args}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      />
    </div>
  );
};

export const UserSidebar: Story = {
  render: (args) => <SidebarWithState {...args} />,
  args: {
    items: userItems,
    activeItem: "dashboard",
    collapsed: false,
    userName: "Caro Ramirez",
    userRole: "Director de finanzas",
  },
};

export const AdminSidebar: Story = {
  render: (args) => <SidebarWithState {...args} />,
  args: {
    items: adminItems,
    activeItem: "usuarios",
    collapsed: false,
    userName: "Caro Ramirez",
    userRole: "Administrador",
  },
};