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
      className="max-w-[480px] bg-[#F3F3F3]"
    >
      {isPending && (
        <div className="flex h-[200px] w-full items-center justify-center">
          <p className="text-gray-400">Cargando información...</p>
        </div>
      )}

      {!isPending && !vacuna && (
        <div className="flex h-[200px] w-full items-center justify-center">
          <EmptyState title="No hay información para mostrar sobre esta vacuna" />
        </div>
      )}

      {!isPending && vacuna && (
        <div className="w-[496px] h-[570px] bg-white rounded-lg p-4">
          <div className="grid grid-cols-2 gap-3 w-full h-full">

            <div className="flex flex-col gap-7 pr-2">
              <VaccineDetailHeader
                nombre={vacuna.nombre}
                farmaceutica={vacuna.farmaceutica}
              />
              <VaccineDescription
                descripcion={vacuna.descripcionGeneral}
                compact={true}
              />
              <MedicalSpecsSection
                tipo={vacuna.tipo}
                temperatura={vacuna.temperatura}
                tiempoAmbiente={vacuna.tiempoAmbiente}
                costoUnitario={vacuna.costoUnitario}
              />
            </div>

            <div className="flex flex-col">
              <SideEffectsPanel
              efectos={vacuna.efectosSecundarios}
              />
            </div>

          </div>
        </div>
      )}
    </ModalContainer>
  )
}