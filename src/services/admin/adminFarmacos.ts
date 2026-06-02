// src/services/admin/adminFarmacos.ts
import api from '../api';

export interface Farmaco {
  id: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  creadoEn?: string;
  actualizadoEn?: string;
}

export type CrearFarmacoDTO = Omit<Farmaco, 'id' | 'creadoEn' | 'actualizadoEn'>;

export const getFarmacos = async (): Promise<Farmaco[]> => {
  const { data } = await api.get<Farmaco[]>('/admin/farmacos');
  return data;
};

export const getFarmaco = async (id: number): Promise<Farmaco> => {
  const { data } = await api.get<Farmaco>(`/admin/farmacos/${id}`);
  return data;
};

export const crearFarmaco = async (farmaco: CrearFarmacoDTO): Promise<Farmaco> => {
  const { data } = await api.post<Farmaco>('/admin/farmacos', farmaco);
  return data;
};

export const editarFarmaco = async ({ id, farmaco }: { id: number; farmaco: CrearFarmacoDTO }): Promise<Farmaco> => {
  const { data } = await api.put<Farmaco>(`/admin/farmacos/${id}`, farmaco);
  return data;
};

export const eliminarFarmaco = async (id: number): Promise<void> => {
  await api.delete(`/admin/farmacos/${id}`);
};