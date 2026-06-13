import type { Meta, StoryObj } from "@storybook/react-vite";
import FormSectionTitle from "./FormSectionTitle";

const meta = {
  title: "Components/FormSectionTitle",
  component: FormSectionTitle,
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
          minHeight: "200px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
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
    className: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof FormSectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserActivityLog: Story = {
  name: "Bitácora de Usuarios",
  args: {
    title: "Bitácora de Usuarios",
  },
};

export const EmptyTitle: Story = {
  name: "Título Vacío",
  args: {
    title: "",
  },
};