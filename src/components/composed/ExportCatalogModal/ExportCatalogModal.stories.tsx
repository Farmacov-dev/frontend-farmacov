// src/components/composed/ExportCatalogModal/ExportCatalogModal.stories.tsx
// angel
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ExportCatalogModal from "./ExportCatalogModal";

const meta: Meta<typeof ExportCatalogModal> = {
  title: "Compuestos/ExportCatalogModal",
  component: ExportCatalogModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ExportCatalogModal>;

export const Abierto: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onExport: () => {},
  },
};

export const Interactivo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState<{
      format: string;
      orientation: string;
      content: string[];
    } | null>(null);

    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white font-inter font-medium px-6 py-3 rounded-card cursor-pointer"
        >
          Exportar Catálogo
        </button>

        {result && (
          <div className="flex flex-col items-center gap-2 font-inter text-[14px] text-dark">
            <p>Formato: <strong>{result.format}</strong></p>
            <p>Orientación: <strong>{result.orientation}</strong></p>
            <p>Contenido: <strong>{result.content.join(", ") || "ninguno"}</strong></p>
          </div>
        )}

        <ExportCatalogModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onExport={(config) => setResult(config)}
        />
      </div>
    );
  },
};