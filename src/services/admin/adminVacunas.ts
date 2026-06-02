// src/services/admin/adminVacunas.ts
import api from '../api';

export interface Vacuna {
  idVacuna: number;
  idFarmaco: number; // <-- Nuevo campo del DTO
  nombre: string;
  farmaceutica: string;
  tipo: string;
  temperatura?: number | null;
  tiempoAmbiente?: number | null;
  costoUnitario?: number | null;
  efectividad?: number | null;
}

export interface CrearVacunaDTO {
  idFarmaco: number;
  nombre: string;
  farmaceutica: string;
  tipo: string;
  descripcionGeneral: string;
}

export const getVacunas = async (): Promise<Vacuna[]> => {
  const { data } = await api.get<Vacuna[]>('/vacunas');
  return data;
};

export const crearVacuna = async ({ id, vacuna }: { id: number; vacuna: CrearVacunaDTO }): Promise<Vacuna> => {
  const { data } = await api.post<Vacuna>(`/vacunas/${id}`, vacuna);
  return data;
};

export const editarVacuna = async ({ id, vacuna }: { id: number; vacuna: CrearVacunaDTO }): Promise<Vacuna> => {
  const { data } = await api.put<Vacuna>(`/vacunas/${id}`, vacuna);
  return data;
};

export const eliminarVacuna = async (id: number): Promise<void> => {
  await api.delete(`/vacunas/${id}`);
};

// Añadir al final de src/services/admin/adminVacunas.ts

export const getVacuna = async (id: number): Promise<any> => {
  const { data } = await api.get(`/vacunas/${id}`);
  return data;
};