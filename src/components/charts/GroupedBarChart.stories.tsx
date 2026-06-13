// src/components/charts/GroupedBarChart.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import GroupedBarChart from './GroupedBarChart';

// Mock de la interfaz esperada
interface MockSintomaAgrupado {
  sintoma: string;
  [key: string]: string | number; // Permite llaves dinámicas para los nombres de las vacunas
}

const mockData: MockSintomaAgrupado[] = [
  { sintoma: 'Fiebre', 'Pfizer': 45, 'Moderna': 60, 'AstraZeneca': 30 },
  { sintoma: 'Fatiga', 'Pfizer': 80, 'Moderna': 75, 'AstraZeneca': 90 },
  { sintoma: 'Dolor Cabeza', 'Pfizer': 55, 'Moderna': 40, 'AstraZeneca': 65 },
  { sintoma: 'Náuseas', 'Pfizer': 15, 'Moderna': 20, 'AstraZeneca': 35 },
];

const mockVacunas = [
  { id: 1, nombre: 'Pfizer' },
  { id: 2, nombre: 'Moderna' },
  { id: 3, nombre: 'AstraZeneca' },
];

const meta = {
  title: 'Components/Charts/GroupedBarChart',
  component: GroupedBarChart,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-8 bg-surface min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof GroupedBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComparativaCompleta: Story = {
  args: {
    title: 'Incidencia de Síntomas Post-Vacunación',
    subtitle: 'Frecuencia reportada por cada 1,000 dosis aplicadas',
    data: mockData,
    vacunasSeleccionadas: mockVacunas,
  },
};

export const ComparativaParcial: Story = {
  args: {
    title: 'Incidencia de Síntomas Post-Vacunación',
    subtitle: 'Frecuencia reportada por cada 1,000 dosis aplicadas',
    data: mockData,
    // Simulamos que el usuario solo seleccionó dos
    vacunasSeleccionadas: [mockVacunas[0], mockVacunas[2]], 
  },
};

export const EstadoVacio: Story = {
  args: {
    title: 'Incidencia de Síntomas Post-Vacunación',
    subtitle: 'Frecuencia reportada por cada 1,000 dosis aplicadas',
    data: mockData,
    vacunasSeleccionadas: [], // Desencadena el Empty State
  },
};