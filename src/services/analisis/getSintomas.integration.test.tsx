// @vitest-environment jsdom
// src/services/analisis/getSintomas.integration.test.tsx
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import Analisis_Sintomas from '../../pages/Analisis_Sintomas';
import { getSintomas } from './getSintomas';

// ── servicio bajo prueba — se conservan extraerVacunas y agruparPorSintoma ──
vi.mock('./getSintomas', async (importOriginal) => {
  const real = await importOriginal() as any;
  return { ...real, getSintomas: vi.fn() };
});

// ── dependencias de hooks ─────────────────────────────────────────────────
vi.mock('../../hooks/useUltimaActualizacion', () => ({
  useUltimaActualizacion: vi.fn().mockReturnValue(''),
}));

// ── dependencias visuales complejas (recharts, paneles de otras queries) ──
vi.mock('../../components/charts/GroupedBarChart',     () => ({ default: () => null }));
vi.mock('../../components/charts/RadarPerfilRiesgo',   () => ({ default: () => null }));
vi.mock('../../components/composed/SeveridadComparisonPanel/SeveridadComparisonPanel', () => ({ default: () => null }));
vi.mock('../../components/filters/FilterBar',          () => ({ default: () => null }));
vi.mock('../../components/content/ContentWrapper',     () => ({ default: ({ children }: any) => <>{children}</> }));
vi.mock('../../components/PageHeader/PageHeader',      () => ({ default: () => null }));
// VaccineCheckboxSelector expone los nombres de las vacunas disponibles
vi.mock('../../components/primary/VaccineCheckboxSelector/VaccineCheckboxSelector', () => ({
  default: ({ vacunas }: any) => (
    <>{vacunas.map((v: any) => <span key={v.id}>{v.nombre}</span>)}</>
  ),
}));

// ── helpers ───────────────────────────────────────────────────────────────
const buildSintoma = (idVacuna: number, nombreVacuna: string, nombreSintoma = 'Fiebre') => ({
  idSintoma: 1, idVacuna, nombreSintoma, nombreVacuna,
  sexo: 'M', grupoEdad: '18-30', esGrave: false, total: 5,
});

const renderPage = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <MemoryRouter>
      <QueryClientProvider client={qc}>
        <Analisis_Sintomas />
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('Integración: getSintomas → Analisis_Sintomas', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar el estado de carga mientras el servicio está pendiente', async () => {
    vi.mocked(getSintomas).mockReturnValue(new Promise(() => {}));
    renderPage();

    expect(await screen.findByText('Cargando vacunas...')).toBeDefined();
  });

  it('debe mostrar las vacunas extraídas del resultado de getSintomas', async () => {
    vi.mocked(getSintomas).mockResolvedValue([
      buildSintoma(1, 'Comirnaty'),
      buildSintoma(1, 'Comirnaty'),  // duplicado — extraerVacunas debe deduplicar
      buildSintoma(2, 'Spikevax'),
    ]);
    renderPage();

    // extraerVacunas (función pura real) extrae ids únicos y los pasa a VaccineCheckboxSelector
    expect(await screen.findByText('Comirnaty')).toBeDefined();
    expect(await screen.findByText('Spikevax')).toBeDefined();
  });

  it('debe mostrar el mensaje de error cuando el servicio falla', async () => {
    vi.mocked(getSintomas).mockRejectedValue(new Error('Server error'));
    renderPage();

    expect(await screen.findByText('Error cargando análisis.')).toBeDefined();
  });
});
