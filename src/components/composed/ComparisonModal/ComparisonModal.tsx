// src/components/composed/ComparisonModal/ComparisonModal.tsx
import { useState } from "react";
import ModalContainer from "../ModalContainer/ModalContainer";
import Button from "../../primary/Button/Button";
import SelectDropdown from "../../SelectDropdown/SelectDropdown";

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompare: (vaccineA: string, vaccineB: string) => void;
  vaccines: string[];
}

export default function ComparisonModal({
  isOpen,
  onClose,
  onCompare,
  vaccines,
}: ComparisonModalProps) {
  const [vaccineA, setVaccineA] = useState("");
  const [vaccineB, setVaccineB] = useState("");

  const bothSelected = vaccineA !== "" && vaccineB !== "";

  function handleCompare() {
    if (!bothSelected) return;
    onCompare(vaccineA, vaccineB);
  }

  function handleClose() {
    setVaccineA("");
    setVaccineB("");
    onClose();
  }

  return (
    <ModalContainer isOpen={isOpen} onClose={handleClose} showCloseButton={false}>
      <div className="flex flex-col justify-between w-[466px] h-[fit-content]">

        {/* parte superior — encabezado + selects */}
        <div className="flex flex-col w-full gap-[20px]">

          {/* encabezado */}
          <div className="flex flex-col items-start gap-[14px]">
            <p className="text-negro font-inter text-[20px] font-medium leading-normal">
              Comparación de Vacunas
            </p>
            <p className="font-inter text-[12px] font-normal leading-normal"
              style={{ color: "#5B5B5B" }}>
              Seleccione vacunas para comparar sus características
            </p>
          </div>

          {/* selects */}
          <div className="flex flex-col w-full gap-[11px]">
            <SelectDropdown
              options={vaccines}
              placeholder="Vacuna a comparar"
              value={vaccineA}
              onChange={(val) => setVaccineA(val)}
            />
            <SelectDropdown
              options={vaccines}
              placeholder="Vacuna a comparar"
              value={vaccineB}
              onChange={(val) => setVaccineB(val)}
            />
          </div>

        </div>

        {/* parte inferior para el boton */}
        <div className="flex justify-center w-full pt-[8px]">
          <Button
            variant="primary"
            disabled={!bothSelected}
            onClick={handleCompare}
            className="w-[175px] h-[55px]"
          >
            Crear Comparación
          </Button>
        </div>

      </div>
    </ModalContainer>
  );
}