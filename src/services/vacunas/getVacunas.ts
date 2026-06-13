// src/services/vacunas/getVacunas.ts
import api from '../api'
import type { Vaccine } from '../../components/VaccineTableRow/VaccineTableRow'

// Le ponemos '?' a los campos problemáticos para que TypeScript sepa 
// que Quarkus a veces los manda como null o no los manda.
interface VacunaDTO {
  idVacuna: number
  nombre: string
  farmaceutica: string
  costoUnitario: number
  temperatura: number
  indiceSeguridad?: number 
  efectividad?: number | null // Lo agregamos por si el backend sigue mandando este nombre
  tiempoAmbiente: number
}

const mapVacunaToVaccine = (v: VacunaDTO): Vaccine => ({
  id: v.idVacuna,
  name: v.nombre,
  farmaceutica: v.farmaceutica,
  costoUnitario: v.costoUnitario,
  temperatura: `${v.temperatura}°C`,
  indice_seguridad: v.indiceSeguridad || (v.efectividad ? v.efectividad : 0),
  longevidad: `${v.tiempoAmbiente} ${v.tiempoAmbiente === 1 ? 'hora' : 'horas'} (ambiente)`,
})

export const getVacunas = async (): Promise<Vaccine[]> => {
  const response = await api.get<VacunaDTO[]>('/vacunas')
  return response.data.map(mapVacunaToVaccine)
}