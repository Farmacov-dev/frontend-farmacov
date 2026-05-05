// src/hooks/useDashboard.ts
import { useQuery } from '@tanstack/react-query'
import { getKpis } from '../services/dashboard/getKpis'
import { getTopSintomas } from '../services/dashboard/getTopSintomas'
import { getEfectividad } from '../services/dashboard/getEfectividad'

export const useKpis = () => {
  return useQuery({
    queryKey: ['kpis'],
    queryFn: getKpis,
  })
}

export const useTopSintomas = () => {
  return useQuery({
    queryKey: ['top-sintomas'],
    queryFn: getTopSintomas,
  })
}

export const useEfectividad = () => {
  return useQuery({
    queryKey: ['efectividad'],
    queryFn: getEfectividad,
  })
}