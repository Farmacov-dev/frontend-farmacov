// src/components/composed/ExportCatalogModal/ExportCatalogModal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ExportCatalogModal from './ExportCatalogModal';
import Button from '../../primary/Button/Button';

const meta = {
  title: 'Components/Composed/ExportCatalogModal',
  component: ExportCatalogModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ExportCatalogModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper interactivo para no bloquear Storybook
const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="p-10 flex flex-col items-center justify-center min-h-screen bg-surface border border-stroke border-dashed">
      <Button onClick={() => setIsOpen(true)}>
        Abrir Opciones de Exportación
      </Button>

      <ExportCatalogModal
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          args.onClose?.();
        }}
        onExport={(config) => {
          // Imprimimos la configuración en la consola de Storybook (Actions)
          console.log("Exportando PDF con:", config);
          setIsOpen(false);
          args.onExport?.(config);
        }}
      />
    </div>
  );
};

export const Interactivo: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onExport: () => {},
  },
  render: (args) => <ModalWrapper {...args} />,
};