// src/services/vacunas/getPerfilRiesgo.ts
import api from '../api'

export interface SintomaReporte {
  label: string
  value: number
}

export interface PerfilRiesgoData {
  costoUnitario: number
  porcentajeSintomasGraves: number
  indiceSeguridad: number
  totalReportes: number
  topSintomas: SintomaReporte[]
}

export interface VacunaPerfilOption {
  id: number
  nombre: string
}

// interfaces del backend
interface CostoBackend {
  costoUnitario: number
  id: number
  idVacuna: number
  creadoEn: string
  actualizadoEn: string
}

interface SeguridadBackend {
  idVacuna: number
  indiceSeguridad: number
  reportesGraves: number
  totalReportes: number
}

interface SintomaBackend {
  esGrave: boolean
  grupoEdad: string
  idSintoma: number
  idVacuna: number
  nombreSintoma: string
  nombreVacuna: string
  sexo: string
  total: number
}

export const getPerfilRiesgo = async (idVacuna: number): Promise<PerfilRiesgoData> => {
  const [costoRes, seguridadRes, sintomasRes] = await Promise.all([
    api.get(`/dashboard/costos/${idVacuna}`),
    api.get(`/dashboard/indice-seguridad/${idVacuna}`),
    api.get(`/dashboard/resumen-sintomas`, { params: { idVacuna, limit: 5 } }),
  ])

  const costos = costoRes.data as CostoBackend[]
  const seguridad = seguridadRes.data as SeguridadBackend
  const sintomas = sintomasRes.data as SintomaBackend[]

  // agrupar síntomas por nombre y sumar totales
  const sintomasAgrupados = sintomas.reduce(
    (acc, item) => {
      acc[item.nombreSintoma] = (acc[item.nombreSintoma] ?? 0) + item.total
      return acc
    },
    {} as Record<string, number>
  )

  const topSintomas = Object.entries(sintomasAgrupados)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  return {
    costoUnitario: costos[0]?.costoUnitario ?? 0,
    porcentajeSintomasGraves: seguridad.reportesGraves > 0
      ? Math.round((seguridad.reportesGraves / seguridad.totalReportes) * 1000) / 10
      : 0,
    indiceSeguridad: seguridad.indiceSeguridad,
    totalReportes: seguridad.totalReportes,
    topSintomas,
  }
}