// src/components/composed/VacunaModal/VacunaModal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import VacunaModal from './VacunaModal';
import Button from '../../primary/Button/Button';

// Mock de las entidades para evitar dependencias externas
interface MockFarmaco {
  id: number;
  nombre: string;
}

interface MockVacuna {
  id: number;
  nombre: string;
  tipo: string;
}

const mockFarmacoActivo: MockFarmaco = {
  id: 1,
  nombre: 'Pfizer-BioNTech',
};

const meta = {
  title: 'Components/Composed/VacunaModal',
  component: VacunaModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof VacunaModal>;

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

      <VacunaModal
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          args.onClose?.();
        }}
        onSubmit={(id, data) => {
          console.log(`ID Manual: ${id}`, "Datos:", data);
          if (!args.isLoading) {
            setIsOpen(false);
          }
          args.onSubmit?.(id, data);
        }}
      />
    </div>
  );
};

export const ModoCrear: Story = {
  args: {
    vacunaToEdit: null,
    farmacoActivo: mockFarmacoActivo as any,
    isLoading: false,
    isOpen: true,
    onClose: () => {},
    onSubmit: () => {},
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const ModoEditar: Story = {
  args: {
    vacunaToEdit: {
      id: 99,
      nombre: 'Comirnaty',
      tipo: 'ARNm',
    } as MockVacuna as any,
    farmacoActivo: mockFarmacoActivo as any,
    isLoading: false,
    isOpen: true,
    onClose: () => {},
    onSubmit: () => {},
  },
  render: (args) => <ModalWrapper {...args} />,
};