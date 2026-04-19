import type { Meta, StoryObj } from "@storybook/react";
import FilterBar from "./FilterBar";

const meta: Meta<typeof FilterBar> = {
  title: "Filters/FilterBar",
  component: FilterBar,
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

export const Default: Story = {
  args: {
    filters: [
      {
        key: "vacuna",
        label: "Vacuna",
        value: "pfizer",
        options: [
          { label: "Pfizer", value: "pfizer" },
          { label: "Moderna", value: "moderna" },
        ],
      },
      {
        key: "edad",
        label: "Edad",
        value: "all",
        options: [
          { label: "Todas", value: "all" },
          { label: "18-40", value: "18-40" },
        ],
      },
    ],
  },
};