// @vitest-environment jsdom
// src/services/vacunas/getPerfilRiesgo.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { get: mockGet },
}));

import { getPerfilRiesgo } from './getPerfilRiesgo';

const mockCostos = [
  { costoUnitario: 19.50, id: 1, idVacuna: 1, creadoEn: '', actualizadoEn: '' },
];
const mockSeguridad = {
  idVacuna: 1,
  indiceSeguridad: 0.92,
  reportesGraves: 12,
  totalReportes: 100,
};
const mockSintomas = [
  { esGrave: false, grupoEdad: '18-30', idSintoma: 1, idVacuna: 1, nombreSintoma: 'Fiebre',     nombreVacuna: 'Pfizer', sexo: 'F', total: 15 },
  { esGrave: true,  grupoEdad: '31-50', idSintoma: 2, idVacuna: 1, nombreSintoma: 'Dolor',      nombreVacuna: 'Pfizer', sexo: 'M', total: 8  },
  { esGrave: false, grupoEdad: '18-30', idSintoma: 1, idVacuna: 1, nombreSintoma: 'Fiebre',     nombreVacuna: 'Pfizer', sexo: 'M', total: 10 },
  { esGrave: true,  grupoEdad: '18-30', idSintoma: 3, idVacuna: 1, nombreSintoma: 'Anafilaxia', nombreVacuna: 'Pfizer', sexo: 'F', total: 3  },
];

const setupMocks = () =>
  mockGet
    .mockResolvedValueOnce({ data: mockCostos })
    .mockResolvedValueOnce({ data: mockSeguridad })
    .mockResolvedValueOnce({ data: mockSintomas });

describe('Servicio: getPerfilRiesgo', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a los 3 endpoints con el idVacuna correcto', async () => {
    setupMocks();
    await getPerfilRiesgo(1);
    expect(mockGet).toHaveBeenCalledWith('/dashboard/costos/1');
    expect(mockGet).toHaveBeenCalledWith('/dashboard/indice-seguridad/1');
    expect(mockGet).toHaveBeenCalledWith('/dashboard/resumen-sintomas', { params: { idVacuna: 1, limit: 5 } });
  });

  it('debe retornar el costoUnitario del primer elemento de costos', async () => {
    setupMocks();
    const result = await getPerfilRiesgo(1);
    expect(result.costoUnitario).toBe(19.50);
  });

  it('debe retornar 0 como costoUnitario cuando el arreglo de costos está vacío', async () => {
    mockGet
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: mockSeguridad })
      .mockResolvedValueOnce({ data: mockSintomas });
    const result = await getPerfilRiesgo(1);
    expect(result.costoUnitario).toBe(0);
  });

  it('debe retornar el indiceSeguridad del endpoint de seguridad', async () => {
    setupMocks();
    const result = await getPerfilRiesgo(1);
    expect(result.indiceSeguridad).toBe(0.92);
  });

  it('debe retornar el totalReportes del endpoint de seguridad', async () => {
    setupMocks();
    const result = await getPerfilRiesgo(1);
    expect(result.totalReportes).toBe(100);
  });

  it('debe calcular porcentajeSintomasGraves correctamente (reportesGraves/totalReportes * 100)', async () => {
    // 12 / 100 = 12%
    setupMocks();
    const result = await getPerfilRiesgo(1);
    expect(result.porcentajeSintomasGraves).toBe(12);
  });

  it('debe retornar 0 en porcentajeSintomasGraves cuando reportesGraves es 0', async () => {
    mockGet
      .mockResolvedValueOnce({ data: mockCostos })
      .mockResolvedValueOnce({ data: { ...mockSeguridad, reportesGraves: 0 } })
      .mockResolvedValueOnce({ data: mockSintomas });
    const result = await getPerfilRiesgo(1);
    expect(result.porcentajeSintomasGraves).toBe(0);
  });

  it('debe agrupar síntomas por nombre y sumar totales', async () => {
    setupMocks();
    const result = await getPerfilRiesgo(1);
    const fiebre = result.topSintomas.find((s) => s.label === 'Fiebre');
    expect(fiebre?.value).toBe(25); // 15 + 10
  });

  it('debe ordenar topSintomas de mayor a menor valor', async () => {
    setupMocks();
    const result = await getPerfilRiesgo(1);
    const values = result.topSintomas.map((s) => s.value);
    expect(values).toEqual([...values].sort((a, b) => b - a));
  });

  it('debe limitar topSintomas a un máximo de 5 resultados', async () => {
    const manySintomas = Array.from({ length: 10 }, (_, i) => ({
      esGrave: false, grupoEdad: '18-30', idSintoma: i, idVacuna: 1,
      nombreSintoma: `Sintoma${i}`, nombreVacuna: 'Pfizer', sexo: 'F', total: i + 1,
    }));
    mockGet
      .mockResolvedValueOnce({ data: mockCostos })
      .mockResolvedValueOnce({ data: mockSeguridad })
      .mockResolvedValueOnce({ data: manySintomas });
    const result = await getPerfilRiesgo(1);
    expect(result.topSintomas).toHaveLength(5);
  });

  it('debe retornar arreglo vacío en topSintomas cuando no hay síntomas', async () => {
    mockGet
      .mockResolvedValueOnce({ data: mockCostos })
      .mockResolvedValueOnce({ data: mockSeguridad })
      .mockResolvedValueOnce({ data: [] });
    const result = await getPerfilRiesgo(1);
    expect(result.topSintomas).toEqual([]);
  });

  it('debe propagar el error cuando algún endpoint falla', async () => {
    mockGet
      .mockResolvedValueOnce({ data: mockCostos })
      .mockRejectedValueOnce(new Error('Server error'));
    await expect(getPerfilRiesgo(1)).rejects.toThrow('Server error');
  });
});
