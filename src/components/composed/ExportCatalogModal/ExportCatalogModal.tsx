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
  "Leyenda de Eficacia",
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
  const [checked, setChecked]         = useState<string[]>([]); // deseleccionados por default

  function toggleItem(item: string) {
    setChecked((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }

  function handleExport() {
    onExport({ format, orientation, content: checked });
    onClose();
  }

  const cardBase     = "flex flex-col items-center justify-center gap-[4px] cursor-pointer transition-all duration-150 rounded-[9px] flex-1";
  const cardSelected = "border border-primary bg-[#F1F7FF]";
  const cardDefault  = "border border-[#E5E7EB] bg-white";

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} className="w-[496px]">
      <div className="flex flex-col w-full gap-[24px]">

        {/*  titlo del modal */}
        <div className="flex items-center gap-[10px]">
          <h2 className="font-inter text-[28px] font-medium leading-normal text-black">
            Exportar Catálogo a PDF
          </h2>
        </div>

        {/* subtitulo del modal */}
        <p className="font-inter text-[14px] font-normal leading-[22px]"
          style={{ color: "#5B5B5B" }}>
          Configura las opciones de exportación para generar tu documento PDF personalizado
        </p>

        {/* divider */}
        <div className="w-full h-[1px] bg-stroke" />

        {/* seccion de seleccion de formato de pagina */}
        <div className="flex flex-col gap-[12px]">
          <p className="text-dark font-inter text-[18px] font-semibold leading-[26px] text-left">
            Formato de Página
          </p>
          {/* cards para seleccion */}
          <div className="flex gap-[12px] w-full">
            {(["A4", "Letter"] as PageFormat[]).map((f) => (
              <div
                key={f}
                onClick={() => setFormat(f)}
                className={`${cardBase} ${format === f ? cardSelected : cardDefault} h-[98px]`}
              >
                {format === f ? (
                  <span className="text-primary font-inter text-[13px] font-medium">✓ {f}</span>
                ) : (
                  <span className="text-negro font-inter text-[14px] font-medium">{f}</span>
                )}
                <span className="font-inter text-[12px] text-muted">
                  {f === "A4" ? "210 x 297 mm" : "8.5 x 11 in"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* opciones de orientacion  */}
        <div className="flex flex-col gap-[12px]">
          <p className="text-dark font-inter text-[18px] font-semibold leading-[26px] text-left">
            Orientación
          </p>
          <div className="flex gap-[12px] w-full">
            {(["Vertical", "Horizontal"] as PageOrientation[]).map((o) => (
              <div
                key={o}
                onClick={() => setOrientation(o)}
                className={`${cardBase} ${orientation === o ? cardSelected : cardDefault} h-[98px]`}
              >
                {orientation === o ? (
                  <span className="text-primary font-inter text-[14px] font-medium">✓ {o}</span>
                ) : (
                  <span className="text-negro font-inter text-[14px] font-medium">{o}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* checkbox de contenido para incluir */}
        <div className="flex flex-col gap-[12px]">
          <p className="text-dark font-inter text-[18px] font-semibold leading-[26px] text-left">
            Contenido a Incluir
          </p>
          <div className="flex flex-col gap-[8px] p-[16px] rounded-[9px] bg-[#FFFAFA] border border-[#E5E7EB]">
            {CHECKLIST_ITEMS.map((item) => (
              <label
                key={item}
                className="flex items-center gap-[10px] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked.includes(item)}
                  onChange={() => toggleItem(item)}
                  className="w-[16px] h-[16px] accent-primary cursor-pointer flex-shrink-0"
                />
                <span className="font-inter text-[14px] font-normal leading-[22px] text-negro">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* boton */}
        <div className="flex justify-center w-full">
          <Button variant="primary" icon={exportarSvg} onClick={handleExport}>
            Generar PDF
          </Button>
        </div>

      </div>
    </ModalContainer>
  );
}