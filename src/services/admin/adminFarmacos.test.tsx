// @vitest-environment jsdom
// src/services/admin/adminFarmacos.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockGet, mockPost, mockPut, mockDelete } = vi.hoisted(() => ({
  mockGet:    vi.fn(),
  mockPost:   vi.fn(),
  mockPut:    vi.fn(),
  mockDelete: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { get: mockGet, post: mockPost, put: mockPut, delete: mockDelete },
}));

import { getFarmacos, getFarmaco, crearFarmaco, editarFarmaco, eliminarFarmaco } from './adminFarmacos';
import type { Farmaco, CrearFarmacoDTO } from './adminFarmacos';

const mockFarmaco: Farmaco = {
  id: 1,
  nombre: 'Paracetamol',
  tipo: 'Analgésico',
  descripcion: 'Alivia el dolor',
};

const mockDTO: CrearFarmacoDTO = {
  nombre: 'Ibuprofeno',
  tipo: 'Antiinflamatorio',
  descripcion: 'Reduce la inflamación',
};

describe('Servicio: adminFarmacos', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getFarmacos', () => {
    it('debe llamar a GET /admin/farmacos', async () => {
      mockGet.mockResolvedValueOnce({ data: [mockFarmaco] });
      await getFarmacos();
      expect(mockGet).toHaveBeenCalledWith('/admin/farmacos');
    });

    it('debe retornar la lista de fármacos', async () => {
      mockGet.mockResolvedValueOnce({ data: [mockFarmaco] });
      const result = await getFarmacos();
      expect(result).toEqual([mockFarmaco]);
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));
      await expect(getFarmacos()).rejects.toThrow('Network error');
    });
  });

  describe('getFarmaco', () => {
    it('debe llamar a GET /admin/farmacos/:id con el id correcto', async () => {
      mockGet.mockResolvedValueOnce({ data: mockFarmaco });
      await getFarmaco(1);
      expect(mockGet).toHaveBeenCalledWith('/admin/farmacos/1');
    });

    it('debe retornar el fármaco correspondiente al id', async () => {
      mockGet.mockResolvedValueOnce({ data: mockFarmaco });
      const result = await getFarmaco(1);
      expect(result).toEqual(mockFarmaco);
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockGet.mockRejectedValueOnce(new Error('Not found'));
      await expect(getFarmaco(99)).rejects.toThrow('Not found');
    });
  });

  describe('crearFarmaco', () => {
    it('debe llamar a POST /admin/farmacos con el DTO correcto', async () => {
      mockPost.mockResolvedValueOnce({ data: { ...mockDTO, id: 2 } });
      await crearFarmaco(mockDTO);
      expect(mockPost).toHaveBeenCalledWith('/admin/farmacos', mockDTO);
    });

    it('debe retornar el fármaco creado', async () => {
      const created = { ...mockDTO, id: 2 };
      mockPost.mockResolvedValueOnce({ data: created });
      const result = await crearFarmaco(mockDTO);
      expect(result).toEqual(created);
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockPost.mockRejectedValueOnce(new Error('Bad request'));
      await expect(crearFarmaco(mockDTO)).rejects.toThrow('Bad request');
    });
  });

  describe('editarFarmaco', () => {
    it('debe llamar a PUT /admin/farmacos/:id con el DTO correcto', async () => {
      mockPut.mockResolvedValueOnce({ data: mockFarmaco });
      await editarFarmaco({ id: 1, farmaco: mockDTO });
      expect(mockPut).toHaveBeenCalledWith('/admin/farmacos/1', mockDTO);
    });

    it('debe retornar el fármaco actualizado', async () => {
      mockPut.mockResolvedValueOnce({ data: mockFarmaco });
      const result = await editarFarmaco({ id: 1, farmaco: mockDTO });
      expect(result).toEqual(mockFarmaco);
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockPut.mockRejectedValueOnce(new Error('Conflict'));
      await expect(editarFarmaco({ id: 1, farmaco: mockDTO })).rejects.toThrow('Conflict');
    });
  });

  describe('eliminarFarmaco', () => {
    it('debe llamar a DELETE /admin/farmacos/:id con el id correcto', async () => {
      mockDelete.mockResolvedValueOnce({});
      await eliminarFarmaco(1);
      expect(mockDelete).toHaveBeenCalledWith('/admin/farmacos/1');
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockDelete.mockRejectedValueOnce(new Error('Not found'));
      await expect(eliminarFarmaco(99)).rejects.toThrow('Not found');
    });
  });
});
