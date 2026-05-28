// src/components/primary/VaccineDescription/VaccineDescription.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import VaccineDescription from './VaccineDescription';

const meta = {
  title: 'Components/Primary/VaccineDescription',
  component: VaccineDescription,
  tags: ['autodocs'],
  argTypes: {
    descripcion: { control: 'text' },
    compact: { control: 'boolean' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof VaccineDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

// Historia 1: Comportamiento por defecto en una página (con margen superior grande)
export const Default: Story = {
  args: {
    descripcion: 'La vacuna Comirnaty (BNT162b2) es una vacuna de ARNm contra el COVID-19. Funciona enseñando al sistema inmunológico a reconocer y combatir la proteína de la espiga del virus SARS-CoV-2. Está indicada para la inmunización activa en personas a partir de los 6 meses de edad.',
    compact: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'El componente por defecto tiene un margen superior amplio (`mt-10 lg:mt-20`), ideal para separar secciones dentro de la pantalla principal de detalles.',
      },
    },
  },
};

// Historia 2: Comportamiento compacto para tarjetas o modales
export const Compacto: Story = {
  args: {
    descripcion: 'Vacuna de vector viral no replicante para la prevención de la enfermedad por coronavirus 2019 (COVID-19). Requiere refrigeración estándar.',
    compact: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Al activar `compact=true`, el margen superior se reduce a `mt-4`, lo cual es perfecto para mostrar esta descripción dentro de un panel lateral (Sidebar) o un modal.',
      },
    },
  },
};