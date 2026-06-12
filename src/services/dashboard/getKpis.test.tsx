// @vitest-environment jsdom
// src/services/dashboard/getKpis.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { get: mockGet },
}));

import { getKpis } from './getKpis';
import type { KpiData } from './getKpis';

const mockKpis: KpiData = {
  totalVacunas: 12,
  totalReportes: 320,
  reportesEsteMes: 45,
  porcentajeReportesGraves: 8.5,
};

describe('Servicio: getKpis', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a GET /dashboard/kpis', async () => {
    mockGet.mockResolvedValueOnce({ data: mockKpis });
    await getKpis();
    expect(mockGet).toHaveBeenCalledWith('/dashboard/kpis');
  });

  it('debe retornar los KPIs del dashboard', async () => {
    mockGet.mockResolvedValueOnce({ data: mockKpis });
    const result = await getKpis();
    expect(result).toEqual(mockKpis);
  });

  it('debe retornar todos los campos de KpiData', async () => {
    mockGet.mockResolvedValueOnce({ data: mockKpis });
    const result = await getKpis();
    expect(result).toHaveProperty('totalVacunas');
    expect(result).toHaveProperty('totalReportes');
    expect(result).toHaveProperty('reportesEsteMes');
    expect(result).toHaveProperty('porcentajeReportesGraves');
  });

  it('debe propagar el error cuando la API falla', async () => {
    mockGet.mockRejectedValueOnce(new Error('Unauthorized'));
    await expect(getKpis()).rejects.toThrow('Unauthorized');
  });
});
