// src/components/composed/ConfirmModal/ConfirmModal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import Button from '../../primary/Button/Button';

const meta = {
  title: 'Components/Composed/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper interactivo
const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="p-10 flex flex-col items-center justify-center min-h-screen bg-surface">
      <Button onClick={() => setIsOpen(true)}>
        Disparar Acción
      </Button>

      <ConfirmModal
        {...args}
        isOpen={isOpen} // El wrapper toma el control del estado
        onClose={() => {
          setIsOpen(false);
          args.onClose?.();
        }}
        onConfirm={() => {
          if (!args.isLoading) {
            setIsOpen(false);
          }
          args.onConfirm?.();
        }}
      />
    </div>
  );
};

export const Informativo: Story = {
  args: {
    title: 'Actualizar Catálogo',
    message: '¿Estás seguro de que deseas sincronizar la lista de vacunas con la base de datos nacional? Este proceso podría tardar un par de minutos.',
    confirmText: 'Sincronizar',
    isDestructive: false,
    isLoading: false,
    // --- Añadimos los props requeridos ficticios para TypeScript ---
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const Destructivo: Story = {
  args: {
    title: 'Eliminar Registro',
    message: 'Esta acción no se puede deshacer. Todos los datos relacionados con el lote VAX-2026-89A serán borrados permanentemente del sistema.',
    confirmText: 'Sí, eliminar',
    cancelText: 'Mantener registro',
    isDestructive: true,
    isLoading: false,
    // --- Añadimos los props requeridos ficticios para TypeScript ---
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const Cargando: Story = {
  args: {
    title: 'Eliminar Registro',
    message: 'Por favor no cierres la ventana mientras procesamos la solicitud...',
    confirmText: 'Eliminar',
    isDestructive: true,
    isLoading: true,
    // --- Añadimos los props requeridos ficticios para TypeScript ---
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
  },
  render: (args) => <ModalWrapper {...args} />,
};