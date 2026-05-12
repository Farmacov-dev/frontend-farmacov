// src/hooks/useComparacion.ts
import { useQuery } from '@tanstack/react-query'
import { getComparacion } from '../services/vacunas/getComparacion'

export const useComparacion = (vaccineA: string, vaccineB: string) => {
  return useQuery({
    queryKey: ['comparacion', vaccineA, vaccineB],
    queryFn: () => getComparacion(vaccineA, vaccineB),
    enabled: !!vaccineA && !!vaccineB,
  })
}