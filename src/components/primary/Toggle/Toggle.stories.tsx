// src/components/primary/Toggle/Toggle.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './Toggle';

const meta = {
  title: 'Components/Primary/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean', description: 'Estado actual del interruptor' },
    disabled: { control: 'boolean', description: 'Deshabilita la interacción' },
    'aria-label': { control: 'text', description: 'Etiqueta para accesibilidad' },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- WRAPPER INTERACTIVO ---
// Creamos un mini-componente para manejar el estado con React puro, 
// sin depender de hooks frágiles de Storybook.
const ToggleInteractiva = (args: any) => {
  const [isChecked, setIsChecked] = useState(args.checked);
  return (
    <Toggle 
      {...args} 
      checked={isChecked} 
      onChange={(val) => {
        setIsChecked(val); // Actualiza la UI
        args.onChange(val); // Llama a la función del prop para satisfacer TS
      }} 
    />
  );
};

// --- HISTORIAS ---

export const Interactivo: Story = {
  args: {
    checked: false,
    onChange: () => {}, // Función vacía para calmar a TypeScript
    'aria-label': 'Interruptor interactivo',
  },
  render: (args) => <ToggleInteractiva {...args} />,
};

export const EncendidoFijo: Story = {
  args: {
    checked: true,
    onChange: () => {}, // Función vacía para calmar a TypeScript
  },
};

export const DeshabilitadoApagado: Story = {
  args: {
    checked: false,
    disabled: true,
    onChange: () => {}, 
  },
};

export const DeshabilitadoEncendido: Story = {
  args: {
    checked: true,
    disabled: true,
    onChange: () => {}, 
  },
};