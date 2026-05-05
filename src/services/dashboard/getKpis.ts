// src/services/dashboard/getKpis.ts
import api from '../api'

export interface KpiData {
  totalVacunasRegistradas: string
  eventosAdversosReportados: string
  reportesDelMes: string
  tasaEfectividadPromedio: string
  changeVacunas: number
  changeEventos: number
  changeReportes: number
  changeEfectividad: number
}

const MOCK_KPIS: KpiData = {
  totalVacunasRegistradas: '1,284',
  eventosAdversosReportados: '342',
  reportesDelMes: '87',
  tasaEfectividadPromedio: '73%',
  changeVacunas: 12,
  changeEventos: -5,
  changeReportes: 8,
  changeEfectividad: 3,
}

export const getKpis = async (): Promise<KpiData> => {
  // return (await api.get('/dashboard/kpis')).data
  return MOCK_KPIS
}