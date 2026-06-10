// @vitest-environment jsdom
// src/services/dashboard/getUltimaActualizacion.integration.test.tsx
import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import { getUltimaActualizacion } from './getUltimaActualizacion';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./getUltimaActualizacion');

// ── otros servicios del dashboard (datos vacíos) ──────────────────────────
vi.mock('./getKpis',                  () => ({ getKpis:                  vi.fn().mockResolvedValue({ totalVacunas: 0, totalReportes: 0, reportesEsteMes: 0, porcentajeReportesGraves: 0 }) }));
vi.mock('./getCostosVacuna',          () => ({ getCostosVacuna:          vi.fn().mockResolvedValue([]) }));
vi.mock('./getTopSintomas',           () => ({ getTopSintomas:           vi.fn().mockResolvedValue([]) }));
vi.mock('./getSeguridadVacuna',       () => ({ getSeguridadVacuna:       vi.fn().mockResolvedValue([]) }));
vi.mock('./getDistribucionSeveridad', () => ({
  getDistribucionSeveridad:          vi.fn().mockResolvedValue({ grave: 0, leve: 0, moderado: 0 }),
  getDistribucionSeveridadPorVacuna: vi.fn().mockResolvedValue({ grave: 0, leve: 0, moderado: 0 }),
}));

// ── dependencias externas ─────────────────────────────────────────────────
vi.mock('../../services/vacunas/getVacunas', () => ({ getVacunas: vi.fn().mockResolvedValue([]) }));
vi.mock('react-icons/fa', () => ({
  FaChartBar: () => null, FaSyringe: () => null,
  FaClipboardList: () => null, FaExclamationTriangle: () => null,
}));
vi.mock('../../components/charts/ChartCard',                         () => ({ default: () => null }));
vi.mock('../../components/composed/ComparisonModal/ComparisonModal', () => ({ default: () => null }));
// PageHeader expone la fecha para poder verificarla en el DOM
vi.mock('../../components/PageHeader/PageHeader', () => ({
  default: ({ date }: any) => <span data-testid="page-date">{date}</span>,
}));

// ── helpers ───────────────────────────────────────────────────────────────
const FECHA_FORMATEADA = '15 de enero de 2025, 10:30 a.m.';

const renderDashboard = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <MemoryRouter>
      <QueryClientProvider client={qc}>
        <Dashboard />
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('Integración: getUltimaActualizacion → Dashboard', () => {
  beforeEach(() => {
    vi.mocked(getUltimaActualizacion).mockResolvedValue(FECHA_FORMATEADA);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar la fecha de última actualización formateada en el header', async () => {
    renderDashboard();

    // waitFor reintenta hasta que React Query resuelve y actualiza el DOM
    await waitFor(() => {
      expect(screen.getByTestId('page-date').textContent).toBe(FECHA_FORMATEADA);
    });
  });

  it('debe mostrar "Cargando..." en el header mientras el servicio está pendiente', async () => {
    vi.mocked(getUltimaActualizacion).mockReturnValue(new Promise(() => {}));
    renderDashboard();

    // useUltimaActualizacion retorna 'Cargando...' cuando data es undefined
    const dateEl = await screen.findByTestId('page-date');
    expect(dateEl.textContent).toBe('Cargando...');
  });
});
