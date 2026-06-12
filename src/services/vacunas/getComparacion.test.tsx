// @vitest-environment jsdom
// src/services/vacunas/getComparacion.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { get: mockGet },
}));

import { getComparacion } from './getComparacion';

const mockVacunaA = {
  nombre: 'Pfizer',
  farmaceutica: 'Pfizer Inc.',
  tipo: 'ARNm',
  costoUnitario: 19.50,
  temperatura: -70,
  tiempoAmbiente: 6,
  indiceSeguridad: 0.92,
  totalReportes: 120,
  efectosSecundarios: [],
  distribucionSeveridad: { leve: 80, moderado: 30, grave: 10 },
};

const mockVacunaB = {
  nombre: 'AstraZeneca',
  farmaceutica: 'AstraZeneca',
  tipo: 'Vector viral',
  costoUnitario: 4.00,
  temperatura: 4,
  tiempoAmbiente: null,
  indiceSeguridad: 0.85,
  totalReportes: 100,
  efectosSecundarios: [],
  distribucionSeveridad: { leve: 60, moderado: 25, grave: 15 },
};

describe('Servicio: getComparacion', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a GET /vacunas/:idA y /vacunas/:idB', async () => {
    mockGet
      .mockResolvedValueOnce({ data: mockVacunaA })
      .mockResolvedValueOnce({ data: mockVacunaB });
    await getComparacion(1, 2);
    expect(mockGet).toHaveBeenCalledWith('/vacunas/1');
    expect(mockGet).toHaveBeenCalledWith('/vacunas/2');
  });

  it('debe retornar vaccineA y vaccineB con los ids proporcionados', async () => {
    mockGet
      .mockResolvedValueOnce({ data: mockVacunaA })
      .mockResolvedValueOnce({ data: mockVacunaB });
    const result = await getComparacion(1, 2);
    expect(result.vaccineA).toBe(1);
    expect(result.vaccineB).toBe(2);
  });

  it('debe retornar exactamente 8 filas de comparación', async () => {
    mockGet
      .mockResolvedValueOnce({ data: mockVacunaA })
      .mockResolvedValueOnce({ data: mockVacunaB });
    const result = await getComparacion(1, 2);
    expect(result.rows).toHaveLength(8);
  });

  it('debe asignar "better" a la vacuna con mayor indiceSeguridad', async () => {
    // A: 0.92 > B: 0.85 → A es better
    mockGet
      .mockResolvedValueOnce({ data: mockVacunaA })
      .mockResolvedValueOnce({ data: mockVacunaB });
    const { rows } = await getComparacion(1, 2);
    const fila = rows.find((r) => r.label === 'Índice de Seguridad')!;
    expect(fila.left.status).toBe('better');
    expect(fila.right.status).toBe('worse');
  });

  it('debe asignar "better" a la vacuna con menor costoUnitario', async () => {
    // B: 4.00 < A: 19.50 → B es better
    mockGet
      .mockResolvedValueOnce({ data: mockVacunaA })
      .mockResolvedValueOnce({ data: mockVacunaB });
    const { rows } = await getComparacion(1, 2);
    const fila = rows.find((r) => r.label === 'Costo unitario')!;
    expect(fila.left.status).toBe('worse');
    expect(fila.right.status).toBe('better');
  });

  it('debe asignar "neutral" en ambos lados cuando indiceSeguridad es igual', async () => {
    mockGet
      .mockResolvedValueOnce({ data: { ...mockVacunaA, indiceSeguridad: 0.90 } })
      .mockResolvedValueOnce({ data: { ...mockVacunaB, indiceSeguridad: 0.90 } });
    const { rows } = await getComparacion(1, 2);
    const fila = rows.find((r) => r.label === 'Índice de Seguridad')!;
    expect(fila.left.status).toBe('neutral');
    expect(fila.right.status).toBe('neutral');
  });

  it('debe mostrar "Refrigerado" cuando tiempoAmbiente es null', async () => {
    // B tiene tiempoAmbiente: null
    mockGet
      .mockResolvedValueOnce({ data: mockVacunaA })
      .mockResolvedValueOnce({ data: mockVacunaB });
    const { rows } = await getComparacion(1, 2);
    const fila = rows.find((r) => r.label === 'Tiempo ambiente')!;
    expect(fila.right.value).toBe('Refrigerado');
  });

  it('debe mostrar "X hrs" cuando tiempoAmbiente tiene valor', async () => {
    // A tiene tiempoAmbiente: 6
    mockGet
      .mockResolvedValueOnce({ data: mockVacunaA })
      .mockResolvedValueOnce({ data: mockVacunaB });
    const { rows } = await getComparacion(1, 2);
    const fila = rows.find((r) => r.label === 'Tiempo ambiente')!;
    expect(fila.left.value).toBe('6 hrs');
  });

  it('debe formatear indiceSeguridad con 1 decimal y símbolo %', async () => {
    mockGet
      .mockResolvedValueOnce({ data: mockVacunaA })
      .mockResolvedValueOnce({ data: mockVacunaB });
    const { rows } = await getComparacion(1, 2);
    const fila = rows.find((r) => r.label === 'Índice de Seguridad')!;
    expect(fila.left.value).toBe('0.9%');  // (0.92).toFixed(1) → '0.9'
    expect(fila.right.value).toBe('0.8%'); // (0.85).toFixed(1) → '0.8' (IEEE 754)
  });

  it('debe formatear costoUnitario con $ y 2 decimales', async () => {
    mockGet
      .mockResolvedValueOnce({ data: mockVacunaA })
      .mockResolvedValueOnce({ data: mockVacunaB });
    const { rows } = await getComparacion(1, 2);
    const fila = rows.find((r) => r.label === 'Costo unitario')!;
    expect(fila.left.value).toBe('$19.50');
    expect(fila.right.value).toBe('$4.00');
  });

  it('debe propagar el error cuando alguno de los dos endpoints falla', async () => {
    mockGet
      .mockResolvedValueOnce({ data: mockVacunaA })
      .mockRejectedValueOnce(new Error('Not found'));
    await expect(getComparacion(1, 99)).rejects.toThrow('Not found');
  });
});
