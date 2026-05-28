// src/components/composed/SeveridadComparisonPanel/SeveridadComparisonPanel.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SeveridadComparisonPanel from './SeveridadComparisonPanel';

const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const mockVacunas = [
  { id: 1, nombre: 'Comirnaty (Pfizer)' },
  { id: 2, nombre: 'Spikevax (Moderna)' },
  { id: 3, nombre: 'Vaxzevria (AstraZeneca)' },
  { id: 4, nombre: 'Jcovden (Janssen)' },
];

const meta = {
  title: 'Components/Composed/SeveridadComparisonPanel',
  component: SeveridadComparisonPanel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={mockedQueryClient}>
        <div className="p-6 bg-slate-50 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <Story />
          </div>
        </div>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof SeveridadComparisonPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    vacunas: mockVacunas,
  },
  parameters: {
    docs: {
      description: {
        story: 'El panel mostrará los Empty States inicialmente. Al seleccionar vacunas, entrará en estado de carga infinito en Storybook porque requiere la respuesta del API real a través de React Query.',
      },
    },
  },
};