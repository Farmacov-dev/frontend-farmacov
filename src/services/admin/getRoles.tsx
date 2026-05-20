// src/services/admin/getRoles.ts
import api from '../api'

export interface Rol {
  id: number;
  nombre: string;
  esAdmin: boolean;
  permisos: Record<string, boolean>;
}

export const getRoles = async (): Promise<Rol[]> => {
  const { data } = await api.get<Rol[]>('/admin/roles')
  return data
}