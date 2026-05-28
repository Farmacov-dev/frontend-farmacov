// src/pages/Catalog.tsx
// angel

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

// [REFACTOR]: Importamos el modal
import ExportarReporteModal from "../components/composed/ExportarReporteModal/ExportarReporteModal";

const Catalog = () => {
  const ultimaActualizacion = useUltimaActualizacion()

  // Estados del modal de detalles
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Referencia y estado para la exportación
  const tableRef = useRef<HTMLElement>(null)
  const [isExporting, setIsExporting] = useState(false)
  
  // [REFACTOR]: Nuevo estado para el modal de exportación PDF
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

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
  // [REFACTOR]: Ahora recibe las conclusiones desde el Modal
  const exportarPDF = async (conclusiones: string) => {
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
      
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth() - 30 
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      
      // Título superior
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Catálogo Oficial de Vacunas - Farmacov", 15, 15)
      
      // Captura de la tabla
      pdf.addImage(imgData, 'PNG', 15, 25, pdfWidth, pdfHeight)

      // [REFACTOR]: Inyección de las conclusiones en la parte inferior
      if (conclusiones.trim().length > 0) {
        // Calculamos la posición Y basándonos en la altura de la imagen + 25 (el offset inicial) + 15 de margen
        const yPosTexto = 25 + pdfHeight + 15;

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(12);
        pdf.text('Notas Administrativas:', 15, yPosTexto);

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        
        pdf.text(conclusiones, 15, yPosTexto + 8, {
          maxWidth: pdfWidth,
          align: 'justify'
        });
      }

      pdf.save('catalogo-vacunas-reporte.pdf')
      setIsExportModalOpen(false)
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
            title="Catálogo de vacunas"
            description="Explora el catálogo completo de vacunas disponibles, con información detallada sobre cada una."
            date={ultimaActualizacion}
          />
          
          <div className="flex gap-3">
            <button
              onClick={exportarPNG}
              disabled={isExporting || isPending || isError}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50"
            >
              <Download size={16} />
              PNG
            </button>
            
            {/* [REFACTOR]: Abre el modal en lugar de descargar directo */}
            <button
              onClick={() => setIsExportModalOpen(true)}
              disabled={isExporting || isPending || isError}
              className="flex items-center gap-2 rounded-xl bg-[#5B84E9] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4a73d8] disabled:opacity-50"
            >
              <FileText size={16} />
              PDF
            </button>
          </div>
        </div>

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

      {/* [REFACTOR]: Componente del modal inyectado */}
      <ExportarReporteModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={exportarPDF}
        isLoading={isExporting}
      />
    </>
  );
};

export default Catalog;