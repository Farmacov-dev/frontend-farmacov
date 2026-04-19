import type { Meta, StoryObj } from "@storybook/react";
import FormsCamp from "./FormsCamp";

const meta: Meta<typeof FormsCamp> = {
  title: "Forms/FormsCamp",
  component: FormsCamp,
};

export default meta;
type Story = StoryObj<typeof FormsCamp>;

export const Default: Story = {
  args: {
    label: "Nombre",
    children: (
      <input className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="Escribe..." />
    ),
  },
};

export const Required: Story = {
  args: {
    label: "Correo",
    required: true,
    children: (
      <input className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="Correo..." />
    ),
  },
};

export const WithError: Story = {
  args: {
    label: "Nombre",
    error: "Campo obligatorio",
    children: (
      <input className="w-full rounded-xl border px-3 py-2 text-sm" />
    ),
  },
};