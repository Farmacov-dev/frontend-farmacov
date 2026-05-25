// src/components/charts/ChartCard.tsx
import { useRef, useState } from 'react'
import { Download, FileText } from 'lucide-react' // Íconos elegantes para las descargas
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
} from 'recharts'

type ChartType = 'bar' | 'line' | 'area' | 'pie'

type ChartItem = {
  label: string
  value: number
}

type ChartCardProps = {
  title?: string
  subtitle?: string
  data?: ChartItem[]
  type?: ChartType
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
}: ChartCardProps) => {
  // Referencia para capturar ESTA tarjeta específica con html2canvas
  const cardRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const chartData = data && data.length > 0 
    ? (type === 'pie' ? data : data.slice(0, 5)) 
    : defaultData.slice(0, 5)

  const formattedData = chartData.map((item) => ({
    name: item.label,
    value: item.value,
  }))

  // --- FUNCIÓN: EXPORTAR A PNG ---
  const exportarPNG = async () => {
    if (!cardRef.current) return
    setIsExporting(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#FFFFFF',
        scale: 2, // Duplica la resolución para que no se pixelee
        logging: false,
        useCORS: true // Por si hay recursos externos
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
      
      // Creamos PDF en formato Horizontal (Landscape 'l') para que las gráficas se acomoden mejor
      const pdf = new jsPDF('l', 'mm', 'a4')
      
      // Ajustamos la imagen proporcionalmente al tamaño de una hoja A4 Horizontal (297mm x 210mm)
      pdf.addImage(imgData, 'PNG', 15, 15, 267, 180)
      pdf.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`)
    } catch (error) {
      console.error('Error al exportar PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const renderChart = () => {
    switch (type) {
      case 'pie':
        const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#6366F1', '#8B5CF6'];
        return (
          <PieChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
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
            <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
            <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        )

      case 'area':
        return (
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
            <Area type="monotone" dataKey="value" stroke="#F59E0B" fill="#FEF3C7" strokeWidth={2} />
          </AreaChart>
        )

      case 'bar':
      default:
        return (
          <BarChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
            <Bar dataKey="value" fill="#6366F1" radius={[8, 8, 0, 0]} maxBarSize={70} />
          </BarChart>
        )
    }
  }

  return (
    // Atamos la referencia al contenedor de la sección completa
    <section ref={cardRef} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm relative group">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>

        {/* BOTONES DE EXPORTACIÓN (Ocultos por defecto, aparecen en hover para mantener limpio el UI) */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={exportarPNG}
            disabled={isExporting}
            title="Descargar PNG"
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <Download size={15} />
          </button>
          <button
            onClick={exportarPDF}
            disabled={isExporting}
            title="Descargar PDF"
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <FileText size={15} />
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-slate-50 p-5">
        <ResponsiveContainer width="100%" height={320}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default ChartCard