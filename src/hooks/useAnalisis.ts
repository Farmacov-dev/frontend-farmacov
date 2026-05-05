// src/hooks/useAnalisis.ts
import { useQuery } from '@tanstack/react-query'
import { getSintomas } from '../services/analisis/getSintomas'
import type { SintomaFiltros } from '../services/analisis/getSintomas'

export const useSintomas = (filtros?: SintomaFiltros) => {
  return useQuery({
    queryKey: ['sintomas', filtros],
    queryFn: () => getSintomas(filtros),
  })
}