// src/hooks/useDashboard.ts
import { useQuery } from '@tanstack/react-query'
import { getKpis } from '../services/dashboard/getKpis'
import { getTopSintomas } from '../services/dashboard/getTopSintomas'
import { getSeguridadVacuna } from '../services/dashboard/getSeguridadVacuna'
import { getCostosVacuna } from '../services/dashboard/getCostosVacuna'
import { CACHE_24H, CACHE_15MIN } from '../config/queryClient'


export const useKpis = () => {
  return useQuery({
    queryKey: ['kpis'],
    queryFn: getKpis,
    staleTime: CACHE_24H,
    gcTime: CACHE_24H,
  })
}

export const useTopSintomas = () => {
  return useQuery({
    queryKey: ['top-sintomas'],
    queryFn: getTopSintomas,
    staleTime: CACHE_15MIN,
    gcTime: CACHE_15MIN,
  })
}

export const useSeguridadVacuna = () => {
  return useQuery({
    queryKey: ['seguridad-vacuna'],
    queryFn: getSeguridadVacuna,
    staleTime: CACHE_15MIN,
    gcTime: CACHE_15MIN,
  })
}

export const useCostosVacuna = () => {
  return useQuery({
    queryKey: ['costos-vacuna'],
    queryFn: getCostosVacuna,
    staleTime: CACHE_15MIN,
    gcTime: CACHE_15MIN,
  })
}

