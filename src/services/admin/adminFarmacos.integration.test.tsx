// @vitest-environment jsdom
// src/services/admin/adminFarmacos.integration.test.tsx
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FarmacosView from '../../pages/admin/views/FarmacosView';
import { getFarmacos } from './adminFarmacos';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./adminFarmacos');

// ── dependencias visuales complejas ──────────────────────────────────────
vi.mock('../../components/composed/DataTable/DataTable', () => ({
  DataTable: ({ data }: any) => (
    <>{data.map((item: any, i: number) => <span key={i}>{item.nombre}</span>)}</>
  ),
}));
vi.mock('../../components/composed/FarmacoModal/FarmacoModal', () => ({ default: () => null }));
vi.mock('../../components/composed/ConfirmModal/ConfirmModal',  () => ({ default: () => null }));

// ── helpers ───────────────────────────────────────────────────────────────
const mockFarmacos = [
  { id: 1, nombre: 'Pfizer',     tipo: 'Laboratorio', descripcion: 'Desc A' },
  { id: 2, nombre: 'AstraZeneca', tipo: 'Laboratorio', descripcion: 'Desc B' },
];

const renderView = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <FarmacosView onSelectFarmaco={vi.fn()} />
    </QueryClientProvider>
  );
};

describe('Integración: getFarmacos → FarmacosView', () => {
  beforeEach(() => {
    vi.mocked(getFarmacos).mockResolvedValue(mockFarmacos);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar el estado de carga mientras el servicio está pendiente', async () => {
    vi.mocked(getFarmacos).mockReturnValue(new Promise(() => {}));
    renderView();

    expect(await screen.findByText('Cargando fármacos...')).toBeDefined();
  });

  it('debe mostrar los nombres de fármacos en la tabla cuando el servicio responde', async () => {
    renderView();

    expect(await screen.findByText('Pfizer')).toBeDefined();
    expect(await screen.findByText('AstraZeneca')).toBeDefined();
  });
});
