// src/components/primary/InputField/InputField.stories.tsx
// angel
import type { Meta, StoryObj } from "@storybook/react";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Primitivos/InputField",
  component: InputField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Correo electrónico",
    placeholder: "ejemplo@correo.com",
    type: "text",
  },
};

export const Filled: Story = {
  args: {
    label: "Correo electrónico",
    defaultValue: "angel@farmacov.com",
    type: "text",
  },
};

export const Error: Story = {
  args: {
    label: "Correo electrónico",
    placeholder: "ejemplo@correo.com",
    error: true,
  },
};

export const Password: Story = {
  args: {
    label: "Contraseña",
    placeholder: "••••••••",
    type: "password",
    eyeIcon: "/src/assets/icons/eye.svg",
    eyeOffIcon: "/src/assets/icons/eye-off.svg",
  },
};

export const PasswordError: Story = {
  args: {
    label: "Contraseña",
    placeholder: "••••••••",
    type: "password",
    error: true,
    eyeIcon: "/src/assets/icons/eye.svg",
    eyeOffIcon: "/src/assets/icons/eye-off.svg",
  },
};

export const Disabled: Story = {
  args: {
    label: "Correo electrónico",
    placeholder: "ejemplo@correo.com",
    disabled: true,
  },
};