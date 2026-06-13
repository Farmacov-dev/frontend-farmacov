// src/services/admin/putPermisos.ts
import api from '../api'

export const putPermisos = async (idRol: number, permisos: Record<string, boolean>): Promise<void> => {
  await api.put(`/admin/roles/${idRol}/permisos`, permisos)
}