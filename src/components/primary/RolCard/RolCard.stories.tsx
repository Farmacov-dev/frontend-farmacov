// src/components/primary/RolCard/RolCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import RolCard from "./RolCard";

const meta: Meta<typeof RolCard> = {
  title: "Primitivos/RolCard",
  component: RolCard,
  tags: ["autodocs"],
  // Opcional: Un decorador para que la tarjeta no ocupe el 100% del ancho de la pantalla en Storybook
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RolCard>;

export const Predeterminado: Story = {
  args: {
    id: 1,
    nombre: "Finanzas",
    seleccionado: false,
  },
};

export const Seleccionado: Story = {
  args: {
    id: 2,
    nombre: "Farmacovigilancia",
    seleccionado: true,
  },
};

export const OtroColor: Story = {
  args: {
    id: 3,
    nombre: "Logística",
    seleccionado: false,
  },
};

export const Interactivo: Story = {
  args: {
    id: 4,
    nombre: "Ventas",
  },
  render: (args) => {
    // Estado local para simular la selección al hacer clic
    const [seleccionado, setSeleccionado] = useState(false);
    
    return (
      <RolCard 
        {...args} 
        seleccionado={seleccionado} 
        onClick={() => setSeleccionado(!seleccionado)} 
      />
    );
  },
};