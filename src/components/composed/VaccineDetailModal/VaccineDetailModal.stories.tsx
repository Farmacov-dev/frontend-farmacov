import type { Meta, StoryObj } from "@storybook/react-vite";
import VaccineDetailModal from "./VaccineDetailModal";

const meta = {
  title: "Components/VaccineDetailModal",
  component: VaccineDetailModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "100vh",
          background: "#DDE3F4",
          padding: "16px",
          boxSizing: "border-box",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
    },
    showEmptyState: {
      control: { type: "boolean" },
    },
    emptyMessage: {
      control: { type: "text" },
    },
    onClose: {
      action: "close-click",
    },
  },
} satisfies Meta<typeof VaccineDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Con información",
  args: {
    isOpen: true,
    showEmptyState: false,
  },
};

export const EmptyStateModal: Story = {
  name: "Sin información",
  args: {
    isOpen: true,
    showEmptyState: true,
    emptyMessage: "No hay información para mostrar sobre esta vacuna",
  },
};