import type { Meta, StoryObj } from "@storybook/react";
import SideEffectBadge from "./SideEffectBadge";

const meta: Meta<typeof SideEffectBadge> = {
  title: "UI/SideEffectBadge",
  component: SideEffectBadge,
};

export default meta;
type Story = StoryObj<typeof SideEffectBadge>;

export const Low: Story = {
  args: {
    label: "Dolor leve",
    severity: "low",
  },
};

export const High: Story = {
  args: {
    label: "Problemas cardíacos",
    severity: "high",
  },
};