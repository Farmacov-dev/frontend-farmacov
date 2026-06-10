// @vitest-environment jsdom
// src/services/historial/getBitacora.integration.test.tsx
import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Historial from '../../pages/Historial';
import { getBitacora } from './getBitacora';

// ── servicio bajo prueba — se conserva mapBitacoraToHistorialUsers ─────────
vi.mock('./getBitacora', async (importOriginal) => {
  const real = await importOriginal() as any;
  return { ...real, getBitacora: vi.fn() };
});

// ── getHistorialKpis necesario para que la página renderice los KPIs ──────
vi.mock('./getHistorial', () => ({
  getHistorialKpis: vi.fn().mockResolvedValue({
    usuariosActivos: 0,
    usuariosSuspendidos: 0,
    ultimoAcceso: '',
  }),
}));

// ── dependencias visuales ─────────────────────────────────────────────────
vi.mock('react-icons/fa', () => ({
  FaSyringe:            () => null,
  FaExclamationTriangle: () => null,
}));
vi.mock('../../components/PageHeader/PageHeader', () => ({
  default: () => null,
}));

// ── datos de prueba ───────────────────────────────────────────────────────
const mockBitacoraResponse = {
  users: [
    {
      id: 1,
      hora: '10:30 AM',
      nombre: 'Ana García',
      iniciales: 'AG',
      colorAvatar: '#14B8A6',
      accion: 'Creó usuario',
      resultado: 'Exitoso' as const,
      nombreAdmin: 'Carlos Admin',
    },
    {
      id: 2,
      hora: '11:00 AM',
      nombre: 'Luis Pérez',
      iniciales: 'LP',
      colorAvatar: '#7C3AED',
      accion: 'Eliminó usuario',
      resultado: 'Fallido' as const,
      nombreAdmin: 'María Admin',
    },
  ],
  currentPage: 0,
  pageSize: 10,
  totalItems: 5,
  totalPages: 3,
};

const renderPage = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <Historial />
    </QueryClientProvider>
  );
};

describe('Integración: getBitacora → Historial', () => {
  beforeEach(() => {
    vi.mocked(getBitacora).mockResolvedValue(mockBitacoraResponse);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar el indicador de carga mientras el servicio está pendiente', async () => {
    vi.mocked(getBitacora).mockReturnValue(new Promise(() => {}));
    renderPage();

    expect(await screen.findByTestId('historial-cargando-actividad')).toBeDefined();
  });

  it('debe renderizar una fila por cada usuario retornado por el servicio', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getAllByTestId('user-row')).toHaveLength(2);
    });
  });

  it('debe mostrar los nombres de usuario en la tabla', async () => {
    renderPage();

    await waitFor(() => {
      const nombres = screen.getAllByTestId('user-nombre');
      expect(nombres[0].textContent).toBe('Ana García');
      expect(nombres[1].textContent).toBe('Luis Pérez');
    });
  });

  it('debe mostrar la información de paginación con los totales correctos', async () => {
    renderPage();

    await waitFor(() => {
      const paginacion = screen.getByTestId('historial-paginacion');
      expect(paginacion.textContent).toContain('3');  // totalPages
      expect(paginacion.textContent).toContain('5');  // totalItems
    });
  });
});
