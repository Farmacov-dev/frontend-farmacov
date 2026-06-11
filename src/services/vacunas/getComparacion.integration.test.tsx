// @vitest-environment jsdom
// src/services/vacunas/getComparacion.integration.test.tsx
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import Comparison from '../../pages/Comparison';
import { getComparacion } from './getComparacion';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./getComparacion');

// ── dependencias visuales complejas ──────────────────────────────────────
vi.mock('../../components/ComparisonHeader/ComparisonHeader', () => ({
  default: ({ leftLabel, rightLabel }: any) => (
    <div><span>{leftLabel}</span><span>{rightLabel}</span></div>
  ),
}));
vi.mock('../../components/ComparisonTable/ComparisonTable', () => ({
  default: ({ rows }: any) => (
    <>{rows?.map((r: any) => <span key={r.index}>{r.label}</span>)}</>
  ),
}));

// ── helpers ───────────────────────────────────────────────────────────────
const mockComparacion = {
  vaccineA: 1,
  vaccineB: 2,
  rows: [
    { index: 1, label: 'Índice de Seguridad', left: { value: '87.0%', status: 'better' }, right: { value: '80.0%', status: 'worse' } },
    { index: 2, label: 'Costo unitario',      left: { value: '$18.50', status: 'better' }, right: { value: '$25.00', status: 'worse' } },
  ],
};

const renderComparison = (search = '?a=1&b=2&nombreA=Comirnaty&nombreB=Spikevax') => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <MemoryRouter initialEntries={[`/compare${search}`]}>
      <QueryClientProvider client={qc}>
        <Comparison />
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('Integración: getComparacion → Comparison', () => {
  beforeEach(() => {
    vi.mocked(getComparacion).mockResolvedValue(mockComparacion);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar las filas de comparación cuando el servicio responde', async () => {
    renderComparison();

    expect(await screen.findByText('Índice de Seguridad')).toBeDefined();
    expect(await screen.findByText('Costo unitario')).toBeDefined();
  });

  it('debe mostrar los nombres de las vacunas en el encabezado', async () => {
    renderComparison();

    expect(await screen.findByText('Comirnaty')).toBeDefined();
    expect(await screen.findByText('Spikevax')).toBeDefined();
  });

  it('debe mostrar el estado de carga mientras el servicio está pendiente', async () => {
    vi.mocked(getComparacion).mockReturnValue(new Promise(() => {}));
    renderComparison();

    expect(await screen.findByText('Cargando comparación...')).toBeDefined();
  });

  it('debe mostrar mensaje de error cuando el servicio falla', async () => {
    vi.mocked(getComparacion).mockRejectedValue(new Error('Network error'));
    renderComparison();

    expect(await screen.findByText('Error al cargar los datos de la comparación.')).toBeDefined();
  });

  it('debe mostrar mensaje de parámetros inválidos cuando no se pasan IDs', () => {
    renderComparison('');

    expect(screen.getByText('Los parámetros de comparación no son válidos.')).toBeDefined();
  });
});
