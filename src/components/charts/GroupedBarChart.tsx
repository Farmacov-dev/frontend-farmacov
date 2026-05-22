// src/components/charts/GroupedBarChart.tsx
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
  return (
    <section className="rounded-card border border-stroke bg-white p-6">
      <div className="mb-6">
        <h3 className="font-inter text-[18px] font-semibold text-dark">
          {title}
        </h3>
        <p className="font-inter text-[13px] text-muted mt-1">
          {subtitle}
        </p>
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