// src/components/composed/ComparisonModal/ComparisonModal.stories.tsx
// angel
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ComparisonModal from "./ComparisonModal";

const meta: Meta<typeof ComparisonModal> = {
  title: "Compuestos/ComparisonModal",
  component: ComparisonModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ComparisonModal>;

const VACCINES = [
  "Comirnaty",
  "Spikevax",
  "Vaxzevria",
  "Janssen",
  "CoronaVac",
  "Sinopharm",
];

// historia estática — modal abierto sin interacción
export const Abierto: Story = {
  args: {
    isOpen: true,
    vaccines: VACCINES,
    onClose: () => {},
    onCompare: () => {},
  },
};

// historia interactiva — puedes seleccionar vacunas y ver el botón activarse
export const Interactivo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState<{ a: string; b: string } | null>(null);

    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white font-inter font-medium px-6 py-3 rounded-card cursor-pointer"
        >
          Abrir Modal
        </button>

        {result && (
          <p className="font-inter text-[14px] text-dark">
            Comparando: <strong>{result.a}</strong> vs <strong>{result.b}</strong>
          </p>
        )}

        <ComparisonModal
          isOpen={isOpen}
          vaccines={VACCINES}
          onClose={() => setIsOpen(false)}
          onCompare={(a, b) => {
            setResult({ a, b });
            setIsOpen(false);
          }}
        />
      </div>
    );
  },
};