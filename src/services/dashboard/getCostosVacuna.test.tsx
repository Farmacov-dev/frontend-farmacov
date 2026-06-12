// @vitest-environment jsdom
// src/services/dashboard/getCostosVacuna.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { get: mockGet },
}));

import { getCostosVacuna } from './getCostosVacuna';
import type { CostoVacunaItem } from './getCostosVacuna';

describe('Servicio: getCostosVacuna', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a GET /dashboard/costos', async () => {
    mockGet.mockResolvedValueOnce({ data: [] });
    await getCostosVacuna();
    expect(mockGet).toHaveBeenCalledWith('/dashboard/costos');
  });

  it('debe mapear nombreVacuna a label y costoUnitario a value', async () => {
    mockGet.mockResolvedValueOnce({
      data: [
        { nombreVacuna: 'Comirnaty', costoUnitario: 19.50 },
        { nombreVacuna: 'Spikevax',  costoUnitario: 25.00 },
      ],
    });
    const result = await getCostosVacuna();
    expect(result).toEqual([
      { label: 'Comirnaty', value: 19.50 },
      { label: 'Spikevax',  value: 25.00 },
    ] satisfies CostoVacunaItem[]);
  });

  it('debe convertir costoUnitario a número cuando la API lo devuelve como string', async () => {
    mockGet.mockResolvedValueOnce({
      data: [{ nombreVacuna: 'Janssen', costoUnitario: '10.00' }],
    });
    const result = await getCostosVacuna();
    expect(typeof result[0].value).toBe('number');
    expect(result[0].value).toBe(10);
  });

  it('debe retornar arreglo vacío cuando la API devuelve vacío', async () => {
    mockGet.mockResolvedValueOnce({ data: [] });
    const result = await getCostosVacuna();
    expect(result).toEqual([]);
  });

  it('debe propagar el error cuando la API falla', async () => {
    mockGet.mockRejectedValueOnce(new Error('Network error'));
    await expect(getCostosVacuna()).rejects.toThrow('Network error');
  });
});
