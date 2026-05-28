// src/components/composed/ExportarReporteModal/ExportarReporteModal.tsx
// angel

import { useState } from "react";
import Button from "../../primary/Button/Button";
import TextAreaField from "../../primary/TextAreaField/TextAreaField";
import { X } from "lucide-react";

interface ExportarReporteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (conclusiones: string) => void;
  isLoading: boolean;
}

export default function ExportarReporteModal({
  isOpen,
  onClose,
  onExport,
  isLoading,
}: ExportarReporteModalProps) {
  const [texto, setTexto] = useState("");

  if (!isOpen) return null;

  const handleExport = () => {
    onExport(texto);
    // Limpiamos el texto después de exportar
    setTimeout(() => setTexto(""), 500); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/40 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-[500px] rounded-card bg-white shadow-modal overflow-hidden flex flex-col">
        
        {/* Cabecera */}
        <div className="flex justify-between items-center p-6 border-b border-stroke">
          <h3 className="text-lg font-bold text-dark font-inter">
            Configurar Reporte PDF
          </h3>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-muted hover:text-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cuerpo */}
        <div className="p-6 flex flex-col gap-4">
          <div>
            <p className="text-xs text-muted font-inter mb-4">
              Este texto se adjuntará en la parte inferior del documento PDF generado. Ideal para notas ejecutivas o hallazgos clave.
            </p>
            
            {/* [REFACTOR]: Implementación del componente primario TextAreaField */}
            <TextAreaField
              label="Conclusiones de la Dirección (Opcional)"
              id="conclusiones-modal"
              rows={4}
              placeholder="Ej. Se observa una tendencia al alza en los reportes..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              disabled={isLoading}
              maxLength={600} // Límite seguro para no desbordar la hoja A4
              showCount={true} // Activamos tu excelente contador de caracteres
            />
          </div>
        </div>

        {/* Pie / Botones */}
        <div className="flex justify-end gap-3 bg-surface p-6 border-t border-stroke">
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleExport} disabled={isLoading}>
            {isLoading ? "Generando PDF..." : "Generar Reporte PDF"}
          </Button>
        </div>
      </div>
    </div>
  );
}