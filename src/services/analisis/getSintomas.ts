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

const MOCK_SINTOMAS: SintomaData[] = [
  { label: 'Miocarditis', value: 65 },
  { label: 'Anafilaxia', value: 64 },
  { label: 'Trombosis', value: 57 },
  { label: 'Parálisis', value: 50 },
  { label: 'Gastritis', value: 21 },
]

export const getSintomas = async (filtros?: SintomaFiltros): Promise<SintomaData[]> => {
  // return (await api.get('/analisis/sintomas', { params: filtros })).data
  return MOCK_SINTOMAS
}