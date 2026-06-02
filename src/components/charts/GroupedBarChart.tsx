// src/components/charts/GroupedBarChart.tsx
// angel

import { useRef, useState } from 'react'
import { Download, FileText } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { SintomaAgrupado } from '../../services/analisis/getSintomas'
import { COLORES_VACUNA } from '../primary/VaccineCheckboxSelector/VaccineCheckboxSelector'

// [REFACTOR]: Importamos el modal
import ExportarReporteModal from '../composed/ExportarReporteModal/ExportarReporteModal'

interface GroupedBarChartProps {
  title?: string
  subtitle?: string
  data: SintomaAgrupado[]
  vacunasSeleccionadas: { id: number; nombre: string }[]
}

export default function GroupedBarChart({
  title = 'Distribución de síntomas',
  subtitle = 'Comparativa por vacuna seleccionada',
  data,
  vacunasSeleccionadas,
}: GroupedBarChartProps) {
  const cardRef = useRef<HTMLElement>(null)
  const [isExporting, setIsExporting] = useState(false)
  
  // [REFACTOR]: Estado para controlar el modal de conclusiones
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

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
      link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error al exportar PNG:', error)
    } finally {
      setIsExporting(false)
    }
  }

  // [REFACTOR]: Recibe las conclusiones e inyecta el texto usando matemáticas responsivas
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
      
      // Creamos PDF vertical ('p' = portrait)
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const margen = 15;
      const anchoImagen = 180; // 210mm (A4) - 30mm de márgenes
      const altoImagen = (canvas.height * anchoImagen) / canvas.width; // Mantiene la proporción visual
      
      // Pegamos la gráfica
      pdf.addImage(imgData, 'PNG', margen, margen, anchoImagen, altoImagen) 

      // Inyectamos las conclusiones de la Directora
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

      pdf.save(`${title.toLowerCase().replace(/\s+/g, '-')}-reporte.pdf`)
      setIsExportModalOpen(false) // Cerramos modal al terminar
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
        role="region" 
        aria-label={`Gráfica comparativa: ${title}`}
        className="rounded-card border border-stroke bg-white p-6 relative group"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="font-inter text-[18px] font-semibold text-dark">
              {title}
            </h3>
            <p className="font-inter text-[13px] text-muted mt-1">
              {subtitle}
            </p>
          </div>

          {data.length > 0 && vacunasSeleccionadas.length > 0 && (
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
              
              {/* [REFACTOR]: Abrimos el modal en lugar de descargar directo */}
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

        {data.length === 0 || vacunasSeleccionadas.length === 0 ? (
          <div role="status" aria-live="polite" className="flex items-center justify-center h-[320px] bg-surface rounded-card border-2 border-dashed border-stroke">
            <p className="font-inter text-[14px] text-muted">
              Selecciona al menos una vacuna para ver la gráfica
            </p>
          </div>
        ) : (
          <div className="rounded-card bg-surface p-5" aria-hidden="true">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#DFE4EA"
                />
                <XAxis
                  dataKey="sintoma"
                  tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'Inter, sans-serif' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '6px',
                    border: '1px solid #DFE4EA',
                    fontSize: '13px',
                    fontFamily: 'Inter, sans-serif', 
                  }}
                />
                <Legend
                  wrapperStyle={{
                    fontSize: '13px',
                    fontFamily: 'Inter, sans-serif', 
                    paddingTop: '16px',
                  }}
                />
                {/* [REFACTOR]: Parche de colores estables por ID */}
                {vacunasSeleccionadas.map((vacuna) => {
                  const colorEstable = COLORES_VACUNA[Math.abs(vacuna.id - 1) % COLORES_VACUNA.length];
                  
                  return (
                    <Bar
                      key={vacuna.id}
                      dataKey={vacuna.nombre}
                      fill={colorEstable} 
                      radius={[4, 4, 0, 0]}
                      maxBarSize={40}
                      animationDuration={1500} // Transición suave al filtrar
                    />
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* [REFACTOR]: Modal inyectado fuera del contenedor de la gráfica */}
      <ExportarReporteModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={exportarPDF}
        isLoading={isExporting}
      />
    </>
  )
}