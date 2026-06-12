// @vitest-environment jsdom
// src/services/historial/getHistorial.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { get: mockGet },
}));

import { getHistorialUsers, getHistorialKpis } from './getHistorial';
import type { HistorialUser, HistorialKpis } from './getHistorial';

const mockUsers: HistorialUser[] = [
  {
    id: 1,
    hora: '10:45 AM',
    nombre: 'Susana González',
    iniciales: 'SG',
    colorAvatar: '#14B8A6',
    accion: 'Creó usuario',
    resultado: 'Exitoso',
  },
];

const mockKpis: HistorialKpis = {
  usuariosActivos: 10,
  usuariosSuspendidos: 2,
  ultimoAcceso: 'Hace 1 min',
};

describe('Servicio: getHistorial', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getHistorialUsers', () => {
    it('debe llamar a GET /historial/usuarios', async () => {
      mockGet.mockResolvedValueOnce({ data: mockUsers });
      await getHistorialUsers();
      expect(mockGet).toHaveBeenCalledWith('/historial/usuarios');
    });

    it('debe retornar los datos de la API cuando el request es exitoso', async () => {
      mockGet.mockResolvedValueOnce({ data: mockUsers });
      const result = await getHistorialUsers();
      expect(result).toEqual(mockUsers);
    });

    it('debe retornar datos mock cuando la API falla', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));
      const result = await getHistorialUsers();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('no debe lanzar error cuando la API falla', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));
      await expect(getHistorialUsers()).resolves.toBeDefined();
    });

    it('los datos mock de fallback deben tener la forma de HistorialUser', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));
      const result = await getHistorialUsers();
      for (const user of result) {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('hora');
        expect(user).toHaveProperty('nombre');
        expect(user).toHaveProperty('iniciales');
        expect(user).toHaveProperty('colorAvatar');
        expect(user).toHaveProperty('accion');
        expect(user).toHaveProperty('resultado');
      }
    });
  });

  describe('getHistorialKpis', () => {
    it('debe llamar a GET /historial/kpis', async () => {
      mockGet.mockResolvedValueOnce({ data: mockKpis });
      await getHistorialKpis();
      expect(mockGet).toHaveBeenCalledWith('/historial/kpis');
    });

    it('debe retornar los KPIs de la API cuando el request es exitoso', async () => {
      mockGet.mockResolvedValueOnce({ data: mockKpis });
      const result = await getHistorialKpis();
      expect(result).toEqual(mockKpis);
    });

    it('debe retornar datos mock cuando la API falla', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));
      const result = await getHistorialKpis();
      expect(result).toHaveProperty('usuariosActivos');
      expect(result).toHaveProperty('usuariosSuspendidos');
      expect(result).toHaveProperty('ultimoAcceso');
    });

    it('no debe lanzar error cuando la API falla', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));
      await expect(getHistorialKpis()).resolves.toBeDefined();
    });

    it('los datos mock de fallback deben tener valores numéricos en usuariosActivos y usuariosSuspendidos', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));
      const result = await getHistorialKpis();
      expect(typeof result.usuariosActivos).toBe('number');
      expect(typeof result.usuariosSuspendidos).toBe('number');
    });
  });
});
