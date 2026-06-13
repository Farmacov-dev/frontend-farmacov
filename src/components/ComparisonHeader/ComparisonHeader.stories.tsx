import type { Meta, StoryObj } from "@storybook/react-vite";
import ComparisonHeader from "./ComparisonHeader";

const meta = {
  title: "Components/ComparisonHeader",
  component: ComparisonHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#f7f9fc",
          padding: "40px",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    leftLabel: {
      control: { type: "text" },
    },
    rightLabel: {
      control: { type: "text" },
    },
    className: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof ComparisonHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SameVaccine: Story = {
  name: "Vacunas diferentes ",
  args: {
    leftLabel: "Comirnaty\nPfizer-BioNTech",
    rightLabel: "Spikevax\nModerna",
  },
};

export const DifferentVaccines: Story = {
  name: "Sin datos",
  args: {
    leftLabel: "",
    rightLabel: "",
  },
};