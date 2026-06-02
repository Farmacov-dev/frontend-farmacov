// src/services/dashboard/getDistribucionSeveridad.ts
import api from '../api';

export interface SeveridadData {
  grave: number;
  leve: number;
  moderado: number;
}

export const getDistribucionSeveridad = async (): Promise<SeveridadData> => {
  const { data } = await api.get<SeveridadData>('/admin/efectos-secundarios/distribucion-severidad');
  return data;
};

export const getDistribucionSeveridadPorVacuna = async (idVacuna: number): Promise<SeveridadData> => {
  const { data } = await api.get<SeveridadData>(`/admin/efectos-secundarios/distribucion-severidad/${idVacuna}`);
  return data;
};