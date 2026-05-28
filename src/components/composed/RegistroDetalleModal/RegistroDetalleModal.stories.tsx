// src/components/composed/RegistroDetalleModal/RegistroDetalleModal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import RegistroDetalleModal from './RegistroDetalleModal';
import Button from '../../primary/Button/Button';

const meta = {
  title: 'Components/Composed/RegistroDetalleModal',
  component: RegistroDetalleModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RegistroDetalleModal>;

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

      <RegistroDetalleModal
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

// --- Historias para COSTOS ---

export const CostoCrear: Story = {
  args: {
    tipo: 'costos',
    itemToEdit: null,
    isLoading: false,
    isOpen: true,
    onClose: () => {},
    onSubmit: () => {},
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const CostoEditar: Story = {
  args: {
    tipo: 'costos',
    itemToEdit: { costoUnitario: 125.5 },
    isLoading: false,
    isOpen: true,
    onClose: () => {},
    onSubmit: () => {},
  },
  render: (args) => <ModalWrapper {...args} />,
};

// --- Historias para CONDICIONES ---

export const CondicionCrear: Story = {
  args: {
    tipo: 'condiciones',
    itemToEdit: null,
    isLoading: false,
    isOpen: true,
    onClose: () => {},
    onSubmit: () => {},
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const CondicionEditar: Story = {
  args: {
    tipo: 'condiciones',
    itemToEdit: { temperatura: -70, tiempoAmbiente: 1.5 },
    isLoading: false,
    isOpen: true,
    onClose: () => {},
    onSubmit: () => {},
  },
  render: (args) => <ModalWrapper {...args} />,
};