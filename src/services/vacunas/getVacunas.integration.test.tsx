// @vitest-environment jsdom
// src/services/vacunas/getVacunas.integration.test.tsx
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import Catalog from '../../pages/Catalog';
import { getVacunas } from './getVacunas';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./getVacunas');

// ── otros servicios y hooks (datos neutros) ───────────────────────────────
vi.mock('./getVacunaDetalle', () => ({ getVacunaDetalle: vi.fn().mockResolvedValue(null) }));
vi.mock('../../hooks/useUltimaActualizacion', () => ({
  useUltimaActualizacion: vi.fn().mockReturnValue(''),
}));

// ── dependencias visuales complejas ──────────────────────────────────────
vi.mock('../../components/VaccineCatalogTable/VaccineCatalogTable', () => ({
  default: ({ vaccines }: any) => (
    <>{vaccines?.map((v: any) => <span key={v.id}>{v.name}</span>)}</>
  ),
}));
vi.mock('../../components/composed/VaccineDetailModal/VaccineDetailModal', () => ({ default: () => null }));
vi.mock('../../components/composed/ExportarReporteModal/ExportarReporteModal', () => ({ default: () => null }));
vi.mock('../../components/PageHeader/PageHeader', () => ({
  default: ({ title }: any) => <h1>{title}</h1>,
}));
vi.mock('html2canvas', () => ({ default: vi.fn() }));
vi.mock('jspdf', () => ({ default: vi.fn() }));
vi.mock('lucide-react', () => ({ Download: () => null, FileText: () => null }));

// ── helpers ───────────────────────────────────────────────────────────────
const mockVacunas = [
  { id: 1, name: 'Comirnaty', farmaceutica: 'Pfizer',  costoUnitario: 19.5, temperatura: '-70°C', indice_seguridad: 87, longevidad: '6 horas (ambiente)' },
  { id: 2, name: 'Spikevax',  farmaceutica: 'Moderna', costoUnitario: 25.0, temperatura: '-20°C', indice_seguridad: 83, longevidad: '24 horas (ambiente)' },
];

const renderCatalog = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <MemoryRouter>
      <QueryClientProvider client={qc}>
        <Catalog />
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('Integración: getVacunas → Catalog', () => {
  beforeEach(() => {
    vi.mocked(getVacunas).mockResolvedValue(mockVacunas);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar los nombres de las vacunas cuando el servicio responde', async () => {
    renderCatalog();

    expect(await screen.findByText('Comirnaty')).toBeDefined();
    expect(await screen.findByText('Spikevax')).toBeDefined();
  });

  it('debe mostrar el estado de carga mientras el servicio está pendiente', async () => {
    vi.mocked(getVacunas).mockReturnValue(new Promise(() => {}));
    renderCatalog();

    expect(await screen.findByText('Cargando vacunas...')).toBeDefined();
  });

  it('debe mostrar mensaje de error cuando el servicio falla', async () => {
    vi.mocked(getVacunas).mockRejectedValue(new Error('Network error'));
    renderCatalog();

    expect(await screen.findByText('Error cargando vacunas.')).toBeDefined();
  });
});
