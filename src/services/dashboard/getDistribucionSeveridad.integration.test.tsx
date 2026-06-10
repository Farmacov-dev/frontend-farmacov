// @vitest-environment jsdom
// src/services/dashboard/getDistribucionSeveridad.integration.test.tsx
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import { getDistribucionSeveridad } from './getDistribucionSeveridad';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./getDistribucionSeveridad', () => ({
  getDistribucionSeveridad:          vi.fn(),
  getDistribucionSeveridadPorVacuna: vi.fn().mockResolvedValue({ grave: 0, leve: 0, moderado: 0 }),
}));

// ── otros servicios del dashboard (datos vacíos) ──────────────────────────
vi.mock('./getKpis',            () => ({ getKpis:            vi.fn().mockResolvedValue({ totalVacunas: 0, totalReportes: 0, reportesEsteMes: 0, porcentajeReportesGraves: 0 }) }));
vi.mock('./getCostosVacuna',    () => ({ getCostosVacuna:    vi.fn().mockResolvedValue([]) }));
vi.mock('./getTopSintomas',     () => ({ getTopSintomas:     vi.fn().mockResolvedValue([]) }));
vi.mock('./getSeguridadVacuna', () => ({ getSeguridadVacuna: vi.fn().mockResolvedValue([]) }));
vi.mock('./getUltimaActualizacion', () => ({ getUltimaActualizacion: vi.fn().mockResolvedValue('') }));

// ── dependencias externas ─────────────────────────────────────────────────
vi.mock('../../services/vacunas/getVacunas', () => ({ getVacunas: vi.fn().mockResolvedValue([]) }));
vi.mock('react-icons/fa', () => ({
  FaChartBar: () => null, FaSyringe: () => null,
  FaClipboardList: () => null, FaExclamationTriangle: () => null,
}));
// ChartCard expone las etiquetas para poder verificar la transformación del dato
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

describe('Integración: getDistribucionSeveridad → Dashboard', () => {
  beforeEach(() => {
    vi.mocked(getDistribucionSeveridad).mockResolvedValue({ grave: 10, leve: 50, moderado: 30 });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar las tres categorías de severidad transformadas en el gráfico', async () => {
    renderDashboard();

    // Dashboard transforma { grave, leve, moderado } en array de labels para ChartCard
    expect(await screen.findByText('Leve')).toBeDefined();
    expect(await screen.findByText('Moderado')).toBeDefined();
    expect(await screen.findByText('Grave')).toBeDefined();
  });
});
