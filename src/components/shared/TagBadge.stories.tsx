import type { Meta, StoryObj } from "@storybook/react";
import TagBadge from "./TagBadge";

const meta: Meta<typeof TagBadge> = {
  title: "UI/TagBadge",
  component: TagBadge,
};

export default meta;
type Story = StoryObj<typeof TagBadge>;

export const Default: Story = {
  args: {
    label: "ARNm",
  },
};

export const LongText: Story = {
  args: {
    label: "Tecnología ARN Mensajero",
  },
};