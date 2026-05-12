// src/services/dashboard/getKpis.ts
import api from '../api'

export interface KpiData {
  totalVacunas: number
  totalReportes: number
  reportesEsteMes: number
  porcentajeReportesGraves: number
}

export const getKpis = async (): Promise<KpiData> => {
  const data = await (await api.get('/dashboard/kpis')).data
  return data
}