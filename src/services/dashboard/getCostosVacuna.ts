// src/services/dashboard/getCostosVacuna.ts
import api from '../api'

interface CostosPorVacunaBackend {
  nombreVacuna: string
  costoUnitario: number
}

export interface CostoVacunaItem {
  label: string
  value: number
}

const MOCK_COSTOS: CostoVacunaItem[] = [
  { label: 'Comirnaty', value: 19.50 },
  { label: 'Spikevax', value: 25.00 },
  { label: 'Vaxzevria', value: 4.00 },
  { label: 'Janssen', value: 10.00 },
  { label: 'CoronaVac', value: 13.60 },
  { label: 'Sinopharm', value: 36.00 },
]

export const getCostosVacuna = async (): Promise<CostoVacunaItem[]> => {
  const data: CostosPorVacunaBackend[] = await (await api.get('/dashboard/costos')).data
  return data.map((item) => ({
    label: item.nombreVacuna,
    value: Number(item.costoUnitario),
  }))
  // return MOCK_COSTOS
}