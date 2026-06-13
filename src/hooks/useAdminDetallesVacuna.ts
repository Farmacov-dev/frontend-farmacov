import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api'; 

// --- COSTOS ---
export const useCostosVacuna = (idVacuna: number) => {
  return useQuery({
    queryKey: ['vacuna-costos', idVacuna],
    queryFn: async () => {
      const { data } = await api.get(`/admin/vacuna-costos/vacuna/${idVacuna}`);
      return data;
    },
  });
};

// --- CONDICIONES ---
export const useCondicionesVacuna = (idVacuna: number) => {
  return useQuery({
    queryKey: ['vacuna-condiciones', idVacuna],
    queryFn: async () => {
      const { data } = await api.get(`/admin/vacuna-condiciones/vacuna/${idVacuna}`);
      return data;
    },
  });
};

// --- EFECTOS SECUNDARIOS ---
export const useEfectosSecundarios = (idVacuna: number) => {
  return useQuery({
    queryKey: ['vacuna-efectos', idVacuna],
    queryFn: async () => {
      const { data } = await api.get(`/admin/efectos-secundarios/vacuna/${idVacuna}`);
      return data;
    },
  });
};

// --- SÍNTOMAS GRAVES ---
export const useSintomasGraves = (idVacuna: number) => {
  return useQuery({
    queryKey: ['vacuna-sintomas', idVacuna],
    queryFn: async () => {
      const { data } = await api.get(`/admin/sintomas-graves/vacuna/${idVacuna}`);
      return data;
    },
  });
};

export const useEliminarCondicion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => await api.delete(`/admin/vacuna-condiciones/${id}`),
    onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ['vacuna-condiciones'] }),
  });
};

export const useEliminarCosto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => await api.delete(`/admin/vacuna-costos/${id}`),
    onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ['vacuna-costos'] }),
  });
};

export const useEliminarEfecto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => await api.delete(`/admin/efectos-secundarios/${id}`),
    onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ['vacuna-efectos'] }),
  });
};

export const useEliminarSintoma = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => await api.delete(`/admin/sintomas-graves/${id}`),
    onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ['vacuna-sintomas'] }),
  });
};

// --- MUTACIONES PARA CREAR/EDITAR COSTOS ---
export const useCrearCosto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => await api.post(`/admin/vacuna-costos`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vacuna-costos'] }),
  });
};

export const useEditarCosto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => await api.put(`/admin/vacuna-costos/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vacuna-costos'] }),
  });
};

// --- MUTACIONES PARA CREAR/EDITAR CONDICIONES ---
export const useCrearCondicion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => await api.post(`/admin/vacuna-condiciones`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vacuna-condiciones'] }),
  });
};

export const useEditarCondicion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => await api.put(`/admin/vacuna-condiciones/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vacuna-condiciones'] }),
  });
};