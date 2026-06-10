// @vitest-environment jsdom
// src/services/dashboard/getKpis.integration.test.tsx
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import { getKpis } from './getKpis';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./getKpis');

// ── otros servicios del dashboard (datos vacíos) ──────────────────────────
vi.mock('./getCostosVacuna',          () => ({ getCostosVacuna:          vi.fn().mockResolvedValue([]) }));
vi.mock('./getTopSintomas',           () => ({ getTopSintomas:           vi.fn().mockResolvedValue([]) }));
vi.mock('./getSeguridadVacuna',       () => ({ getSeguridadVacuna:       vi.fn().mockResolvedValue([]) }));
vi.mock('./getDistribucionSeveridad', () => ({
  getDistribucionSeveridad:          vi.fn().mockResolvedValue({ grave: 0, leve: 0, moderado: 0 }),
  getDistribucionSeveridadPorVacuna: vi.fn().mockResolvedValue({ grave: 0, leve: 0, moderado: 0 }),
}));
vi.mock('./getUltimaActualizacion',   () => ({ getUltimaActualizacion:   vi.fn().mockResolvedValue('') }));

// ── dependencias externas ─────────────────────────────────────────────────
vi.mock('../../services/vacunas/getVacunas', () => ({ getVacunas: vi.fn().mockResolvedValue([]) }));
vi.mock('react-icons/fa', () => ({
  FaChartBar: () => null, FaSyringe: () => null,
  FaClipboardList: () => null, FaExclamationTriangle: () => null,
}));
vi.mock('../../components/charts/ChartCard',                           () => ({ default: () => null }));
vi.mock('../../components/composed/ComparisonModal/ComparisonModal',   () => ({ default: () => null }));
vi.mock('../../components/PageHeader/PageHeader',                      () => ({
  default: ({ title }: any) => <h1>{title}</h1>,
}));

// ── helpers ───────────────────────────────────────────────────────────────
const mockKpis = { totalVacunas: 12, totalReportes: 340, reportesEsteMes: 28, porcentajeReportesGraves: 5.8 };

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

describe('Integración: getKpis → Dashboard', () => {
  beforeEach(() => {
    vi.mocked(getKpis).mockResolvedValue(mockKpis);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar los valores de KPIs en pantalla cuando el servicio responde', async () => {
    renderDashboard();

    expect(await screen.findByText('12')).toBeDefined();
    expect(await screen.findByText('340')).toBeDefined();
  });

  it('debe mostrar el estado de carga mientras el servicio está pendiente', async () => {
    vi.mocked(getKpis).mockReturnValue(new Promise(() => {}));
    renderDashboard();

    expect(await screen.findByText('Cargando KPIs...')).toBeDefined();
  });
});
