// @vitest-environment jsdom
// src/services/usuarios/getUsuarios.integration.test.tsx
import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GestionUsuarios from '../../pages/GestionUsuarios';
import { getUsuarios } from './getUsuarios';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./getUsuarios');

// ── otros servicios (datos neutros) ──────────────────────────────────────
vi.mock('./getRolesForUsuarios', () => ({ getRolesForUsuarios: vi.fn().mockResolvedValue([]) }));
vi.mock('./createUsuario',       () => ({ createUsuario:       vi.fn() }));
vi.mock('./updateUsuario',       () => ({ updateUsuario:       vi.fn() }));
vi.mock('./deleteUsuario',       () => ({ deleteUsuario:       vi.fn() }));

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
const mockUsuarios = [
  {
    id: 'u1',
    nombre: 'Ana',       apellidoPaterno: 'López',
    apellidoMaterno: '', correo: 'ana@farmacov.com',
    departamento: 'IT',  estado: 'ACTIVO',
    rol: { id: 1, nombre: 'Viewer', esAdmin: false },
    creadoEn: '', actualizadoEn: '',
  },
  {
    id: 'u2',
    nombre: 'Luis',      apellidoPaterno: 'Pérez',
    apellidoMaterno: '', correo: 'luis@farmacov.com',
    departamento: 'HR',  estado: 'ACTIVO',
    rol: { id: 2, nombre: 'Admin', esAdmin: true },
    creadoEn: '', actualizadoEn: '',
  },
];

const renderPage = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <GestionUsuarios />
    </QueryClientProvider>
  );
};

describe('Integración: getUsuarios → GestionUsuarios', () => {
  beforeEach(() => {
    vi.mocked(getUsuarios).mockResolvedValue(mockUsuarios);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar una fila por cada usuario retornado por el servicio', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getAllByTestId('usuario-fila')).toHaveLength(2);
    });
  });

  it('debe mostrar nombre y correo de cada usuario', async () => {
    renderPage();

    await waitFor(() => {
      const nombres = screen.getAllByTestId('usuario-nombre');
      expect(nombres[0].textContent).toBe('Ana López');
      expect(nombres[1].textContent).toBe('Luis Pérez');
    });

    await waitFor(() => {
      const correos = screen.getAllByTestId('usuario-correo');
      expect(correos[0].textContent).toBe('ana@farmacov.com');
      expect(correos[1].textContent).toBe('luis@farmacov.com');
    });
  });

  it('debe mostrar indicador de carga mientras el servicio está pendiente', async () => {
    vi.mocked(getUsuarios).mockReturnValue(new Promise(() => {}));
    renderPage();

    expect(await screen.findByTestId('usuarios-cargando')).toBeDefined();
  });

  it('debe mostrar mensaje vacío cuando el servicio retorna lista vacía', async () => {
    vi.mocked(getUsuarios).mockResolvedValue([]);
    renderPage();

    expect(await screen.findByText('No se encontraron usuarios')).toBeDefined();
  });
});
