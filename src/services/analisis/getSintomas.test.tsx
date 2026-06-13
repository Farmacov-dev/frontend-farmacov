// @vitest-environment jsdom
// src/services/analisis/getSintomas.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { get: mockGet },
}));

import { getSintomas, extraerVacunas, agruparPorSintoma } from './getSintomas';
import type { SintomaBackend } from './getSintomas';

const mockSintomas: SintomaBackend[] = [
  { esGrave: false, grupoEdad: '18-30', idSintoma: 1, idVacuna: 1, nombreSintoma: 'Fiebre',  nombreVacuna: 'Pfizer',      sexo: 'F', total: 10 },
  { esGrave: true,  grupoEdad: '31-50', idSintoma: 2, idVacuna: 2, nombreSintoma: 'Dolor',   nombreVacuna: 'AstraZeneca', sexo: 'M', total: 5  },
  { esGrave: false, grupoEdad: '18-30', idSintoma: 1, idVacuna: 1, nombreSintoma: 'Fiebre',  nombreVacuna: 'Pfizer',      sexo: 'M', total: 8  },
];

describe('Servicio: getSintomas', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  // ── getSintomas (async) ─────────────────────────────────────────────────

  describe('getSintomas', () => {
    it('debe llamar a GET /dashboard/resumen-sintomas sin params cuando no hay filtros', async () => {
      mockGet.mockResolvedValueOnce({ data: mockSintomas });
      await getSintomas();
      expect(mockGet).toHaveBeenCalledWith('/dashboard/resumen-sintomas', { params: {} });
    });

    it('debe incluir el parámetro sexo cuando se filtra por sexo', async () => {
      mockGet.mockResolvedValueOnce({ data: [] });
      await getSintomas({ sexo: 'F' });
      expect(mockGet).toHaveBeenCalledWith('/dashboard/resumen-sintomas', { params: { sexo: 'F' } });
    });

    it('debe incluir el parámetro grupoEdad cuando se filtra por grupo de edad', async () => {
      mockGet.mockResolvedValueOnce({ data: [] });
      await getSintomas({ grupoEdad: '18-30' });
      expect(mockGet).toHaveBeenCalledWith('/dashboard/resumen-sintomas', { params: { grupoEdad: '18-30' } });
    });

    it('debe incluir esGrave como string "true" cuando el filtro es true', async () => {
      mockGet.mockResolvedValueOnce({ data: [] });
      await getSintomas({ esGrave: true });
      expect(mockGet).toHaveBeenCalledWith('/dashboard/resumen-sintomas', { params: { esGrave: 'true' } });
    });

    it('debe incluir esGrave como string "false" cuando el filtro es false', async () => {
      mockGet.mockResolvedValueOnce({ data: [] });
      await getSintomas({ esGrave: false });
      expect(mockGet).toHaveBeenCalledWith('/dashboard/resumen-sintomas', { params: { esGrave: 'false' } });
    });

    it('debe incluir idVacuna cuando hay exactamente una vacuna seleccionada', async () => {
      mockGet.mockResolvedValueOnce({ data: [] });
      await getSintomas({ idVacunas: [3] });
      expect(mockGet).toHaveBeenCalledWith('/dashboard/resumen-sintomas', { params: { idVacuna: '3' } });
    });

    it('no debe incluir idVacuna cuando hay más de una vacuna seleccionada', async () => {
      mockGet.mockResolvedValueOnce({ data: [] });
      await getSintomas({ idVacunas: [1, 2] });
      expect(mockGet).toHaveBeenCalledWith('/dashboard/resumen-sintomas', { params: {} });
    });

    it('debe combinar múltiples filtros correctamente', async () => {
      mockGet.mockResolvedValueOnce({ data: [] });
      await getSintomas({ sexo: 'M', grupoEdad: '31-50', esGrave: true, idVacunas: [2] });
      expect(mockGet).toHaveBeenCalledWith('/dashboard/resumen-sintomas', {
        params: { sexo: 'M', grupoEdad: '31-50', esGrave: 'true', idVacuna: '2' },
      });
    });

    it('debe retornar los datos recibidos de la API', async () => {
      mockGet.mockResolvedValueOnce({ data: mockSintomas });
      const result = await getSintomas();
      expect(result).toEqual(mockSintomas);
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockGet.mockRejectedValueOnce(new Error('Server error'));
      await expect(getSintomas()).rejects.toThrow('Server error');
    });
  });

  // ── extraerVacunas (pura) ───────────────────────────────────────────────

  describe('extraerVacunas', () => {
    it('debe retornar una lista vacía cuando no hay datos', () => {
      expect(extraerVacunas([])).toEqual([]);
    });

    it('debe extraer las vacunas únicas del arreglo', () => {
      const result = extraerVacunas(mockSintomas);
      expect(result).toContainEqual({ id: 1, nombre: 'Pfizer' });
      expect(result).toContainEqual({ id: 2, nombre: 'AstraZeneca' });
    });

    it('debe deduplicar vacunas con el mismo idVacuna', () => {
      const result = extraerVacunas(mockSintomas);
      const pfizers = result.filter((v) => v.id === 1);
      expect(pfizers).toHaveLength(1);
    });

    it('debe retornar exactamente 2 vacunas para el mock con 2 vacunas distintas', () => {
      const result = extraerVacunas(mockSintomas);
      expect(result).toHaveLength(2);
    });

    it('debe manejar datos con una sola vacuna', () => {
      const soloUna: SintomaBackend[] = [mockSintomas[0], mockSintomas[2]];
      const result = extraerVacunas(soloUna);
      expect(result).toEqual([{ id: 1, nombre: 'Pfizer' }]);
    });
  });

  // ── agruparPorSintoma (pura) ────────────────────────────────────────────

  describe('agruparPorSintoma', () => {
    it('debe retornar una lista vacía cuando no hay datos', () => {
      expect(agruparPorSintoma([], [1])).toEqual([]);
    });

    it('debe retornar una lista vacía cuando vacunasSeleccionadas está vacío', () => {
      expect(agruparPorSintoma(mockSintomas, [])).toEqual([]);
    });

    it('debe sumar los totales del mismo síntoma y vacuna', () => {
      const result = agruparPorSintoma(mockSintomas, [1]);
      const fiebre = result.find((r) => r.sintoma === 'Fiebre');
      expect(fiebre).toBeDefined();
      expect(fiebre!['Pfizer']).toBe(18); // 10 + 8
    });

    it('debe incluir solo los síntomas de las vacunas seleccionadas', () => {
      const result = agruparPorSintoma(mockSintomas, [2]);
      const sintomas = result.map((r) => r.sintoma);
      expect(sintomas).toContain('Dolor');
      expect(sintomas).not.toContain('Fiebre');
    });

    it('debe incluir síntomas de ambas vacunas cuando ambas están seleccionadas', () => {
      const result = agruparPorSintoma(mockSintomas, [1, 2]);
      const sintomas = result.map((r) => r.sintoma);
      expect(sintomas).toContain('Fiebre');
      expect(sintomas).toContain('Dolor');
    });

    it('debe agregar el total de la vacuna como propiedad del objeto agrupado', () => {
      const result = agruparPorSintoma(mockSintomas, [2]);
      const dolor = result.find((r) => r.sintoma === 'Dolor');
      expect(dolor!['AstraZeneca']).toBe(5);
    });
  });
});
