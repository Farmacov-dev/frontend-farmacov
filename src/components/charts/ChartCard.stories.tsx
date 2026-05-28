// src/components/charts/ChartCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import ChartCard from './ChartCard';

const meta = {
  title: 'Components/Charts/ChartCard',
  component: ChartCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-8 bg-surface min-h-screen">
        <div className="max-w-3xl mx-auto">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ChartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Data de prueba
const mockData = [
  { label: 'Enero', value: 120 },
  { label: 'Febrero', value: 250 },
  { label: 'Marzo', value: 180 },
  { label: 'Abril', value: 310 },
  { label: 'Mayo', value: 220 },
];

export const GraficoDeBarras: Story = {
  args: {
    title: 'Reportes Mensuales',
    subtitle: 'Cantidad de efectos reportados en el último semestre',
    type: 'bar',
    data: mockData,
  },
};

export const GraficoDeLineas: Story = {
  args: {
    title: 'Tendencia de Eficacia',
    subtitle: 'Niveles de anticuerpos sostenidos por mes',
    type: 'line',
    data: mockData,
  },
};

export const GraficoDeArea: Story = {
  args: {
    title: 'Incidencia Poblacional',
    subtitle: 'Volumen de casos identificados a lo largo del tiempo',
    type: 'area',
    data: mockData,
  },
};

export const GraficoDeDona: Story = {
  args: {
    title: 'Distribución Demográfica',
    subtitle: 'Participación por grupo de edad',
    type: 'pie',
    data: [
      { label: '18-25 años', value: 35 },
      { label: '26-40 años', value: 45 },
      { label: '41-60 años', value: 15 },
      { label: '60+ años', value: 5 },
    ],
  },
};