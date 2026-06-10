// @vitest-environment jsdom
// src/services/admin/adminVacunas.integration.test.tsx
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VacunasView from '../../pages/admin/views/VacunasView';
import { getVacunas } from './adminVacunas';
import type { Farmaco } from './adminFarmacos';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./adminVacunas');

// ── dependencias visuales complejas ──────────────────────────────────────
vi.mock('../../components/composed/DataTable/DataTable', () => ({
  DataTable: ({ data }: any) => (
    <>{data.map((item: any, i: number) => <span key={i}>{item.nombre}</span>)}</>
  ),
}));
vi.mock('../../components/composed/VacunaModal/VacunaModal', () => ({ default: () => null }));
vi.mock('../../components/composed/ConfirmModal/ConfirmModal',  () => ({ default: () => null }));

// ── helpers ───────────────────────────────────────────────────────────────
const farmacoActivo: Farmaco = { id: 3, nombre: 'Pfizer', tipo: 'Laboratorio', descripcion: '' };

const mockVacunas = [
  { idVacuna: 1, idFarmaco: 3, nombre: 'Comirnaty',          farmaceutica: 'Pfizer', tipo: 'ARNm' },
  { idVacuna: 2, idFarmaco: 3, nombre: 'Comirnaty Bivalente', farmaceutica: 'Pfizer', tipo: 'ARNm' },
  { idVacuna: 3, idFarmaco: 9, nombre: 'Spikevax',            farmaceutica: 'Moderna', tipo: 'ARNm' }, // diferente farmaco
];

const renderView = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <VacunasView farmacoActivo={farmacoActivo} onSelectVacuna={vi.fn()} />
    </QueryClientProvider>
  );
};

describe('Integración: getVacunas → VacunasView', () => {
  beforeEach(() => {
    vi.mocked(getVacunas).mockResolvedValue(mockVacunas);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar el estado de carga mientras el servicio está pendiente', async () => {
    vi.mocked(getVacunas).mockReturnValue(new Promise(() => {}));
    renderView();

    expect(await screen.findByText('Cargando catálogo de vacunas...')).toBeDefined();
  });

  it('debe mostrar solo las vacunas del fármaco activo cuando el servicio responde', async () => {
    renderView();

    expect(await screen.findByText('Comirnaty')).toBeDefined();
    expect(await screen.findByText('Comirnaty Bivalente')).toBeDefined();
    // Spikevax pertenece a otro farmaco (idFarmaco=9) → no debe aparecer
    expect(screen.queryByText('Spikevax')).toBeNull();
  });
});
