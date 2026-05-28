// src/components/composed/ExportCatalogModal/ExportCatalogModal.tsx
// angel

import { useState } from "react";
import ModalContainer from "../ModalContainer/ModalContainer";
import Button from "../../primary/Button/Button";
import exportarSvg from "../../../assets/icons/exportar.svg";

type PageFormat      = "A4" | "Letter";
type PageOrientation = "Vertical" | "Horizontal";

const CHECKLIST_ITEMS = [
  "Resumen Estadístico",
  "Tabla de Vacunas",
  "Leyenda de Seguridad",
];

interface ExportCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (config: {
    format: PageFormat;
    orientation: PageOrientation;
    content: string[];
  }) => void;
}

export default function ExportCatalogModal({
  isOpen,
  onClose,
  onExport,
}: ExportCatalogModalProps) {
  const [format, setFormat]           = useState<PageFormat>("A4");
  const [orientation, setOrientation] = useState<PageOrientation>("Vertical");
  const [checked, setChecked]         = useState<string[]>([]);

  function toggleItem(item: string) {
    setChecked((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }

  function handleExport() {
    onExport({ format, orientation, content: checked });
    onClose();
  }


  const cardBase = "flex flex-col items-center justify-center gap-[4px] cursor-pointer transition-all duration-150 rounded-[9px] flex-1 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1";
    const cardSelected = "border-2 border-primary bg-primary/10";
  const cardDefault  = "border border-stroke bg-white hover:bg-surface";

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col w-full max-w-[496px] gap-[24px]">

        {/* Título del modal */}
        <div className="flex items-center gap-[10px]">
          <h2 className="font-inter text-[28px] font-medium leading-normal text-dark">
            Exportar Catálogo a PDF
          </h2>
        </div>

        {/* Subtítulo del modal */}
        <p className="font-inter text-[14px] font-normal leading-[22px] text-muted">
          Configura las opciones de exportación para generar tu documento PDF personalizado
        </p>

        {/* Divider */}
        <div className="w-full h-[1px] bg-stroke" />

        {/* Selección de Formato de Página */}
        <div className="flex flex-col gap-[12px]">
          <p className="text-dark font-inter text-[18px] font-semibold leading-[26px] text-left">
            Formato de Página
          </p>
          <div role="radiogroup" aria-label="Formato de página" className="flex gap-[12px] w-full">
            {(["A4", "Letter"] as PageFormat[]).map((f) => (
              <button
                key={f}
                type="button"
                role="radio"
                aria-checked={format === f}
                onClick={() => setFormat(f)}
                className={`${cardBase} ${format === f ? cardSelected : cardDefault} h-[98px]`}
              >
                {format === f ? (
                  <span className="text-primary font-inter text-[13px] font-medium">✓ {f}</span>
                ) : (
                  <span className="text-dark font-inter text-[14px] font-medium">{f}</span>
                )}
                <span className="font-inter text-[12px] text-muted">
                  {f === "A4" ? "210 x 297 mm" : "8.5 x 11 in"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selección de Orientación */}
        <div className="flex flex-col gap-[12px]">
          <p className="text-dark font-inter text-[18px] font-semibold leading-[26px] text-left">
            Orientación
          </p>
          <div role="radiogroup" aria-label="Orientación de página" className="flex gap-[12px] w-full">
            {(["Vertical", "Horizontal"] as PageOrientation[]).map((o) => (
              <button
                key={o}
                type="button"
                role="radio"
                aria-checked={orientation === o}
                onClick={() => setOrientation(o)}
                className={`${cardBase} ${orientation === o ? cardSelected : cardDefault} h-[98px]`}
              >
                {orientation === o ? (
                  <span className="text-primary font-inter text-[14px] font-medium">✓ {o}</span>
                ) : (
                  <span className="text-dark font-inter text-[14px] font-medium">{o}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Checkbox de contenido para incluir */}
        <div className="flex flex-col gap-[12px]">
          <p className="text-dark font-inter text-[18px] font-semibold leading-[26px] text-left">
            Contenido a Incluir
          </p>
          <div className="flex flex-col gap-[8px] p-[16px] rounded-[9px] bg-surface border border-stroke">
            {CHECKLIST_ITEMS.map((item) => (
              <label
                key={item}
                className="flex items-center gap-[10px] cursor-pointer select-none group"
              >
                <input
                  type="checkbox"
                  checked={checked.includes(item)}
                  onChange={() => toggleItem(item)}
                  className="w-[16px] h-[16px] accent-primary cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                />
                <span className="font-inter text-[14px] font-normal leading-[22px] text-dark group-hover:text-primary transition-colors">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Botón */}
        <div className="flex justify-center w-full mt-2">
          <Button variant="primary" icon={exportarSvg} onClick={handleExport}>
            Generar PDF
          </Button>
        </div>

      </div>
    </ModalContainer>
  );
}