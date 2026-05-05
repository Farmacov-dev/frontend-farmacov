// src/services/dashboard/getEfectividad.ts
import api from '../api'

export interface EfectividadItem {
  label: string
  value: number
}

const MOCK_EFECTIVIDAD: EfectividadItem[] = [
  { label: 'Pfizer', value: 90 },
  { label: 'Moderna', value: 85 },
  { label: 'AZ', value: 70 },
  { label: 'J&J', value: 66 },
  { label: 'Sinovac', value: 55 },
]

export const getEfectividad = async (): Promise<EfectividadItem[]> => {
  // return (await api.get('/dashboard/efectividad')).data
  return MOCK_EFECTIVIDAD
}