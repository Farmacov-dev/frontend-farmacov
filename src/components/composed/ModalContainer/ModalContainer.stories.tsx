// src/components/composed/ModalContainer/ModalContainer.stories.tsx
// angel
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ModalContainer from "./ModalContainer";

const meta: Meta<typeof ModalContainer> = {
  title: "Compuestos/ModalContainer",
  component: ModalContainer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ModalContainer>;

export const Abierto: Story = {
  args: {
    isOpen: true,
    showCloseButton: true,
    onClose: () => {},
    children: (
      <div className="flex flex-col gap-4">
        <p className="font-inter text-[20px] font-medium text-dark">
          Título del modal
        </p>
        <p className="font-inter text-[14px] text-muted">
          Este es el contenido del modal. Aquí van los componentes hijos.
        </p>
      </div>
    ),
  },
};

export const SinBotonCierre: Story = {
  args: {
    isOpen: true,
    showCloseButton: false,
    onClose: () => {},
    children: (
      <p className="font-inter text-[14px] text-muted">
        Este modal no tiene botón de cierre — se cierra clickeando fuera.
      </p>
    ),
  },
};

export const Interactivo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex items-center justify-center p-8">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white font-inter font-medium px-6 py-3 rounded-card cursor-pointer"
        >
          Abrir Modal
        </button>

        <ModalContainer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div className="flex flex-col gap-4">
            <p className="font-inter text-[20px] font-medium text-dark">
              Título del modal
            </p>
            <p className="font-inter text-[14px] text-muted">
              Haz click fuera o en la X para cerrar.
            </p>
          </div>
        </ModalContainer>
      </div>
    );
  },
};