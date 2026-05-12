// src/services/analisis/getSintomas.ts
import api from '../api'

export interface SintomaFiltros {
  vacuna?: string
  sexo?: string
  edad?: string
  sintoma?: string
}

export interface SintomaData {
  label: string
  value: number
}

// datos base por vacuna
const DATOS_PFIZER: SintomaData[] = [
  { label: 'Miocarditis', value: 85 },
  { label: 'Anafilaxia', value: 45 },
  { label: 'Trombosis', value: 30 },
  { label: 'Parálisis', value: 20 },
  { label: 'Gastritis', value: 10 },
]

const DATOS_MODERNA: SintomaData[] = [
  { label: 'Miocarditis', value: 40 },
  { label: 'Anafilaxia', value: 75 },
  { label: 'Trombosis', value: 55 },
  { label: 'Parálisis', value: 35 },
  { label: 'Gastritis', value: 25 },
]

const DATOS_ASTRAZENECA: SintomaData[] = [
  { label: 'Miocarditis', value: 20 },
  { label: 'Anafilaxia', value: 30 },
  { label: 'Trombosis', value: 90 },
  { label: 'Parálisis', value: 60 },
  { label: 'Gastritis', value: 40 },
]

const DATOS_DEFAULT: SintomaData[] = [
  { label: 'Miocarditis', value: 65 },
  { label: 'Anafilaxia', value: 64 },
  { label: 'Trombosis', value: 57 },
  { label: 'Parálisis', value: 50 },
  { label: 'Gastritis', value: 21 },
]

// multiplicadores por sexo
const MULTIPLICADOR_SEXO: Record<string, number> = {
  M: 1.2,   // hombres tienen más reportes
  F: 0.85,  // mujeres tienen menos
}

// multiplicadores por grupo de edad
const MULTIPLICADOR_EDAD: Record<string, number> = {
  '0-17':  0.4,
  '18-29': 0.7,
  '30-49': 1.0,
  '50-64': 1.3,
  '65+':   1.6,  // adultos mayores tienen más reportes
}

export const getSintomas = async (filtros?: SintomaFiltros): Promise<SintomaData[]> => {
  console.log('Filtros activos:', filtros)

  // 1. seleccionar datos base por vacuna
  let datos: SintomaData[]
  switch (filtros?.vacuna) {
    case 'pfizer':      datos = DATOS_PFIZER;      break
    case 'moderna':     datos = DATOS_MODERNA;     break
    case 'astrazeneca': datos = DATOS_ASTRAZENECA; break
    default:            datos = DATOS_DEFAULT;     break
  }

  // 2. aplicar multiplicador de sexo
  const multSexo = filtros?.sexo
    ? (MULTIPLICADOR_SEXO[filtros.sexo] ?? 1.0)
    : 1.0

  // 3. aplicar multiplicador de edad
  const multEdad = filtros?.edad
    ? (MULTIPLICADOR_EDAD[filtros.edad] ?? 1.0)
    : 1.0

  // 4. filtrar por síntoma específico si está seleccionado
  const datosFiltrados = filtros?.sintoma
    ? datos.filter((d) =>
        d.label.toLowerCase().includes(filtros.sintoma!.toLowerCase())
      )
    : datos

  // 5. aplicar multiplicadores y redondear
  return datosFiltrados.map((item) => ({
    label: item.label,
    value: Math.round(item.value * multSexo * multEdad),
  }))
}