// @vitest-environment jsdom
// src/services/admin/getRoles.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockGet, mockPost, mockDelete } = vi.hoisted(() => ({
  mockGet:    vi.fn(),
  mockPost:   vi.fn(),
  mockDelete: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { get: mockGet, post: mockPost, delete: mockDelete },
}));

import { getRoles, crearRol, eliminarRol } from './getRoles';
import type { Rol } from './getRoles';

const mockRol: Rol = {
  id: 1,
  nombre: 'Administrador',
  esAdmin: true,
  permisos: { dashboard: true, catalogo: false, analisis: true },
};

describe('Servicio: getRoles', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getRoles', () => {
    it('debe llamar a GET /admin/roles', async () => {
      mockGet.mockResolvedValueOnce({ data: [mockRol] });
      await getRoles();
      expect(mockGet).toHaveBeenCalledWith('/admin/roles');
    });

    it('debe retornar la lista de roles', async () => {
      mockGet.mockResolvedValueOnce({ data: [mockRol] });
      const result = await getRoles();
      expect(result).toEqual([mockRol]);
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockGet.mockRejectedValueOnce(new Error('Unauthorized'));
      await expect(getRoles()).rejects.toThrow('Unauthorized');
    });
  });

  describe('crearRol', () => {
    it('debe llamar a POST /admin/roles con nombre y esAdmin', async () => {
      mockPost.mockResolvedValueOnce({ data: mockRol });
      await crearRol({ nombre: 'Administrador', esAdmin: true });
      expect(mockPost).toHaveBeenCalledWith('/admin/roles', { nombre: 'Administrador', esAdmin: true });
    });

    it('debe llamar a POST /admin/roles solo con nombre si esAdmin es omitido', async () => {
      mockPost.mockResolvedValueOnce({ data: { ...mockRol, esAdmin: false } });
      await crearRol({ nombre: 'Analista' });
      expect(mockPost).toHaveBeenCalledWith('/admin/roles', { nombre: 'Analista' });
    });

    it('debe retornar el rol creado', async () => {
      mockPost.mockResolvedValueOnce({ data: mockRol });
      const result = await crearRol({ nombre: 'Administrador', esAdmin: true });
      expect(result).toEqual(mockRol);
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockPost.mockRejectedValueOnce(new Error('Conflict'));
      await expect(crearRol({ nombre: 'Duplicado' })).rejects.toThrow('Conflict');
    });
  });

  describe('eliminarRol', () => {
    it('debe llamar a DELETE /admin/roles/:idRol con el id correcto', async () => {
      mockDelete.mockResolvedValueOnce({ data: null });
      await eliminarRol(1);
      expect(mockDelete).toHaveBeenCalledWith('/admin/roles/1');
    });

    it('debe retornar la respuesta de la API', async () => {
      mockDelete.mockResolvedValueOnce({ data: { mensaje: 'Rol eliminado' } });
      const result = await eliminarRol(1);
      expect(result).toEqual({ mensaje: 'Rol eliminado' });
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockDelete.mockRejectedValueOnce(new Error('Not found'));
      await expect(eliminarRol(99)).rejects.toThrow('Not found');
    });
  });
});
