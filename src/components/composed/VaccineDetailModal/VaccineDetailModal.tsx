// src/components/composed/VaccineDetailModal/VaccineDetailModal.tsx
import ModalContainer from "../ModalContainer/ModalContainer"
import EmptyState from "../../EmptyState/EmptyState"
import VaccineDetailHeader from "../../primary/VaccineDetailHeader/VaccineDetailHeader"
import VaccineDescription from "../../primary/VaccineDescription/VaccineDescription"
import MedicalSpecsSection from "../../primary/MedicalSpecsSection/MedicalSpecsSection"
import SideEffectsPanel from "../../primary/SideEffectsPanel/SideEffectsPanel"
import type { VacunaDetalle } from "../../../services/vacunas/getVacunaDetalle"

interface VaccineDetailModalProps {
  isOpen: boolean
  onClose: () => void
  vacuna: VacunaDetalle | null
  isPending?: boolean
}

export default function VaccineDetailModal({
  isOpen,
  onClose,
  vacuna,
  isPending = false,
}: VaccineDetailModalProps) {
  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[1045px] max-h-[95vh] overflow-y-auto bg-[#F3F3F3]"
    >
      {isPending && (
        <div className="flex min-h-[500px] w-full items-center justify-center">
          <p className="text-gray-400">Cargando información...</p>
        </div>
      )}

      {!isPending && !vacuna && (
        <div className="flex min-h-[500px] w-full items-center justify-center">
          <EmptyState title="No hay información para mostrar sobre esta vacuna" />
        </div>
      )}

      {!isPending && vacuna && (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[1fr_432px] xl:gap-[28px] w-full">

          {/* columna izquierda */}
          <div className="flex flex-col">
            <VaccineDetailHeader
              nombre={vacuna.nombre}
              farmaceutica={vacuna.farmaceutica}
            />
            <VaccineDescription
              descripcion={vacuna.descripcionGeneral}
            />
            <MedicalSpecsSection
              tipo={vacuna.tipo}
              temperatura={vacuna.temperatura}
              tiempoAmbiente={vacuna.tiempoAmbiente}
              costoUnitario={vacuna.costoUnitario}
            />
          </div>

          {/* columna derecha */}
          <div className="flex flex-col lg:items-end">
            <SideEffectsPanel
              efectos={vacuna.efectosSecundarios}
            />
          </div>

        </div>
      )}
    </ModalContainer>
  )
}