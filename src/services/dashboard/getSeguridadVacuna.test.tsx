// @vitest-environment jsdom
// src/services/dashboard/getSeguridadVacuna.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { get: mockGet },
}));

import { getSeguridadVacuna } from './getSeguridadVacuna';
import type { SeguridadVacunaItem } from './getSeguridadVacuna';

const mockBackend = [
  { idVacuna: 1, nombreVacuna: 'Pfizer',      indiceSeguridad: 0.92, reportesGraves: 10, totalReportes: 120 },
  { idVacuna: 2, nombreVacuna: 'AstraZeneca', indiceSeguridad: 0.85, reportesGraves: 15, totalReportes: 100 },
  { idVacuna: 3, nombreVacuna: 'Moderna',     indiceSeguridad: 0.88, reportesGraves: 8,  totalReportes: 80  },
  { idVacuna: 4, nombreVacuna: 'Janssen',     indiceSeguridad: 0.78, reportesGraves: 20, totalReportes: 90  },
  { idVacuna: 5, nombreVacuna: 'CoronaVac',   indiceSeguridad: 0.75, reportesGraves: 25, totalReportes: 100 },
  { idVacuna: 6, nombreVacuna: 'Sinopharm',   indiceSeguridad: 0.70, reportesGraves: 30, totalReportes: 100 },
];

describe('Servicio: getSeguridadVacuna', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a GET /dashboard/indice-seguridad', async () => {
    mockGet.mockResolvedValueOnce({ data: mockBackend });
    await getSeguridadVacuna();
    expect(mockGet).toHaveBeenCalledWith('/dashboard/indice-seguridad');
  });

  it('debe mapear nombreVacuna a label e indiceSeguridad a value', async () => {
    mockGet.mockResolvedValueOnce({ data: mockBackend.slice(0, 2) });
    const result = await getSeguridadVacuna();
    expect(result[0]).toEqual({ label: 'Pfizer',      value: 0.92 } satisfies SeguridadVacunaItem);
    expect(result[1]).toEqual({ label: 'AstraZeneca', value: 0.85 } satisfies SeguridadVacunaItem);
  });

  it('debe retornar máximo 5 items aunque la API devuelva más', async () => {
    mockGet.mockResolvedValueOnce({ data: mockBackend }); // 6 items
    const result = await getSeguridadVacuna();
    expect(result).toHaveLength(5);
  });

  it('debe respetar el orden original al limitar a 5 items', async () => {
    mockGet.mockResolvedValueOnce({ data: mockBackend });
    const result = await getSeguridadVacuna();
    expect(result[0].label).toBe('Pfizer');
    expect(result[4].label).toBe('CoronaVac');
  });

  it('debe retornar todos los items cuando la API devuelve menos de 5', async () => {
    mockGet.mockResolvedValueOnce({ data: mockBackend.slice(0, 3) });
    const result = await getSeguridadVacuna();
    expect(result).toHaveLength(3);
  });

  it('debe retornar arreglo vacío cuando la API devuelve vacío', async () => {
    mockGet.mockResolvedValueOnce({ data: [] });
    const result = await getSeguridadVacuna();
    expect(result).toEqual([]);
  });

  it('debe propagar el error cuando la API falla', async () => {
    mockGet.mockRejectedValueOnce(new Error('Server error'));
    await expect(getSeguridadVacuna()).rejects.toThrow('Server error');
  });
});
