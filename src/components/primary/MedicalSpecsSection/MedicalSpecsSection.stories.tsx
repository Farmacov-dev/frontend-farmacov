// src/components/primary/MedicalSpecsSection/MedicalSpecsSection.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import MedicalSpecsSection from './MedicalSpecsSection';

const meta = {
  title: 'Components/Primary/MedicalSpecsSection',
  component: MedicalSpecsSection,
  tags: ['autodocs'],
  argTypes: {
    tipo: { control: 'text' },
    temperatura: { control: 'number' },
    tiempoAmbiente: { control: 'number' },
    costoUnitario: { control: 'number' },
    dosisRequerida: { control: 'number' },
  },
} satisfies Meta<typeof MedicalSpecsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// Historia 1: Vacuna tipo ARNm (Requiere ultra-congelación y tiene tiempo ambiente)
export const VacunaARNm: Story = {
  args: {
    tipo: 'ARNm (Comirnaty)',
    temperatura: -70,
    tiempoAmbiente: 2,
    costoUnitario: 19.50,
    dosisRequerida: 2,
  },
};

// Historia 2: Vacuna tipo Vector Viral (Refrigeración estándar, sin tiempo ambiente estricto)
export const VacunaVectorViral: Story = {
  args: {
    tipo: 'Vector Viral (Vaxzevria)',
    temperatura: 8,
    tiempoAmbiente: null, // Prueba de renderizado condicional (no debe mostrar la fila)
    costoUnitario: 4.00,
    dosisRequerida: 1, // Prueba del nuevo prop dinámico
  },
};