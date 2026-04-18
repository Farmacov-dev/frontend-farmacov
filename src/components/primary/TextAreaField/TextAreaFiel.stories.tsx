// src/components/primary/TextAreaField/TextAreaField.stories.tsx
// angel
import type { Meta, StoryObj } from "@storybook/react";
import TextAreaField from "./TextAreaField";

const meta: Meta<typeof TextAreaField> = {
  title: "Primitivos/TextAreaField",
  component: TextAreaField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TextAreaField>;

export const Default: Story = {
  args: {
    label: "Observaciones",
    placeholder: "Escribe tus observaciones aquí...",
  },
};

export const ConTexto: Story = {
  args: {
    label: "Observaciones",
    value: "El paciente presentó síntomas leves después de la segunda dosis.",
  },
};

export const Error: Story = {
  args: {
    label: "Observaciones",
    placeholder: "Escribe tus observaciones aquí...",
    error: true,
  },
};

export const ConContador: Story = {
  args: {
    label: "Observaciones",
    placeholder: "Máximo 300 caracteres...",
    maxLength: 300,
    showCount: true,
    value: "Texto de ejemplo.",
  },
};

export const SinLabel: Story = {
  args: {
    placeholder: "Sin label, solo el área de texto...",
  },
};

export const Disabled: Story = {
  args: {
    label: "Observaciones",
    value: "Este campo no es editable.",
    disabled: true,
  },
};