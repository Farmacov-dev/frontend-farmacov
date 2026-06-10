// @vitest-environment jsdom
// src/services/admin/getRoles.integration.test.tsx
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RolesPermisosPage from '../../pages/admin/RolesPermisosPage';
import { getRoles } from './getRoles';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./getRoles');

// ── putPermisos también se usa en esta página (useActualizarPermisos) ─────
vi.mock('./putPermisos', () => ({ putPermisos: vi.fn().mockResolvedValue(undefined) }));

// ── dependencias visuales complejas ──────────────────────────────────────
vi.mock('../../components/primary/RolCard/RolCard', () => ({
  default: ({ nombre, onClick }: any) => <button onClick={onClick}>{nombre}</button>,
}));
vi.mock('../../components/composed/PermisosTable/PermisosTable',     () => ({ PermisosTable: () => null }));
vi.mock('../../components/composed/CrearRolModal/CrearRolModal',     () => ({ default: () => null }));
vi.mock('../../components/composed/ConfirmModal/ConfirmModal',       () => ({ default: () => null }));

// ── helpers ───────────────────────────────────────────────────────────────
const mockRoles = [
  { id: 1, nombre: 'Administrador', esAdmin: true,  permisos: { dashboard: true  } },
  { id: 2, nombre: 'Auditor',       esAdmin: false, permisos: { dashboard: false } },
];

const renderPage = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <RolesPermisosPage />
    </QueryClientProvider>
  );
};

describe('Integración: getRoles → RolesPermisosPage', () => {
  beforeEach(() => {
    vi.mocked(getRoles).mockResolvedValue(mockRoles);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar el estado de carga mientras el servicio está pendiente', async () => {
    vi.mocked(getRoles).mockReturnValue(new Promise(() => {}));
    renderPage();

    expect(await screen.findByText('Cargando roles...')).toBeDefined();
  });

  it('debe mostrar los nombres de roles cuando el servicio responde', async () => {
    renderPage();

    expect(await screen.findByText('Administrador')).toBeDefined();
    expect(await screen.findByText('Auditor')).toBeDefined();
  });
});
