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

export const crearRol = async (data: { nombre: string; esAdmin?: boolean }) => {
  const response = await api.post('/admin/roles', data);
  return response.data;
};

export const eliminarRol = async (idRol: number) => {
  const response = await api.delete(`/admin/roles/${idRol}`);
  return response.data;
};