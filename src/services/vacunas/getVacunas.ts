// src/services/vacunas/getVacunas.ts
import api from '../api'
import type { Vaccine } from '../../components/VaccineTableRow/VaccineTableRow'

interface VacunaDTO {
  idVacuna: number
  nombre: string
  farmaceutica: string
  costoUnitario: number
  temperatura: number
  indiceSeguridad: number
  tiempoAmbiente: number
}

const mapVacunaToVaccine = (v: VacunaDTO): Vaccine => ({
  id: v.idVacuna,
  name: v.nombre,
  farmaceutica: v.farmaceutica,
  costo: v.costoUnitario,
  costoMayoreo: 0,
  temperatura: `${v.temperatura}°C`,
  indice_seguridad: v.indiceSeguridad,
  longevidad: `${v.tiempoAmbiente} ${v.tiempoAmbiente === 1 ? 'hora' : 'horas'} (ambiente)`,
})

export const getVacunas = async (): Promise<Vaccine[]> => {
  const response = await api.get<VacunaDTO[]>('/vacunas')
  return response.data.map(mapVacunaToVaccine)
}