// src/components/charts/GroupedBarChart.tsx
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
  // Referencia para capturar el contenedor completo
  const cardRef = useRef<HTMLElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  // --- FUNCIÓN: EXPORTAR A PNG ---
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

  // --- FUNCIÓN: EXPORTAR A PDF ---
  const exportarPDF = async () => {
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
      
      // Formato Horizontal ('l') para que la gráfica ancha quepa perfecto
      const pdf = new jsPDF('l', 'mm', 'a4')
      pdf.addImage(imgData, 'PNG', 15, 15, 267, 130) // Ajuste proporcional para la gráfica agrupada
      pdf.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`)
    } catch (error) {
      console.error('Error al exportar PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <section ref={cardRef} className="rounded-card border border-stroke bg-white p-6 relative group">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="font-inter text-[18px] font-semibold text-dark">
            {title}
          </h3>
          <p className="font-inter text-[13px] text-muted mt-1">
            {subtitle}
          </p>
        </div>

        {/* CONTROLES DE EXPORTACIÓN (Aparecen en hover) */}
        {data.length > 0 && vacunasSeleccionadas.length > 0 && (
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={exportarPNG}
              disabled={isExporting}
              title="Descargar PNG"
              className="p-1.5 rounded-lg border border-stroke bg-white text-muted hover:text-dark hover:bg-surface transition-colors disabled:opacity-50"
            >
              <Download size={16} />
            </button>
            <button
              onClick={exportarPDF}
              disabled={isExporting}
              title="Descargar PDF"
              className="p-1.5 rounded-lg border border-stroke bg-white text-muted hover:text-dark hover:bg-surface transition-colors disabled:opacity-50"
            >
              <FileText size={16} />
            </button>
          </div>
        )}
      </div>

      {data.length === 0 || vacunasSeleccionadas.length === 0 ? (
        <div className="flex items-center justify-center h-[320px]">
          <p className="font-inter text-[14px] text-muted">
            Selecciona al menos una vacuna para ver la gráfica
          </p>
        </div>
      ) : (
        <div className="rounded-card bg-surface p-5">
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
                tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'Inter' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: 'Inter' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '6px',
                  border: '1px solid #DFE4EA',
                  fontSize: '13px',
                  fontFamily: 'Inter',
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: '13px',
                  fontFamily: 'Inter',
                  paddingTop: '16px',
                }}
              />
              {vacunasSeleccionadas.map((vacuna, index) => (
                <Bar
                  key={vacuna.id}
                  dataKey={vacuna.nombre}
                  fill={COLORES_VACUNA[index]}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  )
}