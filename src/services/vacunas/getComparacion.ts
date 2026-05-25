// src/services/vacunas/getComparacion.ts
import api from '../api'
import type { ComparisonRowProps, ComparisonRowStatus } from '../../components/ComparisonRow/ComparisonRow'

export interface ComparacionData {
  vaccineA: number
  vaccineB: number
  rows: ComparisonRowProps[]
}

interface VacunaBackend {
  nombre: string
  farmaceutica: string
  tipo: string
  costoUnitario: number
  temperatura: number
  tiempoAmbiente: number | null
  indiceSeguridad: number
  totalReportes: number
  efectosSecundarios: { descripcion: string; severidad: string }[]
  distribucionSeveridad: { leve: number; moderado: number; grave: number }
}

const compararNumeros = (
  numA: number,
  numB: number,
  mayorEsMejor: boolean
): [ComparisonRowStatus, ComparisonRowStatus] => {
  if (numA === numB) return ['neutral', 'neutral']
  const aEsMejor = mayorEsMejor ? numA > numB : numA < numB
  return aEsMejor ? ['better', 'worse'] : ['worse', 'better']
}

export const getComparacion = async (
  idA: number,
  idB: number
): Promise<ComparacionData> => {
  const [resA, resB] = await Promise.all([
    api.get<VacunaBackend>(`/vacunas/${idA}`),
    api.get<VacunaBackend>(`/vacunas/${idB}`),
  ])

  const a = resA.data
  const b = resB.data

  const [leftSeg, rightSeg] = compararNumeros(a.indiceSeguridad, b.indiceSeguridad, true)
  const [leftCosto, rightCosto] = compararNumeros(a.costoUnitario, b.costoUnitario, false)

  const rows: ComparisonRowProps[] = [
  {
    index: 1,
    label: 'Índice de Seguridad',
    left:  { value: `${a.indiceSeguridad.toFixed(1)}%`, status: leftSeg },
    right: { value: `${b.indiceSeguridad.toFixed(1)}%`, status: rightSeg },
  },
  {
    index: 2,
    label: 'Costo unitario',
    left:  { value: `$${a.costoUnitario.toFixed(2)}`, status: leftCosto },
    right: { value: `$${b.costoUnitario.toFixed(2)}`, status: rightCosto },
  },
  {
    index: 3,
    label: 'Temperatura',
    left:  { value: `${a.temperatura}°C`, status: 'neutral' },
    right: { value: `${b.temperatura}°C`, status: 'neutral' },
  },
  {
    index: 4,
    label: 'Tiempo ambiente',
    left:  { value: a.tiempoAmbiente ? `${a.tiempoAmbiente} hrs` : 'Refrigerado', status: 'neutral' },
    right: { value: b.tiempoAmbiente ? `${b.tiempoAmbiente} hrs` : 'Refrigerado', status: 'neutral' },
  },
  {
    index: 5,
    label: 'Total reportes',
    left:  { value: String(a.totalReportes), status: 'neutral' },
    right: { value: String(b.totalReportes), status: 'neutral' },
  },
  {
    index: 6,
    label: 'Reportes leves',
    left:  { value: String(a.distribucionSeveridad.leve), status: 'neutral' },
    right: { value: String(b.distribucionSeveridad.leve), status: 'neutral' },
  },
  {
    index: 7,
    label: 'Reportes moderados',
    left:  { value: String(a.distribucionSeveridad.moderado), status: 'neutral' },
    right: { value: String(b.distribucionSeveridad.moderado), status: 'neutral' },
  },
  {
    index: 8,
    label: 'Reportes graves',
    left:  { value: String(a.distribucionSeveridad.grave), status: 'neutral' },
    right: { value: String(b.distribucionSeveridad.grave), status: 'neutral' },
  },
  ]

  return { vaccineA: idA, vaccineB: idB, rows }
}