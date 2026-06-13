// src/hooks/useUltimaActualizacion.ts
import { useQuery } from '@tanstack/react-query'
import { getUltimaActualizacion } from '../services/dashboard/getUltimaActualizacion'
import { CACHE_24H } from '../config/queryClient'

export const useUltimaActualizacion = () => {
  const { data } = useQuery({
    queryKey: ['ultima-actualizacion'],
    queryFn: getUltimaActualizacion,
    staleTime: CACHE_24H,
    gcTime: CACHE_24H,
  })
  return data ?? 'Cargando...'
}