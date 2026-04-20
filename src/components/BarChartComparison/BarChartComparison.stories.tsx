import type { Meta, StoryObj } from "@storybook/react-vite";
import BarChartComparison from "./BarChartComparison";

const meta = {
  title: "Charts/BarChartComparison",
  component: BarChartComparison,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#ECEFF3",
          minHeight: "100vh",
          padding: "24px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    data: {
      control: false,
    },
    firstLabel: {
      control: { type: "text" },
    },
    secondLabel: {
      control: { type: "text" },
    },
    firstColor: {
      control: { type: "color" },
    },
    secondColor: {
      control: { type: "color" },
    },
    maxValue: {
      control: { type: "number" },
    },
  },
} satisfies Meta<typeof BarChartComparison>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultComparison: Story = {
  name: "Con datos",
  args: {
    firstLabel: "Artralgias",
    secondLabel: "Mialgias",
    firstColor: "#29ABE2",
    secondColor: "#EB8F57",
    maxValue: 15000,
    data: [
      { label: "Grupo de edad 1", firstValue: 400, secondValue: 2200 },
      { label: "Grupo de edad 2", firstValue: 6200, secondValue: 12000 },
      { label: "Grupo de edad 3", firstValue: 9800, secondValue: 3400 },
    ],
  },
};

export const EmptyComparison: Story = {
  name: "Sin datos",
  args: {
    firstLabel: "Artralgias",
    secondLabel: "Mialgias",
    firstColor: "#29ABE2",
    secondColor: "#EB8F57",
    maxValue: 15000,
    data: [],
  },
};