// src/components/composed/ExportarReporteModal/ExportarReporteModal.stories.tsx
// angel

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ExportarReporteModal from './ExportarReporteModal';
import Button from '../../primary/Button/Button';

const meta = {
  title: 'Composed/ExportarReporteModal',
  component: ExportarReporteModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ExportarReporteModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper para controlar la visibilidad y el estado de carga sin romper Storybook
const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(args.isOpen ?? true);
  const [isLoading, setIsLoading] = useState(args.isLoading ?? false);

  return (
    <div className="p-10 flex flex-col items-center justify-center min-h-screen bg-surface">
      <p className="mb-4 text-muted">Contenido de fondo del Dashboard...</p>
      <Button onClick={() => setIsOpen(true)}>
        Abrir Modal de Exportación
      </Button>

      <ExportarReporteModal
        {...args}
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={() => {
          setIsOpen(false);
          args.onClose?.();
        }}
        onExport={(conclusiones) => {
          console.log('Conclusiones listas para inyectarse en el PDF:', conclusiones);
          
          // Simulamos el retraso que tomaría html2canvas en tomar la captura
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            setIsOpen(false);
            args.onExport?.(conclusiones);
          }, 2000);
        }}
      />
    </div>
  );
};

export const Interactivo: Story = {
  args: {
    isOpen: true,
    isLoading: false,
    onClose: () => {},
    onExport: () => {},
  },
  render: (args) => <ModalWrapper {...args} />,
};

// Historia estática para visualizar rápidamente cómo se ve el botón deshabilitado
export const EstadoCargando: Story = {
  args: {
    isOpen: true,
    isLoading: true,
    onClose: () => {},
    onExport: () => {},
  },
};