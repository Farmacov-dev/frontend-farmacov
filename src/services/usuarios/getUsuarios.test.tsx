// @vitest-environment jsdom
// src/services/usuarios/getUsuarios.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { get: mockGet },
}));

import { getUsuarios } from './getUsuarios';
import type { Usuario } from './getUsuarios';

const mockUsuarios: Usuario[] = [
  {
    id: 'abc-123',
    nombre: 'Ana',
    apellidoPaterno: 'García',
    apellidoMaterno: 'López',
    correo: 'ana@farmacov.com',
    departamento: 'TI',
    estado: 'activo',
    rol: { id: 1, nombre: 'Admin', esAdmin: true },
    creadoEn: '2026-01-01T00:00:00',
    actualizadoEn: '2026-01-01T00:00:00',
  },
  {
    id: 'def-456',
    nombre: 'Carlos',
    apellidoPaterno: 'Martínez',
    apellidoMaterno: 'Ruiz',
    correo: 'carlos@farmacov.com',
    departamento: 'Finanzas',
    estado: 'activo',
    rol: { id: 2, nombre: 'Analista', esAdmin: false },
    creadoEn: '2026-02-01T00:00:00',
    actualizadoEn: '2026-02-01T00:00:00',
  },
];

describe('Servicio: getUsuarios', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a GET /usuarios', async () => {
    mockGet.mockResolvedValueOnce({ data: mockUsuarios });
    await getUsuarios();
    expect(mockGet).toHaveBeenCalledWith('/usuarios');
  });

  it('debe retornar la lista de usuarios', async () => {
    mockGet.mockResolvedValueOnce({ data: mockUsuarios });
    const result = await getUsuarios();
    expect(result).toEqual(mockUsuarios);
  });

  it('debe retornar arreglo vacío cuando no hay usuarios', async () => {
    mockGet.mockResolvedValueOnce({ data: [] });
    const result = await getUsuarios();
    expect(result).toEqual([]);
  });

  it('debe propagar el error cuando la API falla', async () => {
    mockGet.mockRejectedValueOnce(new Error('Unauthorized'));
    await expect(getUsuarios()).rejects.toThrow('Unauthorized');
  });
});
