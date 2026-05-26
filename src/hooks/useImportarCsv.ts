import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

// Interfaz inferida de tu ImportResultDto del backend
export interface ImportResultDto {
  procesados?: number;
  exitosos?: number;
  fallidos?: number;
  errores?: string[]; // Lista de errores por fila
  mensaje?: string;
}

interface ImportPayload {
  endpoint: string;
  archivo: File;
}

export const useImportarCsv = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ endpoint, archivo }: ImportPayload): Promise<ImportResultDto> => {
      const formData = new FormData();
      formData.append('archivo', archivo);

      const { data } = await api.post(`/admin/importar/${endpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    onSuccess: () => {
      // Invalidamos todo para que cualquier tabla en la pantalla se actualice
      queryClient.invalidateQueries();
    },
  });
};