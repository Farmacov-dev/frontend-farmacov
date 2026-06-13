// @vitest-environment jsdom
// src/services/admin/adminVacunas.test.tsx
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

import { getVacunas, crearVacuna, editarVacuna, eliminarVacuna, getVacuna } from './adminVacunas';
import type { Vacuna, CrearVacunaDTO } from './adminVacunas';

const mockVacuna: Vacuna = {
  idVacuna: 1,
  idFarmaco: 10,
  nombre: 'Comirnaty',
  farmaceutica: 'Pfizer',
  tipo: 'ARNm',
  temperatura: -70,
  tiempoAmbiente: 6,
  costoUnitario: 15,
  efectividad: 95,
};

const mockDTO: CrearVacunaDTO = {
  idFarmaco: 10,
  nombre: 'Comirnaty',
  farmaceutica: 'Pfizer',
  tipo: 'ARNm',
  descripcionGeneral: 'Vacuna ARNm contra COVID-19',
};

describe('Servicio: adminVacunas', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getVacunas', () => {
    it('debe llamar a GET /vacunas', async () => {
      mockGet.mockResolvedValueOnce({ data: [mockVacuna] });
      await getVacunas();
      expect(mockGet).toHaveBeenCalledWith('/vacunas');
    });

    it('debe retornar la lista de vacunas', async () => {
      mockGet.mockResolvedValueOnce({ data: [mockVacuna] });
      const result = await getVacunas();
      expect(result).toEqual([mockVacuna]);
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockGet.mockRejectedValueOnce(new Error('Network error'));
      await expect(getVacunas()).rejects.toThrow('Network error');
    });
  });

  describe('getVacuna', () => {
    it('debe llamar a GET /vacunas/:id con el id correcto', async () => {
      mockGet.mockResolvedValueOnce({ data: mockVacuna });
      await getVacuna(1);
      expect(mockGet).toHaveBeenCalledWith('/vacunas/1');
    });

    it('debe retornar la vacuna correspondiente al id', async () => {
      mockGet.mockResolvedValueOnce({ data: mockVacuna });
      const result = await getVacuna(1);
      expect(result).toEqual(mockVacuna);
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockGet.mockRejectedValueOnce(new Error('Not found'));
      await expect(getVacuna(99)).rejects.toThrow('Not found');
    });
  });

  describe('crearVacuna', () => {
    it('debe llamar a POST /vacunas/:id con el DTO correcto', async () => {
      mockPost.mockResolvedValueOnce({ data: mockVacuna });
      await crearVacuna({ id: 10, vacuna: mockDTO });
      expect(mockPost).toHaveBeenCalledWith('/vacunas/10', mockDTO);
    });

    it('debe retornar la vacuna creada', async () => {
      mockPost.mockResolvedValueOnce({ data: mockVacuna });
      const result = await crearVacuna({ id: 10, vacuna: mockDTO });
      expect(result).toEqual(mockVacuna);
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockPost.mockRejectedValueOnce(new Error('Bad request'));
      await expect(crearVacuna({ id: 10, vacuna: mockDTO })).rejects.toThrow('Bad request');
    });
  });

  describe('editarVacuna', () => {
    it('debe llamar a PUT /vacunas/:id con el DTO correcto', async () => {
      mockPut.mockResolvedValueOnce({ data: mockVacuna });
      await editarVacuna({ id: 1, vacuna: mockDTO });
      expect(mockPut).toHaveBeenCalledWith('/vacunas/1', mockDTO);
    });

    it('debe retornar la vacuna actualizada', async () => {
      mockPut.mockResolvedValueOnce({ data: mockVacuna });
      const result = await editarVacuna({ id: 1, vacuna: mockDTO });
      expect(result).toEqual(mockVacuna);
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockPut.mockRejectedValueOnce(new Error('Conflict'));
      await expect(editarVacuna({ id: 1, vacuna: mockDTO })).rejects.toThrow('Conflict');
    });
  });

  describe('eliminarVacuna', () => {
    it('debe llamar a DELETE /vacunas/:id con el id correcto', async () => {
      mockDelete.mockResolvedValueOnce({});
      await eliminarVacuna(1);
      expect(mockDelete).toHaveBeenCalledWith('/vacunas/1');
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockDelete.mockRejectedValueOnce(new Error('Not found'));
      await expect(eliminarVacuna(99)).rejects.toThrow('Not found');
    });
  });
});
