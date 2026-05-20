// src/pages/Catalog.tsx
import { useState } from "react";
import VaccineCatalogTable from "../components/VaccineCatalogTable/VaccineCatalogTable";
import PageHeader from "../components/PageHeader/PageHeader";
import { useVacunas } from "../hooks/useVacunas";
import { useVacunaDetalle } from "../hooks/useVacunaDetalle";
import VaccineDetailModal from "../components/composed/VaccineDetailModal/VaccineDetailModal";
import type { Vaccine } from "../components/VaccineTableRow/VaccineTableRow";
import { useUltimaActualizacion } from "../hooks/useUltimaActualizacion";

const Catalog = () => {
  const ultimaActualizacion = useUltimaActualizacion()

  // estado del modal
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const { data: vacunas, isPending, isError } = useVacunas()
  const { data: vacunaDetalle, isPending: detallePending } = useVacunaDetalle(selectedId)

  const handleInfoClick = (vaccine: Vaccine) => {
    setSelectedId(vaccine.id)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedId(null)
  }

  return (
    <>
      <main className="flex flex-1 flex-col p-6 overflow-hidden">
        <div className="mb-6">
          <PageHeader
            title="Catalogo de vacunas"
            description="Explora el catalogo completo de vacunas disponibles, con información detallada sobre cada una."
            date={ultimaActualizacion}
          />
        </div>

        <section className="flex-1 rounded-xl bg-white p-4 shadow overflow-auto">
          {isPending && (
            <p className="text-gray-400 text-sm">Cargando vacunas...</p>
          )}
          {isError && (
            <p className="text-red-400 text-sm">Error cargando vacunas.</p>
          )}
          {!isPending && !isError && vacunas && (
            <VaccineCatalogTable
              vaccines={vacunas}
              onInfoClick={handleInfoClick}
            />
          )}
        </section>
      </main>

      <VaccineDetailModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        vacuna={vacunaDetalle ?? null}
        isPending={detallePending}
      />
    </>
  );
};

export default Catalog;