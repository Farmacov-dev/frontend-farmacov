// src/hooks/useRoles.ts
import { useQuery } from '@tanstack/react-query'
import { getRoles } from '../services/admin/getRoles'
import { CACHE_15MIN } from '../config/queryClient'

export const useRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
    staleTime: CACHE_15MIN,
    gcTime: CACHE_15MIN,
  })
}