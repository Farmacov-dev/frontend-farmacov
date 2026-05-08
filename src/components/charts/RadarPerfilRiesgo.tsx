// src/components/charts/RadarPerfilRiesgo.tsx
import { useState } from 'react'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { useVacunas } from '../../hooks/useVacunas'
import { usePerfilRiesgo } from '../../hooks/usePerfilRiesgo'

export default function RadarPerfilRiesgo() {
  const [selectedId, setSelectedId] = useState<number>(1)

  const { data: vacunas } = useVacunas()
  const { data: perfil, isPending } = usePerfilRiesgo(selectedId)

  // normalizar valores para el radar a escala 0-100
  const radarData = perfil ? [
    {
      metrica: 'Costo (menor=mejor)',
      // invertir costo — más barato = mejor puntuación
      valor: Math.max(0, 100 - (perfil.costoUnitario / 40) * 100),
    },
    {
      metrica: 'Efectividad (mayor=mejor)',
      valor: perfil.efectividad,
    },
    {
      metrica: 'Síntomas graves (menor=mejor)',
      // invertir porcentaje — menos graves = mejor puntuación
      valor: Math.max(0, 100 - perfil.porcentajeSintomasGraves * 5),
    },
  ] : []

  const vacunaSeleccionada = vacunas?.find(v => v.id === selectedId)

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* header */}
      <div className="mb-6">
        <p className="text-sm text-slate-500 mb-1">Perfil de riesgo-valor</p>
        <h3 className="text-xl font-semibold text-slate-800">
          {vacunaSeleccionada?.name ?? 'Selecciona una vacuna'}
        </h3>
      </div>

      {/* dropdown */}
      <select
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary mb-6"
        value={selectedId}
        onChange={(e) => setSelectedId(Number(e.target.value))}
      >
        {vacunas?.map((v) => (
          <option key={v.id} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>

      {isPending && (
        <p className="text-gray-400 text-sm text-center py-8">Cargando perfil...</p>
      )}

      {!isPending && perfil && (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs text-slate-500 mb-1">Costo unitario</p>
              <p className="text-2xl font-bold text-slate-800">${perfil.costoUnitario.toFixed(2)}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs text-slate-500 mb-1">Síntomas graves</p>
              <p className="text-2xl font-bold text-slate-800">{perfil.porcentajeSintomasGraves}%</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs text-slate-500 mb-1">Efectividad</p>
              <p className="text-2xl font-bold text-slate-800">{perfil.efectividad}%</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs text-slate-500 mb-1">Total reportes</p>
              <p className="text-2xl font-bold text-slate-800">{perfil.totalReportes.toLocaleString('es-MX')}</p>
            </div>
          </div>

          {/* graficas */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

            {/* radar */}
            <div>
              <p className="text-sm font-medium text-slate-600 mb-4">
                Radar · perfil de riesgo-valor
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="metrica"
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    tickCount={5}
                  />
                  <Radar
                    dataKey="valor"
                    stroke="#6366F1"
                    fill="#6366F1"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* barras horizontales */}
            <div>
              <p className="text-sm font-medium text-slate-600 mb-4">
                Top 5 síntomas reportados
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={perfil.topSintomas}
                  layout="vertical"
                  margin={{ top: 0, right: 20, left: 80, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="label"
                    tick={{ fontSize: 12, fill: '#64748b' }}
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
                    radius={[0, 6, 6, 0]}
                    maxBarSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </>
      )}
    </section>
  )
}