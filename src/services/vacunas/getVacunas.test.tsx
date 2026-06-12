// @vitest-environment jsdom
// src/services/vacunas/getVacunas.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { get: mockGet },
}));

import { getVacunas } from './getVacunas';

const mockDTO = {
  idVacuna: 1,
  nombre: 'Comirnaty',
  farmaceutica: 'Pfizer',
  costoUnitario: 19.50,
  temperatura: -70,
  indiceSeguridad: 0.92,
  efectividad: null,
  tiempoAmbiente: 6,
};

describe('Servicio: getVacunas', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a GET /vacunas', async () => {
    mockGet.mockResolvedValueOnce({ data: [mockDTO] });
    await getVacunas();
    expect(mockGet).toHaveBeenCalledWith('/vacunas');
  });

  it('debe mapear idVacuna a id y nombre/farmaceutica/costoUnitario correctamente', async () => {
    mockGet.mockResolvedValueOnce({ data: [mockDTO] });
    const [vacuna] = await getVacunas();
    expect(vacuna.id).toBe(1);
    expect(vacuna.name).toBe('Comirnaty');
    expect(vacuna.farmaceutica).toBe('Pfizer');
    expect(vacuna.costoUnitario).toBe(19.50);
  });

  it('debe formatear la temperatura con °C', async () => {
    mockGet.mockResolvedValueOnce({ data: [mockDTO] });
    const [vacuna] = await getVacunas();
    expect(vacuna.temperatura).toBe('-70°C');
  });

  it('debe usar indiceSeguridad cuando está disponible', async () => {
    mockGet.mockResolvedValueOnce({ data: [{ ...mockDTO, indiceSeguridad: 0.88 }] });
    const [vacuna] = await getVacunas();
    expect(vacuna.indice_seguridad).toBe(0.88);
  });

  it('debe usar efectividad como fallback cuando indiceSeguridad es falsy', async () => {
    mockGet.mockResolvedValueOnce({ data: [{ ...mockDTO, indiceSeguridad: 0, efectividad: 75 }] });
    const [vacuna] = await getVacunas();
    expect(vacuna.indice_seguridad).toBe(75);
  });

  it('debe usar 0 cuando tanto indiceSeguridad como efectividad son falsy', async () => {
    mockGet.mockResolvedValueOnce({ data: [{ ...mockDTO, indiceSeguridad: 0, efectividad: null }] });
    const [vacuna] = await getVacunas();
    expect(vacuna.indice_seguridad).toBe(0);
  });

  it('debe usar "hora" en singular cuando tiempoAmbiente es 1', async () => {
    mockGet.mockResolvedValueOnce({ data: [{ ...mockDTO, tiempoAmbiente: 1 }] });
    const [vacuna] = await getVacunas();
    expect(vacuna.longevidad).toBe('1 hora (ambiente)');
  });

  it('debe usar "horas" en plural cuando tiempoAmbiente es mayor a 1', async () => {
    mockGet.mockResolvedValueOnce({ data: [{ ...mockDTO, tiempoAmbiente: 6 }] });
    const [vacuna] = await getVacunas();
    expect(vacuna.longevidad).toBe('6 horas (ambiente)');
  });

  it('debe retornar arreglo vacío cuando la API devuelve vacío', async () => {
    mockGet.mockResolvedValueOnce({ data: [] });
    const result = await getVacunas();
    expect(result).toEqual([]);
  });

  it('debe propagar el error cuando la API falla', async () => {
    mockGet.mockRejectedValueOnce(new Error('Server error'));
    await expect(getVacunas()).rejects.toThrow('Server error');
  });
});
