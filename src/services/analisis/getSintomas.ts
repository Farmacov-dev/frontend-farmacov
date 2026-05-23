// src/services/analisis/getSintomas.ts
import api from '../api'

export interface SintomaFiltros {
  idVacunas?: number[]  // ← array en lugar de uno solo
  sexo?: string
  grupoEdad?: string
  esGrave?: boolean
}

export interface SintomaData {
  label: string
  value: number
}

export interface SintomaBackend {
  esGrave: boolean
  grupoEdad: string
  idSintoma: number
  idVacuna: number
  nombreSintoma: string
  nombreVacuna: string
  sexo: string
  total: number
}

export interface VacunaOption {
  id: number
  nombre: string
}

// extrae vacunas únicas de la respuesta del endpoint
export const extraerVacunas = (data: SintomaBackend[]): VacunaOption[] => {
  const mapa = new Map<number, string>()
  data.forEach((item) => mapa.set(item.idVacuna, item.nombreVacuna))
  return Array.from(mapa.entries()).map(([id, nombre]) => ({ id, nombre }))
}

// agrupa datos por síntoma y vacuna para la gráfica grouped
export interface SintomaAgrupado {
  sintoma: string
  [nombreVacuna: string]: string | number
}

export const agruparPorSintoma = (
  data: SintomaBackend[],
  vacunasSeleccionadas: number[]
): SintomaAgrupado[] => {
  const mapa = new Map<string, SintomaAgrupado>()

  data
    .filter((item) => vacunasSeleccionadas.includes(item.idVacuna))
    .forEach((item) => {
      if (!mapa.has(item.nombreSintoma)) {
        mapa.set(item.nombreSintoma, { sintoma: item.nombreSintoma })
      }
      const entry = mapa.get(item.nombreSintoma)!
      const valorActual = (entry[item.nombreVacuna] as number) ?? 0
      entry[item.nombreVacuna] = valorActual + item.total
    })

  return Array.from(mapa.values())
}

export const getSintomas = async (filtros?: SintomaFiltros): Promise<SintomaBackend[]> => {
  const params: Record<string, string> = {}

  if (filtros?.sexo) params.sexo = filtros.sexo
  if (filtros?.grupoEdad) params.grupoEdad = filtros.grupoEdad
  if (filtros?.esGrave !== undefined) params.esGrave = String(filtros.esGrave)

  // si hay vacunas seleccionadas las mandamos como filtro
  // si no, traemos todas
  if (filtros?.idVacunas && filtros.idVacunas.length === 1) {
    params.idVacuna = String(filtros.idVacunas[0])
  }

  const { data } = await api.get('/dashboard/resumen-sintomas', { params })
  return data as SintomaBackend[]
}