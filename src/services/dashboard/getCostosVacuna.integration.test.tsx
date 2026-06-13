// @vitest-environment jsdom
// src/services/dashboard/getCostosVacuna.integration.test.tsx
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import { getCostosVacuna } from './getCostosVacuna';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./getCostosVacuna');

// ── otros servicios del dashboard (datos vacíos) ──────────────────────────
vi.mock('./getKpis',                  () => ({ getKpis:                  vi.fn().mockResolvedValue({ totalVacunas: 0, totalReportes: 0, reportesEsteMes: 0, porcentajeReportesGraves: 0 }) }));
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
// ChartCard expone las etiquetas de los datos para poder verificarlas
vi.mock('../../components/charts/ChartCard', () => ({
  default: ({ data }: any) => (
    <>{(data ?? []).map((item: any, i: number) => <span key={i}>{item.label}</span>)}</>
  ),
}));
vi.mock('../../components/composed/ComparisonModal/ComparisonModal', () => ({ default: () => null }));
vi.mock('../../components/PageHeader/PageHeader',                     () => ({
  default: ({ title }: any) => <h1>{title}</h1>,
}));

// ── helpers ───────────────────────────────────────────────────────────────
const mockCostos = [
  { label: 'Comirnaty', value: 19.5 },
  { label: 'Spikevax',  value: 25.0 },
];

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

describe('Integración: getCostosVacuna → Dashboard', () => {
  beforeEach(() => {
    vi.mocked(getCostosVacuna).mockResolvedValue(mockCostos);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar las etiquetas de costos por vacuna en el gráfico', async () => {
    renderDashboard();

    expect(await screen.findByText('Comirnaty')).toBeDefined();
    expect(await screen.findByText('Spikevax')).toBeDefined();
  });
});
