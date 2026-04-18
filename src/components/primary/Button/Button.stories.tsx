// src/components/primary/Button/Button.stories.tsx
// angel
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Primitivos/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Confirmar",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Cancelar",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Volver",
  },
};

export const Sidebar: Story = {
  args: {
    variant: "sidebar",
    children: "Dashboard",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    children: "No disponible",
    disabled: true,
  },
};

export const ConIcono: Story = {
  args: {
    variant: "primary",
    children: "Nueva Comparación",
    icon: "/src/assets/icons/plus.svg",
    iconAlt: "agregar",
  },
};