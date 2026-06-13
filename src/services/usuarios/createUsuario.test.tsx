// @vitest-environment jsdom
// src/services/usuarios/createUsuario.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockPost } = vi.hoisted(() => ({
  mockPost: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { post: mockPost },
}));

import { createUsuario } from './createUsuario';
import type { CreateUsuarioBody } from './createUsuario';
import type { Usuario } from './getUsuarios';

const mockBody: CreateUsuarioBody = {
  nombre: 'Ana',
  apellidoPaterno: 'García',
  correo: 'ana@farmacov.com',
  password: 'Pass123!',
  idRol: 2,
};

const mockUsuario: Usuario = {
  id: 'abc-123',
  nombre: 'Ana',
  apellidoPaterno: 'García',
  apellidoMaterno: '',
  correo: 'ana@farmacov.com',
  departamento: 'TI',
  estado: 'activo',
  rol: { id: 2, nombre: 'Analista', esAdmin: false },
  creadoEn: '2026-01-01T00:00:00',
  actualizadoEn: '2026-01-01T00:00:00',
};

describe('Servicio: createUsuario', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a POST /auth/registro con el body correcto', async () => {
    mockPost.mockResolvedValueOnce({ data: mockUsuario });
    await createUsuario(mockBody);
    expect(mockPost).toHaveBeenCalledWith('/auth/registro', mockBody);
  });

  it('debe retornar el usuario creado por la API', async () => {
    mockPost.mockResolvedValueOnce({ data: mockUsuario });
    const result = await createUsuario(mockBody);
    expect(result).toEqual(mockUsuario);
  });

  it('debe aceptar body sin campos opcionales (apellidoMaterno y departamento)', async () => {
    mockPost.mockResolvedValueOnce({ data: mockUsuario });
    const bodyMinimo: CreateUsuarioBody = {
      nombre: 'Ana',
      apellidoPaterno: 'García',
      correo: 'ana@farmacov.com',
      password: 'Pass123!',
      idRol: 2,
    };
    await createUsuario(bodyMinimo);
    expect(mockPost).toHaveBeenCalledWith('/auth/registro', bodyMinimo);
  });

  it('debe propagar el error cuando la API falla', async () => {
    mockPost.mockRejectedValueOnce(new Error('Conflict'));
    await expect(createUsuario(mockBody)).rejects.toThrow('Conflict');
  });
});
