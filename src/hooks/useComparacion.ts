// src/hooks/useComparacion.ts
import { useQuery } from '@tanstack/react-query'
import { getComparacion } from '../services/vacunas/getComparacion'
import { CACHE_15MIN } from '../config/queryClient'

export const useComparacion = (idA: number, idB: number) => {
  return useQuery({
    queryKey: ['comparacion', idA, idB],
    queryFn: () => getComparacion(idA, idB),
    enabled: !!idA && !!idB,
    staleTime: CACHE_15MIN,
    gcTime: CACHE_15MIN,
  })
}