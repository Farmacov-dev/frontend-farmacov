// @vitest-environment jsdom
// src/services/vacunas/getVacunaDetalle.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { get: mockGet },
}));

import { getVacunaDetalle } from './getVacunaDetalle';

const mockDTO = {
  idVacuna: 5,
  nombre: 'Comirnaty',
  farmaceutica: 'Pfizer',
  tipo: 'ARNm',
  descripcionGeneral: 'Vacuna contra COVID-19',
  temperatura: -70,
  tiempoAmbiente: 6,
  costoUnitario: 19.50,
  efectosSecundarios: [{ descripcion: 'Dolor en el brazo', severidad: 'leve' as const }],
};

describe('Servicio: getVacunaDetalle', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a GET /vacunas/:id con el id correcto', async () => {
    mockGet.mockResolvedValueOnce({ data: mockDTO });
    await getVacunaDetalle(5);
    expect(mockGet).toHaveBeenCalledWith('/vacunas/5');
  });

  it('debe retornar todos los campos del detalle', async () => {
    mockGet.mockResolvedValueOnce({ data: mockDTO });
    const result = await getVacunaDetalle(5);
    expect(result.nombre).toBe('Comirnaty');
    expect(result.farmaceutica).toBe('Pfizer');
    expect(result.tipo).toBe('ARNm');
    expect(result.descripcionGeneral).toBe('Vacuna contra COVID-19');
    expect(result.temperatura).toBe(-70);
    expect(result.tiempoAmbiente).toBe(6);
    expect(result.costoUnitario).toBe(19.50);
    expect(result.efectosSecundarios).toEqual([{ descripcion: 'Dolor en el brazo', severidad: 'leve' }]);
  });

  it('debe usar idVacuna del DTO como id cuando está presente', async () => {
    mockGet.mockResolvedValueOnce({ data: { ...mockDTO, idVacuna: 5 } });
    const result = await getVacunaDetalle(99);
    expect(result.id).toBe(5);
  });

  it('debe usar id del DTO como fallback cuando idVacuna es undefined', async () => {
    const { idVacuna: _, ...rest } = mockDTO;
    mockGet.mockResolvedValueOnce({ data: { ...rest, id: 7 } });
    const result = await getVacunaDetalle(99);
    expect(result.id).toBe(7);
  });

  it('debe usar el id del parámetro como fallback cuando idVacuna e id son undefined', async () => {
    const { idVacuna: _, ...rest } = mockDTO;
    mockGet.mockResolvedValueOnce({ data: rest });
    const result = await getVacunaDetalle(42);
    expect(result.id).toBe(42);
  });

  it('debe manejar tiempoAmbiente null', async () => {
    mockGet.mockResolvedValueOnce({ data: { ...mockDTO, tiempoAmbiente: null } });
    const result = await getVacunaDetalle(5);
    expect(result.tiempoAmbiente).toBeNull();
  });

  it('debe propagar el error cuando la API falla', async () => {
    mockGet.mockRejectedValueOnce(new Error('Not found'));
    await expect(getVacunaDetalle(99)).rejects.toThrow('Not found');
  });
});
