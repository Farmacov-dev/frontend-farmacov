// src/services/dashboard/getTopSintomas.ts
import api from '../api'

export interface SintomaItem {
  label: string
  value: number
}

const MOCK_SINTOMAS: SintomaItem[] = [
  { label: 'Miocarditis', value: 4 },
  { label: 'Anafilaxia', value: 3 },
  { label: 'Trombosis', value: 3 },
  { label: 'Parálisis', value: 2 },
  { label: 'Alergia', value: 2 },
]

export const getTopSintomas = async (): Promise<SintomaItem[]> => {
  // return (await api.get('/dashboard/top-sintomas')).data
  return MOCK_SINTOMAS
}