// src/services/vacunas/getComparacion.ts
import api from '../api'
import type { ComparisonRowProps, ComparisonRowStatus } from '../../components/ComparisonRow/ComparisonRow'

export interface ComparacionData {
  vaccineA: string
  vaccineB: string
  rows: ComparisonRowProps[]
}

interface VacunaData {
  efectividad: number
  costo: number
  costoMayoreo: number
  temperatura: number
  longevidad: string
  tipo: string
}

const DATOS_VACUNAS: Record<string, VacunaData> = {
  Pfizer: {
    efectividad: 95,
    costo: 19.50,
    costoMayoreo: 15.80,
    temperatura: -70,
    longevidad: '2 horas (ambiente)',
    tipo: 'ARNm',
  },
  Moderna: {
    efectividad: 94,
    costo: 25.00,
    costoMayoreo: 20.50,
    temperatura: -20,
    longevidad: '12 horas (ambiente)',
    tipo: 'ARNm',
  },
  AstraZeneca: {
    efectividad: 74,
    costo: 4.00,
    costoMayoreo: 2.80,
    temperatura: 2,
    longevidad: '6 meses (refrigerado)',
    tipo: 'Vector viral',
  },
  'Johnson & Johnson': {
    efectividad: 66,
    costo: 10.00,
    costoMayoreo: 8.50,
    temperatura: 2,
    longevidad: '3 meses (refrigerado)',
    tipo: 'Vector viral',
  },
  Sinovac: {
    efectividad: 51,
    costo: 13.60,
    costoMayoreo: 10.20,
    temperatura: -18,
    longevidad: '12 meses (refrigerado)',
    tipo: 'Virus inactivado',
  },
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

const generarComparacion = (vaccineA: string, vaccineB: string): ComparacionData => {
  const a = DATOS_VACUNAS[vaccineA] ?? DATOS_VACUNAS['Pfizer']
  const b = DATOS_VACUNAS[vaccineB] ?? DATOS_VACUNAS['Moderna']

  const [leftEfect, rightEfect] = compararNumeros(a.efectividad, b.efectividad, true)
  const [leftCosto, rightCosto] = compararNumeros(a.costo, b.costo, false)
  const [leftMayoreo, rightMayoreo] = compararNumeros(a.costoMayoreo, b.costoMayoreo, false)

  const rows: ComparisonRowProps[] = [
    {
      index: 1,
      label: 'Efectividad',
      left:  { value: `${a.efectividad}%`, status: leftEfect },
      right: { value: `${b.efectividad}%`, status: rightEfect },
    },
    {
      index: 2,
      label: 'Costo unitario',
      left:  { value: `$${a.costo.toFixed(2)}`, status: leftCosto },
      right: { value: `$${b.costo.toFixed(2)}`, status: rightCosto },
    },
    {
      index: 3,
      label: 'Costo mayoreo',
      left:  { value: `$${a.costoMayoreo.toFixed(2)}`, status: leftMayoreo },
      right: { value: `$${b.costoMayoreo.toFixed(2)}`, status: rightMayoreo },
    },
    {
      index: 4,
      label: 'Temperatura',
      left:  { value: `${a.temperatura}°C`, status: 'neutral' },
      right: { value: `${b.temperatura}°C`, status: 'neutral' },
    },
    {
      index: 5,
      label: 'Longevidad',
      left:  { value: a.longevidad, status: 'neutral' },
      right: { value: b.longevidad, status: 'neutral' },
    },
    {
      index: 6,
      label: 'Tipo',
      left:  { value: a.tipo, status: 'neutral' },
      right: { value: b.tipo, status: 'neutral' },
    },
  ]

  return { vaccineA, vaccineB, rows }
}

export const getComparacion = async (
  vaccineA: string,
  vaccineB: string
): Promise<ComparacionData> => {
  // return (await api.get(`/vacunas/comparar?a=${vaccineA}&b=${vaccineB}`)).data
  return generarComparacion(vaccineA, vaccineB)
}