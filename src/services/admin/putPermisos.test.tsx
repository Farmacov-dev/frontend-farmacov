// @vitest-environment jsdom
// src/services/admin/putPermisos.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockPut } = vi.hoisted(() => ({
  mockPut: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { put: mockPut },
}));

import { putPermisos } from './putPermisos';

describe('Servicio: putPermisos', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a PUT /admin/roles/:idRol/permisos con los permisos correctos', async () => {
    mockPut.mockResolvedValueOnce({});
    const permisos = { dashboard: true, catalogo: false, analisis: true };
    await putPermisos(1, permisos);
    expect(mockPut).toHaveBeenCalledWith('/admin/roles/1/permisos', permisos);
  });

  it('debe usar el idRol correcto en la URL', async () => {
    mockPut.mockResolvedValueOnce({});
    await putPermisos(5, { dashboard: false });
    expect(mockPut).toHaveBeenCalledWith('/admin/roles/5/permisos', { dashboard: false });
  });

  it('debe resolver sin valor cuando la API responde correctamente', async () => {
    mockPut.mockResolvedValueOnce({});
    const result = await putPermisos(1, { dashboard: true });
    expect(result).toBeUndefined();
  });

  it('debe propagar el error cuando la API falla', async () => {
    mockPut.mockRejectedValueOnce(new Error('Forbidden'));
    await expect(putPermisos(1, { dashboard: true })).rejects.toThrow('Forbidden');
  });

  it('debe manejar un objeto de permisos vacío', async () => {
    mockPut.mockResolvedValueOnce({});
    await putPermisos(2, {});
    expect(mockPut).toHaveBeenCalledWith('/admin/roles/2/permisos', {});
  });
});
