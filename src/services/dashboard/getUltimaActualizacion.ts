// src/services/dashboard/getUltimaActualizacion.ts
import api from '../api'

interface UltimaActualizacionResponse {
  fecha: string
}

const formatearFecha = (fechaISO: string): string => {
  const fecha = new Date(fechaISO)
  return fecha.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const getUltimaActualizacion = async (): Promise<string> => {
  const data: UltimaActualizacionResponse = await (await api.get('/dashboard/ultima-actualizacion')).data
  return formatearFecha(data.fecha)
}