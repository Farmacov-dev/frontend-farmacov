// @vitest-environment jsdom
// src/services/dashboard/getTopSintomas.test.tsx
import { describe, it, expect, vi } from 'vitest';

vi.mock('../api', () => ({
  default: { get: vi.fn() },
}));

import { getTopSintomas } from './getTopSintomas';

describe('Servicio: getTopSintomas', () => {
  it('debe retornar exactamente 5 síntomas', async () => {
    const result = await getTopSintomas();
    expect(result).toHaveLength(5);
  });

  it('cada síntoma debe tener las propiedades label y value', async () => {
    const result = await getTopSintomas();
    for (const item of result) {
      expect(item).toHaveProperty('label');
      expect(item).toHaveProperty('value');
      expect(typeof item.label).toBe('string');
      expect(typeof item.value).toBe('number');
    }
  });

  it('el primer síntoma debe ser Miocarditis con value 4', async () => {
    const result = await getTopSintomas();
    expect(result[0]).toEqual({ label: 'Miocarditis', value: 4 });
  });

  it('debe incluir Anafilaxia en los síntomas retornados', async () => {
    const result = await getTopSintomas();
    const labels = result.map((s) => s.label);
    expect(labels).toContain('Anafilaxia');
  });

  it('debe incluir Trombosis en los síntomas retornados', async () => {
    const result = await getTopSintomas();
    const labels = result.map((s) => s.label);
    expect(labels).toContain('Trombosis');
  });
});
