// src/services/dashboard/getSeguridadVacuna.ts
import api from '../api'

export interface SeguridadVacunaItem {
  label: string
  value: number
}

interface SeguridadVacunaBackend {
  idVacuna: number
  indiceSeguridad: number
  nombreVacuna: string
  reportesGraves: number
  totalReportes: number
}

export const getSeguridadVacuna = async (): Promise<SeguridadVacunaItem[]> => {
  const { data } = await api.get('/dashboard/indice-seguridad')
  return (data as SeguridadVacunaBackend[])
    .slice(0, 5)
    .map((item) => ({
      label: item.nombreVacuna,
      value: item.indiceSeguridad,
    }))
}