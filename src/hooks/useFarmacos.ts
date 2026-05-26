// src/hooks/useFarmacos.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getFarmacos,
  crearFarmaco,
  editarFarmaco,
  eliminarFarmaco,
} from '../services/admin/adminFarmacos';

export const useFarmacos = () => {
  return useQuery({
    queryKey: ['farmacos'],
    queryFn: getFarmacos,
  });
};

export const useCrearFarmaco = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: crearFarmaco,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farmacos'] });
    },
  });
};

export const useEditarFarmaco = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editarFarmaco,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farmacos'] });
    },
  });
};

export const useEliminarFarmaco = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eliminarFarmaco,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farmacos'] });
    },
  });
};