// @vitest-environment jsdom
// src/services/dashboard/getSeguridadVacuna.integration.test.tsx
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import { getSeguridadVacuna } from './getSeguridadVacuna';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./getSeguridadVacuna');

// ── otros servicios del dashboard (datos vacíos) ──────────────────────────
vi.mock('./getKpis',                  () => ({ getKpis:                  vi.fn().mockResolvedValue({ totalVacunas: 0, totalReportes: 0, reportesEsteMes: 0, porcentajeReportesGraves: 0 }) }));
vi.mock('./getCostosVacuna',          () => ({ getCostosVacuna:          vi.fn().mockResolvedValue([]) }));
vi.mock('./getTopSintomas',           () => ({ getTopSintomas:           vi.fn().mockResolvedValue([]) }));
vi.mock('./getDistribucionSeveridad', () => ({
  getDistribucionSeveridad:          vi.fn().mockResolvedValue({ grave: 0, leve: 0, moderado: 0 }),
  getDistribucionSeveridadPorVacuna: vi.fn().mockResolvedValue({ grave: 0, leve: 0, moderado: 0 }),
}));
vi.mock('./getUltimaActualizacion', () => ({ getUltimaActualizacion: vi.fn().mockResolvedValue('') }));

// ── dependencias externas ─────────────────────────────────────────────────
vi.mock('../../services/vacunas/getVacunas', () => ({ getVacunas: vi.fn().mockResolvedValue([]) }));
vi.mock('react-icons/fa', () => ({
  FaChartBar: () => null, FaSyringe: () => null,
  FaClipboardList: () => null, FaExclamationTriangle: () => null,
}));
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
const mockSeguridad = [
  { label: 'Comirnaty', value: 92.5 },
  { label: 'Spikevax',  value: 88.0 },
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

describe('Integración: getSeguridadVacuna → Dashboard', () => {
  beforeEach(() => {
    vi.mocked(getSeguridadVacuna).mockResolvedValue(mockSeguridad);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar las etiquetas del índice de seguridad por vacuna en el gráfico', async () => {
    renderDashboard();

    expect(await screen.findByText('Comirnaty')).toBeDefined();
    expect(await screen.findByText('Spikevax')).toBeDefined();
  });
});
