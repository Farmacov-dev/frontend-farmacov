// @vitest-environment jsdom
// src/services/admin/putPermisos.integration.test.tsx
import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RolesPermisosPage from '../../pages/admin/RolesPermisosPage';
import { putPermisos } from './putPermisos';
import { getRoles } from './getRoles';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./putPermisos');

// ── getRoles necesario para que la página renderice los roles ─────────────
vi.mock('./getRoles');

// ── dependencias visuales complejas ──────────────────────────────────────
vi.mock('../../components/primary/RolCard/RolCard', () => ({
  default: ({ nombre, onClick }: any) => <button onClick={onClick}>{nombre}</button>,
}));
vi.mock('../../components/composed/PermisosTable/PermisosTable',     () => ({ PermisosTable: () => null }));
vi.mock('../../components/composed/CrearRolModal/CrearRolModal',     () => ({ default: () => null }));
vi.mock('../../components/composed/ConfirmModal/ConfirmModal',       () => ({ default: () => null }));

// ── helpers ───────────────────────────────────────────────────────────────
const mockRol = { id: 1, nombre: 'Administrador', esAdmin: true, permisos: { dashboard: true, reportes: false } };

const renderPage = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <RolesPermisosPage />
    </QueryClientProvider>
  );
};

describe('Integración: putPermisos → RolesPermisosPage', () => {
  beforeEach(() => {
    vi.mocked(getRoles).mockResolvedValue([mockRol]);
    vi.mocked(putPermisos).mockResolvedValue(undefined);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe llamar a putPermisos con el idRol y los permisos del rol al guardar', async () => {
    renderPage();

    // 1. Esperar que el rol cargue y hacer clic en él para seleccionarlo
    fireEvent.click(await screen.findByText('Administrador'));

    // 2. Esperar que aparezca el botón "Guardar cambios" (condicional a rolActivoId)
    const guardarBtn = await screen.findByRole('button', { name: /guardar cambios/i });
    fireEvent.click(guardarBtn);

    // 3. Verificar que putPermisos fue llamado con los datos del rol seleccionado
    await waitFor(() => {
      expect(vi.mocked(putPermisos)).toHaveBeenCalledWith(
        1,
        { dashboard: true, reportes: false }
      );
    });
  });
});
