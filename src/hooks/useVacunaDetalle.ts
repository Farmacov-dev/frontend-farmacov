// src/hooks/useVacunaDetalle.ts
import { useQuery } from '@tanstack/react-query'
import { getVacunaDetalle } from '../services/vacunas/getVacunaDetalle'

export const useVacunaDetalle = (id: number | null) => {
  return useQuery({
    queryKey: ['vacuna-detalle', id],
    queryFn: () => getVacunaDetalle(id!),
    enabled: id !== null, // solo busca cuando hay id seleccionado
  })
}