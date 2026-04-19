import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import Sidebar from "./Sidebar";

const userItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: DashboardOutlinedIcon,
    onClick: () => console.log("Dashboard"),
  },
  {
    key: "analisis",
    label: "Análisis de síntomas",
    icon: QueryStatsOutlinedIcon,
    onClick: () => console.log("Análisis"),
  },
  {
    key: "catalogo",
    label: "Catálogo de vacunas",
    icon: VaccinesOutlinedIcon,
    onClick: () => console.log("Catálogo"),
  },
  {
    key: "anotaciones",
    label: "Anotaciones",
    icon: AssignmentOutlinedIcon,
    onClick: () => console.log("Anotaciones"),
  },
];

const adminItems = [
  {
    key: "inicio",
    label: "Inicio",
    icon: HomeOutlinedIcon,
    onClick: () => console.log("Inicio"),
  },
  {
    key: "usuarios",
    label: "Usuarios",
    icon: GroupOutlinedIcon,
    onClick: () => console.log("Usuarios"),
  },
  {
    key: "roles",
    label: "Roles y Permisos",
    icon: ShieldOutlinedIcon,
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
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#cfd4da",
          minHeight: "100vh",
          padding: "12px",
          boxSizing: "border-box",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    items: {
      control: false,
    },
    activeItem: {
      control: { type: "text" },
    },
    collapsed: {
      control: { type: "boolean" },
    },
    onLogoutClick: {
      action: "logout-click",
    },
    onToggleCollapse: {
      action: "toggle-collapse",
    },
    userName: {
      control: { type: "text" },
    },
    userRole: {
      control: { type: "text" },
    },
  },
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
        onLogoutClick={() => {
          console.log("Cerrar sesión");
          args.onLogoutClick?.();
        }}
        onToggleCollapse={() => {
          setCollapsed((prev) => !prev);
          args.onToggleCollapse?.();
        }}
      />
    </div>
  );
};

export const UserSidebar: Story = {
  name: "Sidebar usuarios",
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
  name: "Sidebar admin",
  render: (args) => <SidebarWithState {...args} />,
  args: {
    items: adminItems,
    activeItem: "usuarios",
    collapsed: false,
    userName: "Caro Ramirez",
    userRole: "Administrador",
  },
};