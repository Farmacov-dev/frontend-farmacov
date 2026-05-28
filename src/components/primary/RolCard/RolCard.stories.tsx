// src/components/primary/RolCard/RolCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import RolCard from './RolCard';

const meta = {
  title: 'Components/Primary/RolCard',
  component: RolCard,
  tags: ['autodocs'],
  argTypes: {
    nombre: { control: 'text' },
    seleccionado: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  // Simulamos un grid para que la tarjeta no ocupe toda la pantalla en el preview
  decorators: [
    (Story) => (
      <div className="max-w-[200px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RolCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Verificamos el comportamiento por defecto con 2 palabras
export const Default: Story = {
  args: {
    id: 1,
    nombre: 'Administrador Global',
    seleccionado: false,
  },
};

export const Seleccionado: Story = {
  args: {
    id: 2,
    nombre: 'Médico',
    seleccionado: true,
  },
};

// Verificamos la corrección lógica de 1 sola palabra
export const UnaPalabra: Story = {
  args: {
    id: 3,
    nombre: 'Investigador',
    seleccionado: false,
  },
};

// Verificamos la consistencia del hash de colores con distintos nombres
// Verificamos la consistencia del hash de colores con distintos nombres
export const TestColores: Story = {
  // Añadimos args ficticios para satisfacer la interfaz obligatoria de TypeScript
  args: {
    id: 0,
    nombre: 'Dummy',
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[450px]">
      <RolCard id={1} nombre="Admin" />
      <RolCard id={2} nombre="Doctor" />
      <RolCard id={3} nombre="Enfermera" />
      <RolCard id={4} nombre="Laboratorista" />
      <RolCard id={5} nombre="Paciente" />
      <RolCard id={6} nombre="Superusuario" />
    </div>
  ),
};