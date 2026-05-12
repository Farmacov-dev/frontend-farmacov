// src/hooks/useDashboard.ts
import { useQuery } from '@tanstack/react-query'
import { getKpis } from '../services/dashboard/getKpis'
import { getTopSintomas } from '../services/dashboard/getTopSintomas'
import { getEfectividad } from '../services/dashboard/getEfectividad'
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

export const useEfectividad = () => {
  return useQuery({
    queryKey: ['efectividad'],
    queryFn: getEfectividad,
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
