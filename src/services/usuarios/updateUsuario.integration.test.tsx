// @vitest-environment jsdom
// src/services/usuarios/updateUsuario.integration.test.tsx
import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GestionUsuarios from '../../pages/GestionUsuarios';
import { updateUsuario } from './updateUsuario';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./updateUsuario');

// ── otros servicios ───────────────────────────────────────────────────────
vi.mock('./getRolesForUsuarios', () => ({
  getRolesForUsuarios: vi.fn().mockResolvedValue([
    { id: 1, nombre: 'Viewer', esAdmin: false },
    { id: 2, nombre: 'Admin',  esAdmin: true  },
  ]),
}));
vi.mock('./createUsuario', () => ({ createUsuario: vi.fn() }));
vi.mock('./deleteUsuario', () => ({ deleteUsuario: vi.fn() }));
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
const usuarioOriginal = {
  id: 'u1',
  nombre: 'Ana',  apellidoPaterno: 'López', apellidoMaterno: '',
  correo: 'ana@farmacov.com', departamento: 'IT', estado: 'ACTIVO',
  rol: { id: 1, nombre: 'Viewer', esAdmin: false },
  creadoEn: '', actualizadoEn: '',
};

const usuarioActualizado = {
  ...usuarioOriginal,
  departamento: 'Ventas',
  rol: { id: 2, nombre: 'Admin', esAdmin: true },
};

const renderPage = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <GestionUsuarios />
    </QueryClientProvider>
  );
};

describe('Integración: updateUsuario → GestionUsuarios', () => {
  beforeEach(async () => {
    const { getUsuarios } = await import('./getUsuarios');
    vi.mocked(getUsuarios)
      .mockResolvedValueOnce([usuarioOriginal])
      .mockResolvedValueOnce([usuarioActualizado]);

    vi.mocked(updateUsuario).mockResolvedValue(usuarioActualizado);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe llamar al servicio con id y body correctos al guardar cambios', async () => {
    renderPage();

    fireEvent.click(await screen.findByText('Editar'));

    fireEvent.change(screen.getByLabelText('Departamento'), { target: { value: 'Ventas' } });
    fireEvent.change(screen.getByTestId('select-rol'),      { target: { value: 'Admin' } });

    fireEvent.click(screen.getByText('Guardar Cambios'));

    await waitFor(() => {
      expect(vi.mocked(updateUsuario)).toHaveBeenCalledWith(
        'u1',
        expect.objectContaining({ departamento: 'Ventas', idRol: 2 })
      );
    });
  });

  it('debe reflejar el nuevo departamento en la tabla tras una edición exitosa', async () => {
    renderPage();

    fireEvent.click(await screen.findByText('Editar'));

    fireEvent.change(screen.getByLabelText('Departamento'), { target: { value: 'Ventas' } });
    fireEvent.change(screen.getByTestId('select-rol'),      { target: { value: 'Admin' } });

    fireEvent.click(screen.getByText('Guardar Cambios'));

    await waitFor(() => {
      expect(screen.getByText('Ventas')).toBeDefined();
    });
  });
});
