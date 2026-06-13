import type { Meta, StoryObj } from "@storybook/react";
import FilterBar from "./FilterBar";

const meta: Meta<typeof FilterBar> = {
  title: "Filters/FilterBar",
  component: FilterBar,
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

export const Default: Story = {};

export const CompactView: Story = {
  name: "Vista compacta",
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      <FilterBar />
    </div>
  ),
};