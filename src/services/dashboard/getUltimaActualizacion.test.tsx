// @vitest-environment jsdom
// src/services/dashboard/getUltimaActualizacion.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { get: mockGet },
}));

import { getUltimaActualizacion } from './getUltimaActualizacion';

describe('Servicio: getUltimaActualizacion', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a GET /dashboard/ultima-actualizacion', async () => {
    mockGet.mockResolvedValueOnce({ data: { fecha: '2026-01-15T10:30:00' } });
    await getUltimaActualizacion();
    expect(mockGet).toHaveBeenCalledWith('/dashboard/ultima-actualizacion');
  });

  it('debe retornar una cadena no vacía', async () => {
    mockGet.mockResolvedValueOnce({ data: { fecha: '2026-01-15T10:30:00' } });
    const result = await getUltimaActualizacion();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('debe incluir el año de la fecha recibida en la cadena formateada', async () => {
    mockGet.mockResolvedValueOnce({ data: { fecha: '2026-03-20T08:00:00' } });
    const result = await getUltimaActualizacion();
    expect(result).toContain('2026');
  });

  it('debe formatear fechas distintas de forma diferente', async () => {
    mockGet.mockResolvedValueOnce({ data: { fecha: '2025-06-10T09:00:00' } });
    const resultA = await getUltimaActualizacion();

    mockGet.mockResolvedValueOnce({ data: { fecha: '2026-12-31T23:59:00' } });
    const resultB = await getUltimaActualizacion();

    expect(resultA).not.toBe(resultB);
  });

  it('debe propagar el error cuando la API falla', async () => {
    mockGet.mockRejectedValueOnce(new Error('Server error'));
    await expect(getUltimaActualizacion()).rejects.toThrow('Server error');
  });
});
