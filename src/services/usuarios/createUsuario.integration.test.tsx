// @vitest-environment jsdom
// src/services/usuarios/createUsuario.integration.test.tsx
import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GestionUsuarios from '../../pages/GestionUsuarios';
import { createUsuario } from './createUsuario';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./createUsuario');

// ── otros servicios ───────────────────────────────────────────────────────
vi.mock('./getRolesForUsuarios', () => ({
  getRolesForUsuarios: vi.fn().mockResolvedValue([
    { id: 1, nombre: 'Viewer', esAdmin: false },
  ]),
}));
vi.mock('./updateUsuario', () => ({ updateUsuario: vi.fn() }));
vi.mock('./deleteUsuario', () => ({ deleteUsuario: vi.fn() }));

// getUsuarios: lista vacía inicialmente, nuevo usuario tras invalidación
vi.mock('./getUsuarios');

// ── dependencias visuales ─────────────────────────────────────────────────
vi.mock('../../components/composed/ModalContainer/ModalContainer', () => ({
  default: ({ isOpen, children }: any) => isOpen ? <div data-testid="modal-container">{children}</div> : null,
}));
vi.mock('../../components/SelectDropdown/SelectDropdown', () => ({
  default: ({ options, value, onChange, placeholder }: any) => (
    <select data-testid="select-rol" value={value ?? ''} onChange={e => onChange?.(e.target.value)}>
      <option value="">{placeholder}</option>
      {options?.map((o: string) => <option key={o} value={o}>{o}</option>)}
    </select>
  ),
}));
vi.mock('../../components/PageHeader/PageHeader', () => ({
  default: ({ title }: any) => <h1>{title}</h1>,
}));

// ── helpers ───────────────────────────────────────────────────────────────
const nuevoUsuario = {
  id: 'u3',
  nombre: 'Carlos',     apellidoPaterno: 'Ruiz', apellidoMaterno: '',
  correo: 'carlos@farmacov.com', departamento: '', estado: 'ACTIVO',
  rol: { id: 1, nombre: 'Viewer', esAdmin: false },
  creadoEn: '', actualizadoEn: '',
};

const renderPage = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <GestionUsuarios />
    </QueryClientProvider>
  );
};

describe('Integración: createUsuario → GestionUsuarios', () => {
  beforeEach(async () => {
    const { getUsuarios } = await import('./getUsuarios');
    vi.mocked(getUsuarios)
      .mockResolvedValueOnce([])            // carga inicial
      .mockResolvedValueOnce([nuevoUsuario]) // refetch tras mutación

    vi.mocked(createUsuario).mockResolvedValue(nuevoUsuario);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe llamar al servicio con los datos correctos al crear un usuario', async () => {
    renderPage();

    fireEvent.click(await screen.findByText('Nuevo Usuario'));

    fireEvent.change(screen.getByLabelText('Nombre'),          { target: { value: 'Carlos' } });
    fireEvent.change(screen.getByLabelText('Apellido Paterno'), { target: { value: 'Ruiz' } });
    fireEvent.change(screen.getByLabelText('Correo'),          { target: { value: 'carlos@farmacov.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'),      { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByTestId('select-rol'),         { target: { value: 'Viewer' } });

    fireEvent.click(screen.getByText('Crear Usuario'));

    await waitFor(() => {
      expect(vi.mocked(createUsuario)).toHaveBeenCalledWith(
        expect.objectContaining({
          nombre:          'Carlos',
          apellidoPaterno: 'Ruiz',
          correo:          'carlos@farmacov.com',
          password:        'Password1!',
          idRol:           1,
        })
      );
    });
  });

  it('debe mostrar el nuevo usuario en la tabla tras una creación exitosa', async () => {
    renderPage();

    fireEvent.click(await screen.findByText('Nuevo Usuario'));

    fireEvent.change(screen.getByLabelText('Nombre'),          { target: { value: 'Carlos' } });
    fireEvent.change(screen.getByLabelText('Apellido Paterno'), { target: { value: 'Ruiz' } });
    fireEvent.change(screen.getByLabelText('Correo'),          { target: { value: 'carlos@farmacov.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'),      { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByTestId('select-rol'),         { target: { value: 'Viewer' } });

    fireEvent.click(screen.getByText('Crear Usuario'));

    await waitFor(() => {
      const nombres = screen.getAllByTestId('usuario-nombre');
      expect(nombres.some(el => el.textContent === 'Carlos Ruiz')).toBe(true);
    });
  });
});
