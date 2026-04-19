import type { Meta, StoryObj } from "@storybook/react-vite";

import ChartCard from "./ChartCard";

const meta = {
    title: "charts/ChartCard",
    component: ChartCard,
} satisfies Meta<typeof ChartCard>;

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {};

export const CustomData: Story = {
  args: {
    data: [
      { label: "Miocarditis", value: 95 },
      { label: "Anafilaxia", value: 70 },
      { label: "Trombosis", value: 60 },
      { label: "Parálisis", value: 45 },
      { label: "Gastritis", value: 30 },
    ],
  },
};

export const EmptyArray: Story = {
    args: {
        data: [],
    },
};