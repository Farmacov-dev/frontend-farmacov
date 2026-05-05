// src/services/dashboard/getTopSintomas.ts
import api from '../api'

export interface SintomaItem {
  label: string
  value: number
}

const MOCK_SINTOMAS: SintomaItem[] = [
  { label: 'Miocarditis', value: 65 },
  { label: 'Anafilaxia', value: 64 },
  { label: 'Trombosis', value: 57 },
  { label: 'Parálisis', value: 50 },
  { label: 'Gastritis', value: 21 },
]

export const getTopSintomas = async (): Promise<SintomaItem[]> => {
  // return (await api.get('/dashboard/top-sintomas')).data
  return MOCK_SINTOMAS
}