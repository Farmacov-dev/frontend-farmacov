// src/hooks/useUltimaActualizacion.ts
import { useQuery } from '@tanstack/react-query'
import { getKpis } from '../services/dashboard/getKpis'
import { CACHE_24H } from '../config/queryClient'

// reutiliza getKpis porque ultimaActualizacion podria venir desde el mismo endpoint
export const useUltimaActualizacion = () => {
  const { data } = useQuery({
    queryKey: ['kpis'],
    queryFn: getKpis,
    staleTime: CACHE_24H,
    gcTime: CACHE_24H,
  })
  return data?.ultimaActualizacion ?? 'Cargando...'
}