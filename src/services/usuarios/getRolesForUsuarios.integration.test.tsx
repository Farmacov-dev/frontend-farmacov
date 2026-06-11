// @vitest-environment jsdom
// src/services/usuarios/getRolesForUsuarios.integration.test.tsx
import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GestionUsuarios from '../../pages/GestionUsuarios';
import { getRolesForUsuarios } from './getRolesForUsuarios';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./getRolesForUsuarios');

// ── otros servicios (datos neutros) ──────────────────────────────────────
vi.mock('./getUsuarios',   () => ({ getUsuarios:   vi.fn().mockResolvedValue([]) }));
vi.mock('./createUsuario', () => ({ createUsuario: vi.fn() }));
vi.mock('./updateUsuario', () => ({ updateUsuario: vi.fn() }));
vi.mock('./deleteUsuario', () => ({ deleteUsuario: vi.fn() }));

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
const mockRoles = [
  { id: 1, nombre: 'Viewer', esAdmin: false },
  { id: 2, nombre: 'Admin',  esAdmin: true  },
];

const renderPage = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <GestionUsuarios />
    </QueryClientProvider>
  );
};

describe('Integración: getRolesForUsuarios → GestionUsuarios', () => {
  beforeEach(() => {
    vi.mocked(getRolesForUsuarios).mockResolvedValue(mockRoles);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe poblar el select de roles en el formulario de creación', async () => {
    renderPage();

    fireEvent.click(await screen.findByText('Nuevo Usuario'));

    const select = await screen.findByTestId('select-rol');
    expect(select.innerHTML).toContain('Viewer');
    expect(select.innerHTML).toContain('Admin');
  });

  it('debe poblar el select de roles en el formulario de edición', async () => {
    const usuarioBase = {
      id: 'u1',
      nombre: 'Ana', apellidoPaterno: 'López', apellidoMaterno: '',
      correo: 'ana@farmacov.com', departamento: 'IT', estado: 'ACTIVO',
      rol: { id: 1, nombre: 'Viewer', esAdmin: false },
      creadoEn: '', actualizadoEn: '',
    };

    const { getUsuarios } = await import('./getUsuarios');
    vi.mocked(getUsuarios).mockResolvedValue([usuarioBase]);

    renderPage();

    fireEvent.click(await screen.findByText('Editar'));

    const select = await screen.findByTestId('select-rol');
    expect(select.innerHTML).toContain('Viewer');
    expect(select.innerHTML).toContain('Admin');
  });
});
