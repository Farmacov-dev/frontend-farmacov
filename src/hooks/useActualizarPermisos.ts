// src/hooks/useActualizarPermisos.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { putPermisos } from '../services/admin/putPermisos'

export const useActualizarPermisos = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ idRol, permisos }: { idRol: number, permisos: Record<string, boolean> }) => 
      putPermisos(idRol, permisos),
    onSuccess: () => {
      // Obliga a React Query a volver a ejecutar "getRoles" y traer la info fresca
      queryClient.invalidateQueries({ queryKey: ['roles'] })
    },
  })
}