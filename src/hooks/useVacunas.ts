// src/hooks/useVacunas.ts
import { useQuery } from '@tanstack/react-query'
import { getVacunas } from '../services/vacunas/getVacunas'

export const useVacunas = () => {
  return useQuery({
    queryKey: ['vacunas'],
    queryFn: getVacunas,
  })
}