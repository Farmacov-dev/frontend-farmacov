import type { Meta, StoryObj } from "@storybook/react";
import LegendItem from "./LegendItem";

const meta: Meta<typeof LegendItem> = {
  title: "Display/LegendItem",
  component: LegendItem,
};

export default meta;
type Story = StoryObj<typeof LegendItem>;

export const Default: Story = {
  args: {
    label: "Excelente",
    color: "#22c55e",
  },
};