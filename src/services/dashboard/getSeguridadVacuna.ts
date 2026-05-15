// src/services/dashboard/getSeguridadVacuna.ts
import api from '../api'

export interface SeguridadVacunaItem {
  label: string
  value: number
}

const MOCK_SEGURIDAD: SeguridadVacunaItem[] = [
  { label: 'Comirnaty', value: 91.2 },
  { label: 'Spikevax', value: 88.7 },
  { label: 'Vaxzevria', value: 76.4 },
  { label: 'Janssen', value: 72.1 },
  { label: 'CoronaVac', value: 68.9 },

]

export const getSeguridadVacuna = async (): Promise<SeguridadVacunaItem[]> => {
  // return (await api.get('/dashboard/seguridad-vacuna')).data
  return MOCK_SEGURIDAD
}