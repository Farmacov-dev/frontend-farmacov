import { useState } from "react";
import ExportCatalogModal from "./components/composed/ExportCatalogModal/ExportCatalogModal";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<{
    format: string;
    orientation: string;
    content: string[];
  } | null>(null);

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-6">
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
          <p>Contenido: <strong>{result.content.join(", ")}</strong></p>
        </div>
      )}

      <ExportCatalogModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onExport={(config) => setResult(config)}
      />
    </div>
  );
}