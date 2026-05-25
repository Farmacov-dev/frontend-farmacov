import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getVacunas,
  crearVacuna,
  editarVacuna,
  eliminarVacuna,
} from '../services/admin/adminVacunas';

export const useAdminVacunas = () => {
  return useQuery({
    queryKey: ['admin-vacunas'],
    queryFn: getVacunas,
  });
};

export const useCrearVacuna = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: crearVacuna,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-vacunas'] });
    },
  });
};

export const useEditarVacuna = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editarVacuna,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-vacunas'] });
    },
  });
};

export const useEliminarVacuna = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eliminarVacuna,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-vacunas'] });
    },
  });
};