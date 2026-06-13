// src/components/composed/ComparisonModal/ComparisonModal.tsx
// angel

import { useState, useMemo } from "react";
import ModalContainer from "../ModalContainer/ModalContainer";
import Button from "../../primary/Button/Button";
import SelectDropdown from "../../SelectDropdown/SelectDropdown";

interface VacunaOption {
  id: number
  nombre: string
}

interface ComparisonModalProps {
  isOpen: boolean
  onClose: () => void
  onCompare: (idA: number, idB: number, nombreA: string, nombreB: string) => void
  vaccines: VacunaOption[]
}

export default function ComparisonModal({
  isOpen,
  onClose,
  onCompare,
  vaccines,
}: ComparisonModalProps) {
  const [vaccineA, setVaccineA] = useState<VacunaOption | null>(null)
  const [vaccineB, setVaccineB] = useState<VacunaOption | null>(null)

  const bothSelected = vaccineA !== null && vaccineB !== null

  // refactor: useMemo y filtrado mejorado.
  // se evita que el arreglo se recalcule en cada render y ocultamos la vacuna  ya seleccionada
  const optionsA = useMemo(() => 
    vaccines.filter(v => v.id !== vaccineB?.id).map(v => v.nombre),
  [vaccines, vaccineB])

  const optionsB = useMemo(() => 
    vaccines.filter(v => v.id !== vaccineA?.id).map(v => v.nombre),
  [vaccines, vaccineA])

  function handleCompare() {
    if (!bothSelected) return
    onCompare(vaccineA.id, vaccineB.id, vaccineA.nombre, vaccineB.nombre)
  }

  function handleClose() {
    setVaccineA(null)
    setVaccineB(null)
    onClose()
  }

  return (
    <ModalContainer isOpen={isOpen} onClose={handleClose} showCloseButton={false}>
      <div className="flex flex-col justify-between w-full max-w-[466px] h-fit">
        <div className="flex flex-col w-full gap-[20px]">
          <div className="flex flex-col items-start gap-[14px]">
            <p className="text-dark font-inter text-[20px] font-medium leading-normal">
              Comparación de Vacunas
            </p>
            <p className="text-muted font-inter text-[12px] font-normal leading-normal">
              Seleccione vacunas para comparar sus características
            </p>
          </div>

          <div className="flex flex-col w-full gap-[11px]">
            <SelectDropdown
              options={optionsA}
              placeholder="Primera vacuna a comparar"
              value={vaccineA?.nombre ?? ''}
              onChange={(nombre) => {
                const found = vaccines.find(v => v.nombre === nombre)
                if (found) setVaccineA(found)
              }}
            />
            <SelectDropdown
              options={optionsB}
              placeholder="Segunda vacuna a comparar"
              value={vaccineB?.nombre ?? ''}
              onChange={(nombre) => {
                const found = vaccines.find(v => v.nombre === nombre)
                if (found) setVaccineB(found)
              }}
            />
          </div>
        </div>

        <div className="flex justify-center w-full pt-[8px] mt-6">
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
  )
}