// src/components/charts/RadarPerfilRiesgo.tsx
// angel

import { useState, useRef } from 'react'
import { Download, FileText } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { usePerfilRiesgo } from '../../hooks/usePerfilRiesgo'
import { useSintomas } from '../../hooks/useAnalisis'
import { extraerVacunas } from '../../services/analisis/getSintomas'

// [REFACTOR]: Importamos ChartCard y el Modal
import ChartCard from './ChartCard'
import ExportarReporteModal from '../composed/ExportarReporteModal/ExportarReporteModal'

export default function RadarPerfilRiesgo() {
  const [selectedId, setSelectedId] = useState<number>(1)
  
  const cardRef = useRef<HTMLElement>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  const { data: todosSintomas } = useSintomas()
  const vacunasDisponibles = todosSintomas ? extraerVacunas(todosSintomas) : []

  const { data: perfil, isPending } = usePerfilRiesgo(selectedId)
  const vacunaSeleccionada = vacunasDisponibles.find(v => v.id === selectedId)

  // [REFACTOR]: Adaptamos los nombres de las propiedades a 'label' y 'value' para que ChartCard las entienda
  const radarData = perfil ? [
    {
      label: 'Costo (menor=mejor)',
      value: Math.max(0, 100 - (perfil.costoUnitario / 40) * 100),
    },
    {
      label: 'Seguridad (mayor=mejor)',
      value: perfil.indiceSeguridad,
    },
    {
      label: 'Síntomas graves (menor=mejor)',
      value: Math.max(0, 100 - perfil.porcentajeSintomasGraves * 5),
    },
  ] : []

  const exportarPNG = async () => {
    if (!cardRef.current) return
    setIsExporting(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#FFFFFF',
        scale: 2,
        logging: false,
        useCORS: true
      })
      const link = document.createElement('a')
      const nombreArchivo = vacunaSeleccionada?.nombre ?? 'perfil-riesgo'
      link.download = `${nombreArchivo.toLowerCase().replace(/\s+/g, '-')}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error al exportar PNG:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const exportarPDF = async (conclusiones: string) => {
    if (!cardRef.current) return
    setIsExporting(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#FFFFFF',
        scale: 2,
        logging: false,
        useCORS: true
      })
      const imgData = canvas.toDataURL('image/png')
      
      const pdf = new jsPDF('p', 'mm', 'a4')
      const margen = 15;
      const anchoImagen = 180;
      const altoImagen = (canvas.height * anchoImagen) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', margen, margen, anchoImagen, altoImagen)

      if (conclusiones.trim().length > 0) {
        const yPosTexto = margen + altoImagen + 15;

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(12);
        pdf.text('Conclusiones y Notas Ejecutivas:', margen, yPosTexto);

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        
        pdf.text(conclusiones, margen, yPosTexto + 8, {
          maxWidth: anchoImagen,
          align: 'justify'
        });
      }

      const nombreArchivo = vacunaSeleccionada?.nombre ?? 'perfil-riesgo'
      pdf.save(`${nombreArchivo.toLowerCase().replace(/\s+/g, '-')}-reporte.pdf`)
      setIsExportModalOpen(false)
    } catch (error) {
      console.error('Error al exportar PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <>
      <section 
        ref={cardRef}
        className="rounded-card border border-stroke bg-white p-6 shadow-sm group relative"
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="font-inter text-sm text-muted mb-1">
              Perfil de riesgo-valor
            </p>
            <h3 className="font-inter text-xl font-semibold text-dark">
              {vacunaSeleccionada?.nombre ?? 'Selecciona una vacuna'}
            </h3>
          </div>

          {!isPending && perfil && (
            <div className="flex gap-2 opacity-100 md:opacity-0 focus-within:opacity-100 group-hover:opacity-100 transition-opacity duration-200">
              <button
                type="button"
                onClick={exportarPNG}
                disabled={isExporting}
                aria-label="Descargar gráfica como PNG"
                title="Descargar PNG"
                className="p-1.5 rounded-lg border border-stroke bg-white text-muted hover:text-dark hover:bg-surface transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Download size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(true)}
                disabled={isExporting}
                aria-label="Configurar y descargar gráfica como PDF"
                title="Descargar PDF"
                className="p-1.5 rounded-lg border border-stroke bg-white text-muted hover:text-dark hover:bg-surface transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <FileText size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <select
          aria-label="Seleccionar vacuna para análisis de riesgo"
          className="w-full rounded-card border border-stroke bg-surface px-4 py-3 font-inter text-sm text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all mb-6 cursor-pointer"
          value={selectedId}
          onChange={(e) => setSelectedId(Number(e.target.value))}
        >
          {vacunasDisponibles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.nombre}
            </option>
          ))}
        </select>

        {isPending ? (
          <>
            <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-4 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-card border border-stroke bg-surface/60 p-4 h-[86px]">
                  <div className="h-3 w-16 bg-slate-200 rounded mb-2"></div>
                  <div className="h-6 w-20 bg-slate-300 rounded"></div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-pulse">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex flex-col h-[340px]">
                  <div className="h-4 w-40 bg-slate-200 rounded mb-4"></div>
                  <div className="flex-1 rounded-card bg-surface/60 border border-stroke border-dashed flex items-center justify-center">
                    <span className="text-xs font-medium text-slate-400">Analizando métricas...</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          perfil && (
            <>
              {/* KPIs Reales */}
              <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-4">
                <div className="rounded-card border border-stroke bg-surface p-4">
                  <p className="font-inter text-xs text-muted mb-1">Costo unitario</p>
                  <p className="font-inter text-2xl font-bold text-dark">${perfil.costoUnitario.toFixed(2)}</p>
                </div>
                <div className="rounded-card border border-stroke bg-surface p-4">
                  <p className="font-inter text-xs text-muted mb-1">Síntomas graves</p>
                  <p className="font-inter text-2xl font-bold text-dark">{perfil.porcentajeSintomasGraves}%</p>
                </div>
                <div className="rounded-card border border-stroke bg-surface p-4">
                  <p className="font-inter text-xs text-muted mb-1">Índice de seguridad</p>
                  <p className="font-inter text-2xl font-bold text-dark">{perfil.indiceSeguridad.toFixed(1)}%</p>
                </div>
                <div className="rounded-card border border-stroke bg-surface p-4">
                  <p className="font-inter text-xs text-muted mb-1">Total reportes</p>
                  <p className="font-inter text-2xl font-bold text-dark">{perfil.totalReportes.toLocaleString('es-MX')}</p>
                </div>
              </div>

              {/* [REFACTOR]: Implementación de ChartCard limpia */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <ChartCard
                  title="Radar de Valor"
                  subtitle="Métricas normalizadas (0-100)"
                  type="radar"
                  data={radarData}
                />

                {perfil.topSintomas.length === 0 ? (
                  <div role="status" aria-live="polite" className="flex items-center justify-center h-full min-h-[300px] border-2 border-dashed border-stroke rounded-card bg-surface">
                    <p className="font-inter text-sm text-muted">Sin síntomas registrados</p>
                  </div>
                ) : (
                  <ChartCard
                    title="Top 5 Síntomas"
                    subtitle="Frecuencia absoluta"
                    type="bar"
                    layout="vertical"
                    data={perfil.topSintomas}
                  />
                )}
              </div>
            </>
          )
        )}
      </section>

      <ExportarReporteModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={exportarPDF}
        isLoading={isExporting}
      />
    </>
  )
}