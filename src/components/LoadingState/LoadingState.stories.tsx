import type { Meta, StoryObj } from "@storybook/react-vite";
import LoadingState from "./LoadingState";

const meta = {
  title: "Components/LoadingState",
  component: LoadingState,
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
          minHeight: "220px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "200px",
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    color: { control: "color" },
    className: { control: "text" },
  },
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Primary (Blue)",
  args: {
    color: "#6b97ee",
  },
};

export const Secondary: Story = {
  name: "Secondary (White)",
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#1f2937", // fondo oscuro para ver spinner blanco
          padding: "32px",
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    color: "#ffffff",
  },
};