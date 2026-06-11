// @vitest-environment jsdom
// src/services/usuarios/deleteUsuario.integration.test.tsx
import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GestionUsuarios from '../../pages/GestionUsuarios';
import { deleteUsuario } from './deleteUsuario';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./deleteUsuario');

// ── otros servicios ───────────────────────────────────────────────────────
vi.mock('./getRolesForUsuarios', () => ({ getRolesForUsuarios: vi.fn().mockResolvedValue([]) }));
vi.mock('./createUsuario',       () => ({ createUsuario:       vi.fn() }));
vi.mock('./updateUsuario',       () => ({ updateUsuario:       vi.fn() }));
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
const usuarioAEliminar = {
  id: 'u1',
  nombre: 'Ana',  apellidoPaterno: 'López', apellidoMaterno: '',
  correo: 'ana@farmacov.com', departamento: 'IT', estado: 'ACTIVO',
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

describe('Integración: deleteUsuario → GestionUsuarios', () => {
  beforeEach(async () => {
    const { getUsuarios } = await import('./getUsuarios');
    vi.mocked(getUsuarios)
      .mockResolvedValueOnce([usuarioAEliminar])
      .mockResolvedValueOnce([]);           // lista vacía tras borrado

    vi.mocked(deleteUsuario).mockResolvedValue(undefined);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe llamar al servicio con el id correcto al confirmar eliminación', async () => {
    renderPage();

    fireEvent.click(await screen.findByText('Eliminar'));

    expect(await screen.findByTestId('modal-container')).toBeDefined();
    fireEvent.click(screen.getByText('Sí, eliminar'));

    await waitFor(() => {
      expect(vi.mocked(deleteUsuario)).toHaveBeenCalledWith('u1');
    });
  });

  it('debe eliminar la fila del usuario de la tabla tras borrado exitoso', async () => {
    renderPage();

    await screen.findByTestId('usuario-fila');
    fireEvent.click(screen.getByText('Eliminar'));

    expect(await screen.findByTestId('modal-container')).toBeDefined();
    fireEvent.click(screen.getByText('Sí, eliminar'));

    await waitFor(() => {
      expect(screen.queryAllByTestId('usuario-fila')).toHaveLength(0);
    });
  });
});
