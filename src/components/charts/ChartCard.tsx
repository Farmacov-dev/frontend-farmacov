// src/components/charts/ChartCard.tsx
// angel

import { useRef, useState } from 'react'
import { Download, FileText } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'

import ExportarReporteModal from '../composed/ExportarReporteModal/ExportarReporteModal'

type ChartType = 'bar' | 'line' | 'area' | 'pie' | 'radar'

type ChartItem = {
  label: string
  value: number
}

type ChartCardProps = {
  title?: string
  subtitle?: string
  data?: ChartItem[]
  type?: ChartType
  layout?: 'horizontal' | 'vertical' 
}

const defaultData: ChartItem[] = [
  { label: 'Dolor', value: 80 },
  { label: 'Fiebre', value: 55 },
  { label: 'Náusea', value: 40 },
  { label: 'Fatiga', value: 65 },
  { label: 'Mareo', value: 30 },
]

const ChartCard = ({
  title = 'Frecuencia de síntomas',
  subtitle = 'Distribución estimada por síntoma seleccionado',
  data,
  type = 'bar',
  layout = 'horizontal',
}: ChartCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const [isExporting, setIsExporting] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  const chartData = data && data.length > 0 
    ? (type === 'pie' || type === 'radar' ? data : data.slice(0, 5)) 
    : defaultData.slice(0, 5)

  const formattedData = chartData.map((item) => ({
    name: item.label,
    value: item.value,
  }))

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

      pdf.save(`${title.toLowerCase().replace(/\s+/g, '-')}-reporte.pdf`)
      setIsExportModalOpen(false)
    } catch (error) {
      console.error('Error al exportar PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const renderChart = () => {
    const tooltipStyle = {
      borderRadius: '10px',
      border: '1px solid #e2e8f0',
      fontSize: '13px',
      fontFamily: 'Inter, sans-serif' 
    };

    const legendStyle = { fontSize: '13px', fontFamily: 'Inter, sans-serif' };
    const xAxisTick = { fontSize: 13, fill: '#64748b', fontFamily: 'Inter, sans-serif' };
    const yAxisTick = { fontSize: 12, fill: '#94a3b8', fontFamily: 'Inter, sans-serif' };
    
    switch (type) {
      case 'pie':
        const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#6366F1', '#8B5CF6'];
        return (
          <PieChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={legendStyle} />
            <Pie data={formattedData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
              {formattedData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        )

      case 'line':
        return (
          <LineChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={xAxisTick} axisLine={false} tickLine={false} />
            <YAxis tick={yAxisTick} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        )

      case 'area':
        return (
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={xAxisTick} axisLine={false} tickLine={false} />
            <YAxis tick={yAxisTick} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="value" stroke="#F59E0B" fill="#FEF3C7" strokeWidth={2} />
          </AreaChart>
        )
      
      case 'radar':
        return (
          <RadarChart data={formattedData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <PolarGrid stroke="#DFE4EA" />
            <PolarAngleAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#64748b', fontFamily: 'Inter, sans-serif' }} 
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'Inter, sans-serif' }} 
              tickCount={5} 
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Radar dataKey="value" stroke="#527FF2" fill="#527FF2" fillOpacity={0.3} />
          </RadarChart>
        )

      case 'bar':
      default:
        const isVerticalLayout = layout === 'vertical';

        return (
          <BarChart 
            data={formattedData} 
            layout={layout} 
            margin={{ top: 10, right: 20, left: isVerticalLayout ? 60 : 0, bottom: 0 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={!isVerticalLayout} 
              horizontal={isVerticalLayout} 
              stroke="#e2e8f0" 
            />
            {isVerticalLayout ? (
              <>
                <XAxis type="number" tick={yAxisTick} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={xAxisTick} axisLine={false} tickLine={false} />
              </>
            ) : (
              <>
                <XAxis dataKey="name" tick={xAxisTick} axisLine={false} tickLine={false} />
                <YAxis tick={yAxisTick} axisLine={false} tickLine={false} />
              </>
            )}
            <Tooltip contentStyle={tooltipStyle} />
            <Bar 
              dataKey="value" 
              fill="#6366F1" 
              radius={isVerticalLayout ? [0, 6, 6, 0] : [6, 6, 0, 0]} 
              maxBarSize={isVerticalLayout ? 30 : 70} 
            />
          </BarChart>
        )
    }
  }

  return (
    <>
      <section 
        ref={cardRef} 
        role="region" 
        aria-label={`Gráfica de ${title}`}
        className="rounded-card border border-stroke bg-white p-6 shadow-sm relative group h-full flex flex-col"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-dark font-inter">{title}</h3>
            <p className="text-sm text-muted font-inter">{subtitle}</p>
          </div>

          <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={exportarPNG}
              disabled={isExporting}
              aria-label="Descargar gráfica como imagen PNG"
              title="Descargar PNG"
              className="p-1.5 rounded-lg border border-stroke bg-white text-muted hover:text-dark hover:bg-surface transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Download size={15} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setIsExportModalOpen(true)}
              disabled={isExporting}
              aria-label="Configurar y descargar gráfica como PDF"
              title="Descargar PDF"
              className="p-1.5 rounded-lg border border-stroke bg-white text-muted hover:text-dark hover:bg-surface transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <FileText size={15} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-surface p-5 flex-1" aria-hidden="true">
          {/* [REFACTOR]: Cambiamos height="100%" por un valor exacto (320) para evitar que la gráfica parpadee o se colapse durante las transiciones de carga en el backend */}
          <ResponsiveContainer width="100%" height={320}>
            {renderChart()}
          </ResponsiveContainer>
        </div>
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

export default ChartCard