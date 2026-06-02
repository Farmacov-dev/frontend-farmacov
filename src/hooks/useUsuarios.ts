import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsuarios } from '../services/usuarios/getUsuarios'
import { createUsuario } from '../services/usuarios/createUsuario'
import { updateUsuario } from '../services/usuarios/updateUsuario'
import { deleteUsuario } from '../services/usuarios/deleteUsuario'
import { getRolesForUsuarios } from '../services/usuarios/getRolesForUsuarios'
import type { CreateUsuarioBody } from '../services/usuarios/createUsuario'
import type { UpdateUsuarioBody } from '../services/usuarios/updateUsuario'
import { CACHE_5MIN } from '../config/queryClient'

export const useUsuarios = () => {
  return useQuery({
    queryKey: ['usuarios'],
    queryFn: getUsuarios,
    staleTime: CACHE_5MIN,
  })
}

export const useRolesFormulario = () => {
  return useQuery({
    queryKey: ['roles-formulario'],
    queryFn: getRolesForUsuarios,
    staleTime: CACHE_5MIN,
  })
}

export const useCreateUsuario = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateUsuarioBody) => createUsuario(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })
}

export const useUpdateUsuario = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateUsuarioBody }) =>
      updateUsuario(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })
}

export const useDeleteUsuario = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteUsuario(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })
}