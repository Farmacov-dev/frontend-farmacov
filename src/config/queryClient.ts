// src/config/queryClient.ts
import { QueryClient } from '@tanstack/react-query'

export const CACHE_24H = 1000 * 60 * 60 * 24
export const CACHE_5MIN = 1000 * 60 * 5
export const CACHE_15MIN = 1000 * 60 * 15

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_5MIN,
      retry: 2,
    },
  },
})
