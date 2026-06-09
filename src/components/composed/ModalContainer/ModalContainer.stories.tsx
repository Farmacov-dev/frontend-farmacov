// src/components/composed/ModalContainer/ModalContainer.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ModalContainer from './ModalContainer';
import Button from '../../primary/Button/Button';

const meta = {
  title: 'Components/Composed/ModalContainer',
  component: ModalContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ModalContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const WrapperInteractivo = (args: any) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="p-10 flex flex-col items-center justify-center min-h-screen bg-surface">
      <Button onClick={() => setIsOpen(true)}>
        Abrir Contenedor
      </Button>

      <ModalContainer 
        {...args} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
      >
        {/* Contenido inyectado para la prueba */}
        <div className="flex flex-col gap-4 w-full sm:w-[400px]">
          <h2 className="text-xl font-bold text-dark font-inter">Soy un Modal Contenedor</h2>
          <p className="text-muted text-sm leading-relaxed">
            Mi única responsabilidad es oscurecer el fondo, bloquear el scroll, 
            proveer el botón de cerrar y atrapar los clics para que mis hijos 
            solo se preocupen por su contenido interno. Puedes cerrarme haciendo clic afuera o presionando Escape.
          </p>
          <div className="flex justify-end mt-4">
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Entendido
            </Button>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export const Predeterminado: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: null, 
  },
  render: (args) => <WrapperInteractivo {...args} />,
};

export const SinBotonDeCerrar: Story = {
  args: {
    isOpen: true,
    showCloseButton: false,
    onClose: () => {},
    children: null,
  },
  render: (args) => <WrapperInteractivo {...args} />,
};