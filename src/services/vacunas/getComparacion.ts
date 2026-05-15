// src/services/vacunas/getComparacion.ts
import api from '../api'
import type { ComparisonRowProps, ComparisonRowStatus } from '../../components/ComparisonRow/ComparisonRow'

export interface ComparacionData {
  vaccineA: string
  vaccineB: string
  rows: ComparisonRowProps[]
}

interface VacunaData {
  seguridad: number
  costo: number
  temperatura: number
  tiempoAmbiente: string
  
}

const DATOS_VACUNAS: Record<string, VacunaData> = {
  Comirnaty: {
    seguridad: 91.2,
    costo: 19.50,
    temperatura: -70,
    tiempoAmbiente: '2 horas',
    
  },
  Spikevax: {
    seguridad: 88.7,
    costo: 25.00,
    temperatura: -20,
    tiempoAmbiente: '12 horas',
    
  },
  Vaxzevria: {
    seguridad: 76.4,
    costo: 4.00,
    temperatura: 4,
    tiempoAmbiente: 'Refrigerado',
    
  },
  Janssen: {
    seguridad: 72.1,
    costo: 10.00,
    temperatura: 4,
    tiempoAmbiente: 'Refrigerado',
    
  },
  CoronaVac: {
    seguridad: 68.9,
    costo: 13.60,
    temperatura: 4,
    tiempoAmbiente: 'Refrigerado',
    
  },
  'Sinopharm BBIBP': {
    seguridad: 71.3,
    costo: 14.50,
    temperatura: 4,
    tiempoAmbiente: 'Refrigerado',
   
  },
  Covaxin: {
    seguridad: 70.5,
    costo: 15.00,
    temperatura: 4,
    tiempoAmbiente: 'Refrigerado',
    
  },
  Nuvaxovid: {
    seguridad: 74.2,
    costo: 16.00,
    temperatura: 4,
    tiempoAmbiente: 'Refrigerado',
    
  },
  'Sputnik V': {
    seguridad: 73.8,
    costo: 9.95,
    temperatura: -18,
    tiempoAmbiente: 'Refrigerado',
    
  },
  Convidecia: {
    seguridad: 69.4,
    costo: 10.50,
    temperatura: 4,
    tiempoAmbiente: 'Refrigerado',
    
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
  const a = DATOS_VACUNAS[vaccineA] ?? DATOS_VACUNAS['Comirnaty']
  const b = DATOS_VACUNAS[vaccineB] ?? DATOS_VACUNAS['Spikevax']

  const [leftSeg, rightSeg] = compararNumeros(a.seguridad, b.seguridad, true)
  const [leftCosto, rightCosto] = compararNumeros(a.costo, b.costo, false)

  const rows: ComparisonRowProps[] = [
    {
      index: 1,
      label: 'Índice de Seguridad',
      left:  { value: `${a.seguridad}%`, status: leftSeg },
      right: { value: `${b.seguridad}%`, status: rightSeg },
    },
    {
      index: 2,
      label: 'Costo unitario',
      left:  { value: `$${a.costo.toFixed(2)}`, status: leftCosto },
      right: { value: `$${b.costo.toFixed(2)}`, status: rightCosto },
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
      left:  { value: a.tiempoAmbiente, status: 'neutral' },
      right: { value: b.tiempoAmbiente, status: 'neutral' },
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