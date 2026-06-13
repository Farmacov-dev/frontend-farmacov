import type { Meta, StoryObj } from "@storybook/react";
import FilterSelect from "./FilterSelect";

const meta: Meta<typeof FilterSelect> = {
  title: "Filters/FilterSelect",
  component: FilterSelect,
};

export default meta;
type Story = StoryObj<typeof FilterSelect>;

export const Default: Story = {
  args: {
    label: "Vacuna",
    value: "pfizer",
    options: [
      { label: "Pfizer", value: "pfizer" },
      { label: "Moderna", value: "moderna" },
    ],
  },
};

export const Empty: Story = {
  args: {
    label: "Vacuna",
    value: "",
    options: [],
  },
};