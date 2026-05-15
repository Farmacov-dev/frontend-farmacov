// src/components/charts/ChartCard.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type ChartItem = {
  label: string
  value: number
}

type ChartCardProps = {
  title?: string
  subtitle?: string
  data?: ChartItem[]
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
}: ChartCardProps) => {
  const chartData = (data && data.length > 0 ? data : defaultData).slice(0, 5)

  // Recharts necesita la key como 'name' para el eje X
  const formattedData = chartData.map((item) => ({
    name: item.label,
    value: item.value,
  }))

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="rounded-xl bg-slate-50 p-5">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 13, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                fontSize: '13px',
              }}
            />
            <Bar
              dataKey="value"
              fill="#6366F1"
              radius={[8, 8, 0, 0]}
              maxBarSize={70}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default ChartCard