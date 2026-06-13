// @vitest-environment jsdom
// src/services/vacunas/getPerfilRiesgo.integration.test.tsx
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RadarPerfilRiesgo from '../../components/charts/RadarPerfilRiesgo';
import { getPerfilRiesgo } from './getPerfilRiesgo';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./getPerfilRiesgo');

// ── otras dependencias del componente ────────────────────────────────────
vi.mock('../../hooks/useAnalisis', () => ({
  useSintomas: vi.fn().mockReturnValue({ data: [] }),
}));
vi.mock('../analisis/getSintomas', () => ({
  extraerVacunas: vi.fn().mockReturnValue([{ id: 1, nombre: 'Comirnaty' }]),
}));

// ── dependencias visuales complejas ──────────────────────────────────────
vi.mock('../../components/charts/ChartCard', () => ({ default: () => null }));
vi.mock('../../components/composed/ExportarReporteModal/ExportarReporteModal', () => ({ default: () => null }));
vi.mock('html2canvas', () => ({ default: vi.fn() }));
vi.mock('jspdf', () => ({ default: vi.fn() }));
vi.mock('lucide-react', () => ({ Download: () => null, FileText: () => null }));

// ── helpers ───────────────────────────────────────────────────────────────
const mockPerfil = {
  costoUnitario: 18.50,
  porcentajeSintomasGraves: 4.5,
  indiceSeguridad: 87.3,
  totalReportes: 50,
  topSintomas: [{ label: 'Fiebre', value: 45 }],
};

const renderRadar = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <RadarPerfilRiesgo />
    </QueryClientProvider>
  );
};

describe('Integración: getPerfilRiesgo → RadarPerfilRiesgo', () => {
  beforeEach(() => {
    vi.mocked(getPerfilRiesgo).mockResolvedValue(mockPerfil);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar los KPIs cuando el servicio responde', async () => {
    renderRadar();

    expect(await screen.findByText('$18.50')).toBeDefined();
    expect(await screen.findByText('4.5%')).toBeDefined();
    expect(await screen.findByText('87.3%')).toBeDefined();
    expect(await screen.findByText('50')).toBeDefined();
  });

  it('debe mostrar el esqueleto de carga mientras el servicio está pendiente', async () => {
    vi.mocked(getPerfilRiesgo).mockReturnValue(new Promise(() => {}));
    renderRadar();

    const skeletons = await screen.findAllByText('Analizando métricas...');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
