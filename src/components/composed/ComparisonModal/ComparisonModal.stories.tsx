// src/components/composed/ComparisonModal/ComparisonModal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ComparisonModal from './ComparisonModal';
import Button from '../../primary/Button/Button';

const meta = {
  title: 'Components/Composed/ComparisonModal',
  component: ComparisonModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen', // Para que el overlay del modal cubra toda la pantalla de Storybook
  },
} satisfies Meta<typeof ComparisonModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockVaccines = [
  { id: 1, nombre: 'Comirnaty (Pfizer)' },
  { id: 2, nombre: 'Spikevax (Moderna)' },
  { id: 3, nombre: 'Vaxzevria (AstraZeneca)' },
  { id: 4, nombre: 'Jcovden (Janssen)' },
];

// Wrapper para controlar la visibilidad del modal sin romper Storybook
const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="p-10 flex flex-col items-center justify-center min-h-screen bg-surface">
      <p className="mb-4 text-muted">Contenido de fondo de la aplicación...</p>
      <Button onClick={() => setIsOpen(true)}>
        Abrir Modal de Comparación
      </Button>

      <ComparisonModal
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          args.onClose?.();
        }}
        onCompare={(idA, idB, nameA, nameB) => {
          console.log(`Comparando: ${nameA} vs ${nameB}`);
          setIsOpen(false);
          args.onCompare?.(idA, idB, nameA, nameB);
        }}
      />
    </div>
  );
};

export const Interactivo: Story = {
  args: {
    isOpen: true,
    vaccines: mockVaccines,
    onClose: () => {},
    onCompare: () => {},
  },
  render: (args) => <ModalWrapper {...args} />,
};