// src/pages/Catalog.tsx
import { useState, useRef } from "react";
import { Download, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import VaccineCatalogTable from "../components/VaccineCatalogTable/VaccineCatalogTable";
import PageHeader from "../components/PageHeader/PageHeader";
import { useVacunas } from "../hooks/useVacunas";
import { useVacunaDetalle } from "../hooks/useVacunaDetalle";
import VaccineDetailModal from "../components/composed/VaccineDetailModal/VaccineDetailModal";
import type { Vaccine } from "../components/VaccineTableRow/VaccineTableRow";
import { useUltimaActualizacion } from "../hooks/useUltimaActualizacion";

const Catalog = () => {
  const ultimaActualizacion = useUltimaActualizacion()

  // Estados del modal
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Referencia y estado para la exportación
  const tableRef = useRef<HTMLElement>(null)
  const [isExporting, setIsExporting] = useState(false)

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

  // --- FUNCIÓN: EXPORTAR A PNG ---
  const exportarPNG = async () => {
    if (!tableRef.current) return
    setIsExporting(true)
    try {
      const canvas = await html2canvas(tableRef.current, {
        backgroundColor: '#FFFFFF',
        scale: 2,
        logging: false,
        useCORS: true
      })
      const link = document.createElement('a')
      link.download = 'catalogo-vacunas.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error al exportar PNG:', error)
    } finally {
      setIsExporting(false)
    }
  }

  // --- FUNCIÓN: EXPORTAR A PDF ---
  const exportarPDF = async () => {
    if (!tableRef.current) return
    setIsExporting(true)
    try {
      const canvas = await html2canvas(tableRef.current, {
        backgroundColor: '#FFFFFF',
        scale: 2,
        logging: false,
        useCORS: true
      })
      const imgData = canvas.toDataURL('image/png')
      
      // Orientación vertical ('p'), tamaño A4
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      // Calculamos la proporción para que la tabla no se deforme
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth() - 30 // 15mm de margen por lado
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      
      // Agregamos un título al PDF antes de pegar la imagen
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Catálogo Oficial de Vacunas - Farmacov", 15, 15)
      
      // Pegamos la captura de la tabla debajo del título
      pdf.addImage(imgData, 'PNG', 15, 25, pdfWidth, pdfHeight)
      pdf.save('catalogo-vacunas.pdf')
    } catch (error) {
      console.error('Error al exportar PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <>
      <main className="flex flex-1 flex-col p-6 overflow-hidden">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <PageHeader
            title="Catalogo de vacunas"
            description="Explora el catalogo completo de vacunas disponibles, con información detallada sobre cada una."
            date={ultimaActualizacion}
          />
          
          {/* BOTONES DE EXPORTACIÓN */}
          <div className="flex gap-3">
            <button
              onClick={exportarPNG}
              disabled={isExporting || isPending || isError}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50"
            >
              <Download size={16} />
              PNG
            </button>
            <button
              onClick={exportarPDF}
              disabled={isExporting || isPending || isError}
              className="flex items-center gap-2 rounded-xl bg-[#5B84E9] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4a73d8] disabled:opacity-50"
            >
              <FileText size={16} />
              PDF
            </button>
          </div>
        </div>

        {/* CONTENEDOR DE LA TABLA (Aquí atamos la referencia para tomar la foto) */}
        <section ref={tableRef} className="flex-1 rounded-xl bg-white p-4 shadow overflow-auto">
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