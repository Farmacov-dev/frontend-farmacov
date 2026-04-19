// src/components/composed/LogoutConfirmationModal/LogoutConfirmationModal.stories.tsx
// angel
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import LogoutConfirmationModal from "./LogoutConfirmationModal";

const meta: Meta<typeof LogoutConfirmationModal> = {
  title: "Compuestos/LogoutConfirmationModal",
  component: LogoutConfirmationModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LogoutConfirmationModal>;

export const Abierto: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
  },
};

export const Interactivo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white font-inter font-medium px-6 py-3 rounded-card cursor-pointer"
        >
          Cerrar Sesión
        </button>

        {result && (
          <p className="font-inter text-[14px] text-dark">
            {result}
          </p>
        )}

        <LogoutConfirmationModal
          isOpen={isOpen}
          onClose={() => {
            setResult("Acción cancelada");
            setIsOpen(false);
          }}
          onConfirm={() => {
            setResult("Sesión cerrada correctamente");
            setIsOpen(false);
          }}
        />
      </div>
    );
  },
};