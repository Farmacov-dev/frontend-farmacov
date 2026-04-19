import type { Meta, StoryObj } from "@storybook/react-vite";
import { FaChartBar, FaTachometerAlt } from "react-icons/fa";
import NavItem from "./NavItem";

const meta = {
  title: "Components/NavItem",
  component: NavItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "16px",
          background: "#ECEFF3",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: { type: "text" },
    },
    icon: {
      control: false,
    },
    active: {
      control: { type: "boolean" },
    },
    collapsed: {
      control: { type: "boolean" },
    },
    onClick: {
      action: "clicked",
    },
  },
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Dashboard",
    icon: FaTachometerAlt,
    active: false,
    collapsed: false,
  },
};

export const Active: Story = {
  args: {
    label: "Dashboard",
    icon: FaTachometerAlt,
    active: true,
    collapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    label: "Análisis de síntomas",
    icon: FaChartBar,
    active: false,
    collapsed: true,
  },
};

export const CollapsedActive: Story = {
  args: {
    label: "Análisis de síntomas",
    icon: FaChartBar,
    active: true,
    collapsed: true,
  },
};