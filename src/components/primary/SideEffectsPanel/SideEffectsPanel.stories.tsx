// src/components/primary/SideEffectsPanel/SideEffectsPanel.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import SideEffectsPanel from './SideEffectsPanel';

const meta = {
  title: 'Components/Primary/SideEffectsPanel',
  component: SideEffectsPanel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SideEffectsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Historia 1: Lista variada de efectos
export const ConEfectos: Story = {
  args: {
    efectos: [
      {
        descripcion: 'Dolor en el sitio de inyección',
        severidad: 'leve',
      },
      {
        descripcion: 'Fiebre leve y fatiga',
        severidad: 'moderado',
      },
      {
        descripcion: 'Reacción alérgica severa (Anafilaxia)',
        severidad: 'grave',
      },
    ],
  },
};

// Historia 2: Estado vacío delegado al componente EmptyState
export const SinEfectos: Story = {
  args: {
    efectos: [],
  },
};

// Historia 3: Simulación de un solo tipo para verificar alineación
export const SoloLeves: Story = {
  args: {
    efectos: [
      { descripcion: 'Dolor de cabeza leve', severidad: 'leve' },
      { descripcion: 'Enrojecimiento local', severidad: 'leve' },
    ],
  },
};