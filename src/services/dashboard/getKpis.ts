// src/services/dashboard/getKpis.ts
import api from '../api'

export interface KpiData {
  totalVacunasRegistradas: number
  eventosAdversosReportados: number
  reportesDelMes: number
  tasaEfectividadPromedio: number
  changeVacunas: number | null
  changeEventos: number | null
  changeReportes: number | null
  changeEfectividad: number | null
  ultimaActualizacion: string | null
}

const MOCK_KPIS: KpiData = {
  totalVacunasRegistradas: 1284,
  eventosAdversosReportados: 342,
  reportesDelMes: 87,
  tasaEfectividadPromedio: 73.5,
  changeVacunas: 12.0,
  changeEventos: -5.0,
  changeReportes: null,
  changeEfectividad: null,
  ultimaActualizacion: "05-05-2026",
}

export const getKpis = async (): Promise<KpiData> => {
  // return (await api.get('/dashboard/kpis')).data
  return MOCK_KPIS
}