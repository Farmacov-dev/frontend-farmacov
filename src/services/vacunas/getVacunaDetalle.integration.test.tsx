// @vitest-environment jsdom
// src/services/vacunas/getVacunaDetalle.integration.test.tsx
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import Catalog from '../../pages/Catalog';
import { getVacunaDetalle } from './getVacunaDetalle';

// ── servicio bajo prueba ──────────────────────────────────────────────────
vi.mock('./getVacunaDetalle');

// ── otros servicios y hooks (datos neutros) ───────────────────────────────
vi.mock('./getVacunas', () => ({
  getVacunas: vi.fn().mockResolvedValue([
    { id: 1, name: 'Comirnaty', farmaceutica: 'Pfizer', costoUnitario: 19.5, temperatura: '-70°C', indice_seguridad: 87, longevidad: '6 horas (ambiente)' },
  ]),
}));
vi.mock('../../hooks/useUltimaActualizacion', () => ({
  useUltimaActualizacion: vi.fn().mockReturnValue(''),
}));

// ── dependencias visuales complejas ──────────────────────────────────────
vi.mock('../../components/VaccineCatalogTable/VaccineCatalogTable', () => ({
  default: ({ vaccines, onInfoClick }: any) => (
    <>
      {vaccines?.map((v: any) => (
        <button key={v.id} onClick={() => onInfoClick?.(v)}>
          Info {v.name}
        </button>
      ))}
    </>
  ),
}));
vi.mock('../../components/composed/VaccineDetailModal/VaccineDetailModal', () => ({
  default: ({ isOpen, vacuna }: any) =>
    isOpen && vacuna ? <div data-testid="detail-modal">{vacuna.farmaceutica}</div> : null,
}));
vi.mock('../../components/composed/ExportarReporteModal/ExportarReporteModal', () => ({ default: () => null }));
vi.mock('../../components/PageHeader/PageHeader', () => ({
  default: ({ title }: any) => <h1>{title}</h1>,
}));
vi.mock('html2canvas', () => ({ default: vi.fn() }));
vi.mock('jspdf', () => ({ default: vi.fn() }));
vi.mock('lucide-react', () => ({ Download: () => null, FileText: () => null }));

// ── helpers ───────────────────────────────────────────────────────────────
const mockDetalle = {
  id: 1,
  nombre: 'Comirnaty',
  farmaceutica: 'Pfizer',
  tipo: 'ARNm',
  descripcionGeneral: 'Vacuna de ARNm contra COVID-19',
  temperatura: -70,
  tiempoAmbiente: null,
  costoUnitario: 19.5,
  efectosSecundarios: [],
};

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

describe('Integración: getVacunaDetalle → Catalog', () => {
  beforeEach(() => {
    vi.mocked(getVacunaDetalle).mockResolvedValue(mockDetalle);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe pasar los datos del detalle al modal al hacer clic en info', async () => {
    renderCatalog();

    const infoBtn = await screen.findByText('Info Comirnaty');
    fireEvent.click(infoBtn);

    expect(await screen.findByTestId('detail-modal')).toBeDefined();
    expect(await screen.findByText('Pfizer')).toBeDefined();
  });

  it('no debe mostrar el modal antes de seleccionar una vacuna', async () => {
    renderCatalog();

    await screen.findByText('Info Comirnaty');
    expect(screen.queryByTestId('detail-modal')).toBeNull();
  });
});
