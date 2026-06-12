// @vitest-environment jsdom
// src/services/usuarios/deleteUsuario.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockDelete } = vi.hoisted(() => ({
  mockDelete: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { delete: mockDelete },
}));

import { deleteUsuario } from './deleteUsuario';

describe('Servicio: deleteUsuario', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a DELETE /usuarios/:id con el id correcto', async () => {
    mockDelete.mockResolvedValueOnce({});
    await deleteUsuario('abc-123');
    expect(mockDelete).toHaveBeenCalledWith('/usuarios/abc-123');
  });

  it('debe usar el id exacto proporcionado en la URL', async () => {
    mockDelete.mockResolvedValueOnce({});
    await deleteUsuario('user-xyz-789');
    expect(mockDelete).toHaveBeenCalledWith('/usuarios/user-xyz-789');
  });

  it('debe resolver sin valor cuando la eliminación es exitosa', async () => {
    mockDelete.mockResolvedValueOnce({});
    const result = await deleteUsuario('abc-123');
    expect(result).toBeUndefined();
  });

  it('debe propagar el error cuando la API falla', async () => {
    mockDelete.mockRejectedValueOnce(new Error('Not found'));
    await expect(deleteUsuario('nonexistent')).rejects.toThrow('Not found');
  });
});
