// src/components/primary/Toggle/Toggle.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Primitivos/Toggle",
  component: Toggle,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Activo: Story = {
  args: {
    checked: true,
    onChange: () => {}, // Función vacía solo para visualización
  },
};

export const Inactivo: Story = {
  args: {
    checked: false,
    onChange: () => {},
  },
};

export const Deshabilitado: Story = {
  args: {
    checked: false,
    disabled: true,
    onChange: () => {},
  },
};

export const Interactivo: Story = {
  render: (args) => {
    // Usamos un hook local para que este caso específico se pueda probar haciendo clic
    const [isChecked, setIsChecked] = useState(false);
    
    return (
      <Toggle 
        {...args} 
        checked={isChecked} 
        onChange={setIsChecked} 
      />
    );
  },
};