// src/services/vacunas/getVacunaDetalle.ts
import api from '../api'

export interface EfectoSecundario {
  descripcion: string
  severidad: 'leve' | 'moderado' | 'grave'
}

export interface VacunaDetalle {
  id: number
  nombre: string
  farmaceutica: string
  tipo: string
  descripcionGeneral: string
  temperatura: number
  tiempoAmbiente: number | null
  costoUnitario: number
  efectosSecundarios: EfectoSecundario[]
}

interface VacunaDetalleDTO {
  idVacuna?: number
  id?: number
  nombre: string
  farmaceutica: string
  tipo: string
  descripcionGeneral: string
  temperatura: number
  tiempoAmbiente: number | null
  costoUnitario: number
  efectosSecundarios: EfectoSecundario[]
}

const mapDetalleDTO = (dto: VacunaDetalleDTO, fallbackId: number): VacunaDetalle => ({
  id: dto.idVacuna ?? dto.id ?? fallbackId,
  nombre: dto.nombre,
  farmaceutica: dto.farmaceutica,
  tipo: dto.tipo,
  descripcionGeneral: dto.descripcionGeneral,
  temperatura: dto.temperatura,
  tiempoAmbiente: dto.tiempoAmbiente,
  costoUnitario: dto.costoUnitario,
  efectosSecundarios: dto.efectosSecundarios,
})

export const getVacunaDetalle = async (id: number): Promise<VacunaDetalle> => {
  const response = await api.get<VacunaDetalleDTO>(`/vacunas/${id}`)
  return mapDetalleDTO(response.data, id)
}