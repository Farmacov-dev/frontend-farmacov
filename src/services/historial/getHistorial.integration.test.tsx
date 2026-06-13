// @vitest-environment jsdom
// src/services/historial/getHistorial.integration.test.tsx
import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Historial from '../../pages/Historial';
import { getHistorialKpis } from './getHistorial';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./getHistorial');

// ── getBitacora necesario para que la página renderice (useHistorialUsers) ──
vi.mock('./getBitacora', () => ({
  getBitacora: vi.fn().mockResolvedValue({
    users: [],
    currentPage: 0,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1,
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

// ── helpers ───────────────────────────────────────────────────────────────
const mockKpis = {
  usuariosActivos:    18,
  usuariosSuspendidos: 3,
  ultimoAcceso:       'Hace 5 min',
};

const renderPage = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <Historial />
    </QueryClientProvider>
  );
};

describe('Integración: getHistorialKpis → Historial', () => {
  beforeEach(() => {
    vi.mocked(getHistorialKpis).mockResolvedValue(mockKpis);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar "-" en las tarjetas KPI mientras el servicio está pendiente', () => {
    vi.mocked(getHistorialKpis).mockReturnValue(new Promise(() => {}));
    renderPage();

    // KpiCard renderiza inmediatamente con el valor provisional "-"
    const kpiValues = screen.getAllByTestId('kpi-value');
    expect(kpiValues[0].textContent).toBe('-');
    expect(kpiValues[1].textContent).toBe('-');
  });

  it('debe mostrar usuariosActivos en la primera KpiCard cuando el servicio responde', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getAllByTestId('kpi-value')[0].textContent).toBe('18');
    });
  });

  it('debe mostrar usuariosSuspendidos en la segunda KpiCard cuando el servicio responde', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getAllByTestId('kpi-value')[1].textContent).toBe('3');
    });
  });
});
