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
import { usePerfilRiesgo } from '../../hooks/usePerfilRiesgo'
import { useSintomas } from '../../hooks/useAnalisis'
import { extraerVacunas } from '../../services/analisis/getSintomas'

export default function RadarPerfilRiesgo() {
  const [selectedId, setSelectedId] = useState<number>(1)

  // usamos el endpoint de resumen-sintomas para obtener vacunas dinamicamente
  const { data: todosSintomas } = useSintomas()
  const vacunasDisponibles = todosSintomas ? extraerVacunas(todosSintomas) : []

  const { data: perfil, isPending } = usePerfilRiesgo(selectedId)

  const vacunaSeleccionada = vacunasDisponibles.find(v => v.id === selectedId)

  const radarData = perfil ? [
    {
      metrica: 'Costo (menor=mejor)',
      valor: Math.max(0, 100 - (perfil.costoUnitario / 40) * 100),
    },
    {
      metrica: 'Seguridad (mayor=mejor)',
      valor: perfil.indiceSeguridad,
    },
    {
      metrica: 'Síntomas graves (menor=mejor)',
      valor: Math.max(0, 100 - perfil.porcentajeSintomasGraves * 5),
    },
  ] : []

  return (
    <section className="rounded-card border border-stroke bg-white p-6">

      {/* header */}
      <div className="mb-4">
        <p className="font-inter text-[13px] text-muted mb-1">
          Perfil de riesgo-valor
        </p>
        <h3 className="font-inter text-[20px] font-semibold text-dark">
          {vacunaSeleccionada?.nombre ?? 'Selecciona una vacuna'}
        </h3>
      </div>

      {/* dropdown dinámico */}
      <select
        className="w-full rounded-card border border-stroke bg-white px-4 py-3 font-inter text-[14px] text-dark outline-none mb-6"
        value={selectedId}
        onChange={(e) => setSelectedId(Number(e.target.value))}
      >
        {vacunasDisponibles.map((v) => (
          <option key={v.id} value={v.id}>
            {v.nombre}
          </option>
        ))}
      </select>

      {isPending && (
        <p className="font-inter text-[13px] text-muted text-center py-8">
          Cargando perfil...
        </p>
      )}

      {!isPending && perfil && (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-4">
            <div className="rounded-card border border-stroke bg-surface p-4">
              <p className="font-inter text-[12px] text-muted mb-1">
                Costo unitario
              </p>
              <p className="font-inter text-[22px] font-bold text-dark">
                ${perfil.costoUnitario.toFixed(2)}
              </p>
            </div>
            <div className="rounded-card border border-stroke bg-surface p-4">
              <p className="font-inter text-[12px] text-muted mb-1">
                Síntomas graves
              </p>
              <p className="font-inter text-[22px] font-bold text-dark">
                {perfil.porcentajeSintomasGraves}%
              </p>
            </div>
            <div className="rounded-card border border-stroke bg-surface p-4">
              <p className="font-inter text-[12px] text-muted mb-1">
                Índice de seguridad
              </p>
              <p className="font-inter text-[22px] font-bold text-dark">
                {perfil.indiceSeguridad.toFixed(1)}%
              </p>
            </div>
            <div className="rounded-card border border-stroke bg-surface p-4">
              <p className="font-inter text-[12px] text-muted mb-1">
                Total reportes
              </p>
              <p className="font-inter text-[22px] font-bold text-dark">
                {perfil.totalReportes.toLocaleString('es-MX')}
              </p>
            </div>
          </div>

          {/* graficas */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

            {/* radar */}
            <div>
              <p className="font-inter text-[13px] font-medium text-dark mb-4">
                Radar · perfil de riesgo-valor
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#DFE4EA" />
                  <PolarAngleAxis
                    dataKey="metrica"
                    tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'Inter' }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: '#9CA3AF', fontFamily: 'Inter' }}
                    tickCount={5}
                  />
                  <Radar
                    dataKey="valor"
                    stroke="#527FF2"
                    fill="#527FF2"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* barras horizontales */}
            <div>
              <p className="font-inter text-[13px] font-medium text-dark mb-4">
                Top 5 síntomas reportados
              </p>
              {perfil.topSintomas.length === 0 ? (
                <div className="flex items-center justify-center h-[300px]">
                  <p className="font-inter text-[13px] text-muted">
                    Sin síntomas registrados
                  </p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={perfil.topSintomas}
                    layout="vertical"
                    margin={{ top: 0, right: 20, left: 80, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="#DFE4EA"
                    />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: 'Inter' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="label"
                      tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'Inter' }}
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
                    <Bar
                      dataKey="value"
                      fill="#527FF2"
                      radius={[0, 4, 4, 0]}
                      maxBarSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

          </div>
        </>
      )}
    </section>
  )
}