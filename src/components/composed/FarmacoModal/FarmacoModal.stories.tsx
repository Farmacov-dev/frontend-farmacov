// src/components/composed/FarmacoModal/FarmacoModal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FarmacoModal from './FarmacoModal';
import Button from '../../primary/Button/Button';

interface MockFarmaco {
  id: number;
  nombre: string;
  tipo: string;
  descripcion: string;
}

const meta = {
  title: 'Components/Composed/FarmacoModal',
  component: FarmacoModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FarmacoModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper interactivo
const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="p-10 flex flex-col items-center justify-center min-h-screen bg-surface">
      <Button onClick={() => setIsOpen(true)}>
        Abrir Modal
      </Button>

      <FarmacoModal
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          args.onClose?.();
        }}
        onSubmit={(data) => {
          console.log("Datos enviados:", data);
          if (!args.isLoading) {
            setIsOpen(false);
          }
          args.onSubmit?.(data);
        }}
      />
    </div>
  );
};

export const ModoCrear: Story = {
  args: {
    farmacoToEdit: null,
    isLoading: false,
    isOpen: true,
    onClose: () => {},
    onSubmit: () => {},
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const ModoEditar: Story = {
  args: {
    farmacoToEdit: {
      id: 1,
      nombre: 'ModernaTX, Inc.',
      tipo: 'ARNm',
      descripcion: 'Empresa de biotecnología especializada en el descubrimiento y desarrollo de fármacos y tecnologías de vacunas basadas en ARN mensajero.',
    } as MockFarmaco,
    isLoading: false,
    isOpen: true,
    onClose: () => {},
    onSubmit: () => {},
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const EstadoCargando: Story = {
  args: {
    farmacoToEdit: null,
    isLoading: true, 
    isOpen: true,
    onClose: () => {},
    onSubmit: () => {},
  },
  render: (args) => <ModalWrapper {...args} />,
};