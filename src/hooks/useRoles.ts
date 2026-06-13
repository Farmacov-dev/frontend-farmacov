// src/hooks/useRoles.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getRoles, crearRol, eliminarRol } from '../services/admin/getRoles'
import { CACHE_15MIN } from '../config/queryClient'

export const useRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
    staleTime: CACHE_15MIN,
    gcTime: CACHE_15MIN,
  })
}

export const useCrearRol = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: crearRol,
    onSuccess: () => {
      // Obliga a la tabla de roles a volver a pedir los datos al backend
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};

export const useEliminarRol = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eliminarRol,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};