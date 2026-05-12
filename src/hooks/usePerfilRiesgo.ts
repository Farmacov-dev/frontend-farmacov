// src/hooks/usePerfilRiesgo.ts
import { useQuery } from '@tanstack/react-query'
import { getPerfilRiesgo } from '../services/vacunas/getPerfilRiesgo'
import { CACHE_15MIN } from '../config/queryClient'

export const usePerfilRiesgo = (idVacuna: number | null) => {
  return useQuery({
    queryKey: ['perfil-riesgo', idVacuna],
    queryFn: () => getPerfilRiesgo(idVacuna!),
    enabled: idVacuna !== null,
    staleTime: CACHE_15MIN,
    gcTime: CACHE_15MIN,
  })
}