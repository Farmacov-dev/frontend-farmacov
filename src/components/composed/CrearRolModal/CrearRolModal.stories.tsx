// src/components/composed/CrearRolModal/CrearRolModal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CrearRolModal from './CrearRolModal';
import Button from '../../primary/Button/Button';

// Instanciamos un QueryClient vacío exclusivo para aislar las pruebas en Storybook
const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const meta = {
  title: 'Components/Composed/CrearRolModal',
  component: CrearRolModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  // Inyectamos el contexto de React Query para que useCrearRol no explote
  decorators: [
    (Story) => (
      <QueryClientProvider client={mockedQueryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof CrearRolModal>;

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

      <CrearRolModal
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          args.onClose?.();
        }}
      />
    </div>
  );
};

export const Interactivo: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
  render: (args) => <ModalWrapper {...args} />,
};