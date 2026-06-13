// src/hooks/useAnalisis.ts
import { useQuery } from '@tanstack/react-query'
import { getSintomas } from '../services/analisis/getSintomas'
import type { SintomaFiltros } from '../services/analisis/getSintomas'
import { CACHE_15MIN } from '../config/queryClient'

export const useSintomas = (filtros?: SintomaFiltros) => {
  return useQuery({
    queryKey: ['sintomas', filtros],
    queryFn: () => getSintomas(filtros),
    staleTime: CACHE_15MIN,
    gcTime: CACHE_15MIN,
  })
}