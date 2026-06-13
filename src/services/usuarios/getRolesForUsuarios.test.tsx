// @vitest-environment jsdom
// src/services/usuarios/getRolesForUsuarios.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { get: mockGet },
}));

import { getRolesForUsuarios } from './getRolesForUsuarios';
import type { RolSimple } from './getRolesForUsuarios';

const mockRoles: RolSimple[] = [
  { id: 1, nombre: 'Administrador', esAdmin: true  },
  { id: 2, nombre: 'Analista',      esAdmin: false },
];

describe('Servicio: getRolesForUsuarios', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a GET /roles', async () => {
    mockGet.mockResolvedValueOnce({ data: mockRoles });
    await getRolesForUsuarios();
    expect(mockGet).toHaveBeenCalledWith('/roles');
  });

  it('debe retornar la lista de roles', async () => {
    mockGet.mockResolvedValueOnce({ data: mockRoles });
    const result = await getRolesForUsuarios();
    expect(result).toEqual(mockRoles);
  });

  it('debe retornar arreglo vacío cuando no hay roles', async () => {
    mockGet.mockResolvedValueOnce({ data: [] });
    const result = await getRolesForUsuarios();
    expect(result).toEqual([]);
  });

  it('debe propagar el error cuando la API falla', async () => {
    mockGet.mockRejectedValueOnce(new Error('Unauthorized'));
    await expect(getRolesForUsuarios()).rejects.toThrow('Unauthorized');
  });
});
