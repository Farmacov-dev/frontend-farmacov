// @vitest-environment jsdom
// src/services/dashboard/getDistribucionSeveridad.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { get: mockGet },
}));

import { getDistribucionSeveridad, getDistribucionSeveridadPorVacuna } from './getDistribucionSeveridad';
import type { SeveridadData } from './getDistribucionSeveridad';

const mockSeveridad: SeveridadData = { grave: 10, leve: 50, moderado: 25 };

describe('Servicio: getDistribucionSeveridad', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getDistribucionSeveridad', () => {
    it('debe llamar a GET /admin/efectos-secundarios/distribucion-severidad', async () => {
      mockGet.mockResolvedValueOnce({ data: mockSeveridad });
      await getDistribucionSeveridad();
      expect(mockGet).toHaveBeenCalledWith('/admin/efectos-secundarios/distribucion-severidad');
    });

    it('debe retornar los datos de severidad', async () => {
      mockGet.mockResolvedValueOnce({ data: mockSeveridad });
      const result = await getDistribucionSeveridad();
      expect(result).toEqual(mockSeveridad);
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockGet.mockRejectedValueOnce(new Error('Server error'));
      await expect(getDistribucionSeveridad()).rejects.toThrow('Server error');
    });
  });

  describe('getDistribucionSeveridadPorVacuna', () => {
    it('debe llamar a GET /admin/efectos-secundarios/distribucion-severidad/:idVacuna', async () => {
      mockGet.mockResolvedValueOnce({ data: mockSeveridad });
      await getDistribucionSeveridadPorVacuna(3);
      expect(mockGet).toHaveBeenCalledWith('/admin/efectos-secundarios/distribucion-severidad/3');
    });

    it('debe usar el idVacuna correcto en la URL', async () => {
      mockGet.mockResolvedValueOnce({ data: mockSeveridad });
      await getDistribucionSeveridadPorVacuna(7);
      expect(mockGet).toHaveBeenCalledWith('/admin/efectos-secundarios/distribucion-severidad/7');
    });

    it('debe retornar los datos de severidad de la vacuna específica', async () => {
      mockGet.mockResolvedValueOnce({ data: mockSeveridad });
      const result = await getDistribucionSeveridadPorVacuna(3);
      expect(result).toEqual(mockSeveridad);
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockGet.mockRejectedValueOnce(new Error('Not found'));
      await expect(getDistribucionSeveridadPorVacuna(99)).rejects.toThrow('Not found');
    });
  });
});
