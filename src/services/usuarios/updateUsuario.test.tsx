// @vitest-environment jsdom
// src/services/usuarios/updateUsuario.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockPut } = vi.hoisted(() => ({
  mockPut: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { put: mockPut },
}));

import { updateUsuario } from './updateUsuario';
import type { UpdateUsuarioBody } from './updateUsuario';
import type { Usuario } from './getUsuarios';

const mockBody: UpdateUsuarioBody = {
  departamento: 'Finanzas',
  idRol: 3,
};

const mockUsuario: Usuario = {
  id: 'abc-123',
  nombre: 'Ana',
  apellidoPaterno: 'García',
  apellidoMaterno: '',
  correo: 'ana@farmacov.com',
  departamento: 'Finanzas',
  estado: 'activo',
  rol: { id: 3, nombre: 'Finanzas', esAdmin: false },
  creadoEn: '2026-01-01T00:00:00',
  actualizadoEn: '2026-06-12T00:00:00',
};

describe('Servicio: updateUsuario', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a PUT /usuarios/:id con el id y body correctos', async () => {
    mockPut.mockResolvedValueOnce({ data: mockUsuario });
    await updateUsuario('abc-123', mockBody);
    expect(mockPut).toHaveBeenCalledWith('/usuarios/abc-123', mockBody);
  });

  it('debe usar el id exacto proporcionado en la URL', async () => {
    mockPut.mockResolvedValueOnce({ data: mockUsuario });
    await updateUsuario('xyz-789', mockBody);
    expect(mockPut).toHaveBeenCalledWith('/usuarios/xyz-789', mockBody);
  });

  it('debe retornar el usuario actualizado', async () => {
    mockPut.mockResolvedValueOnce({ data: mockUsuario });
    const result = await updateUsuario('abc-123', mockBody);
    expect(result).toEqual(mockUsuario);
  });

  it('debe enviar ambos campos del body (departamento e idRol)', async () => {
    mockPut.mockResolvedValueOnce({ data: mockUsuario });
    await updateUsuario('abc-123', { departamento: 'Operaciones', idRol: 4 });
    expect(mockPut).toHaveBeenCalledWith('/usuarios/abc-123', { departamento: 'Operaciones', idRol: 4 });
  });

  it('debe propagar el error cuando la API falla', async () => {
    mockPut.mockRejectedValueOnce(new Error('Not found'));
    await expect(updateUsuario('nonexistent', mockBody)).rejects.toThrow('Not found');
  });
});
