// src/components/charts/RadarPerfilRiesgo.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import html2canvas from 'html2canvas';
import RadarPerfilRiesgo from './RadarPerfilRiesgo';
import { usePerfilRiesgo } from '../../hooks/usePerfilRiesgo';
import { useSintomas } from '../../hooks/useAnalisis';

// ─── MOCKS ──────────────────────────────────────────────────────────────────

vi.mock('../../hooks/usePerfilRiesgo', () => ({
  usePerfilRiesgo: vi.fn(),
}));

vi.mock('../../hooks/useAnalisis', () => ({
  useSintomas: vi.fn(),
}));

// extraerVacunas es pura — la mockeamos para controlar qué vacunas aparecen en el select
vi.mock('../../services/analisis/getSintomas', () => ({
  extraerVacunas: vi.fn((data: any[]) => data), // identidad: devuelve lo que recibe
}));

vi.mock('./ChartCard', () => ({
  default: ({ title, type, data }: any) => (
    <div
      data-testid="chart-card"
      data-title={title}
      data-type={type}
      data-items={data?.length ?? 0}
    />
  ),
}));

vi.mock('../composed/ExportarReporteModal/ExportarReporteModal', () => ({
  default: ({ isOpen, onClose, onExport, isLoading }: any) =>
    isOpen ? (
      <div data-testid="export-modal">
        <button onClick={onClose}>Cerrar Modal</button>
        <button onClick={() => onExport('')} disabled={isLoading}>Exportar</button>
      </div>
    ) : null,
}));

vi.mock('html2canvas', () => ({ default: vi.fn() }));
vi.mock('jspdf',       () => ({ default: vi.fn() }));

vi.mock('lucide-react', () => ({
  Download: () => <svg data-testid="icon-download" />,
  FileText: () => <svg data-testid="icon-filetext" />,
}));

// ─── DATOS DE PRUEBA ────────────────────────────────────────────────────────

// Lo que extraerVacunas devolvería — VacunaOption[]
const mockVacunasDisponibles = [
  { id: 1, nombre: 'Pfizer'   },
  { id: 2, nombre: 'Moderna'  },
  { id: 3, nombre: 'Sinovac'  },
];

// SintomaBackend[] — lo que useSintomas devuelve (extraerVacunas lo transforma)
const mockSintomasRaw = mockVacunasDisponibles; // el mock de extraerVacunas devuelve el input tal cual

const mockPerfil = {
  costoUnitario:             299.99,
  porcentajeSintomasGraves:  5.2,
  indiceSeguridad:           91.3,
  totalReportes:             1240,
  topSintomas: [
    { label: 'Dolor',  value: 80 },
    { label: 'Fiebre', value: 55 },
  ],
};

// ─── HELPERS ────────────────────────────────────────────────────────────────

const mockHookIdle = () => {
  (useSintomas as any).mockReturnValue({ data: mockSintomasRaw });
  (usePerfilRiesgo as any).mockReturnValue({ data: undefined, isPending: false });
};

const mockHookConDatos = () => {
  (useSintomas as any).mockReturnValue({ data: mockSintomasRaw });
  (usePerfilRiesgo as any).mockReturnValue({ data: mockPerfil, isPending: false });
};

const mockHookCargando = () => {
  (useSintomas as any).mockReturnValue({ data: mockSintomasRaw });
  (usePerfilRiesgo as any).mockReturnValue({ data: undefined, isPending: true });
};

// ─── SUITE ──────────────────────────────────────────────────────────────────

describe('Componente: RadarPerfilRiesgo', () => {

  beforeEach(() => {
    mockHookIdle();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // ─── SELECTOR DE VACUNA ──────────────────────────────────────────────────

  it('debe renderizar el select con aria-label correcto', () => {
    render(<RadarPerfilRiesgo />);
    expect(screen.getByRole('combobox', { name: /seleccionar vacuna para análisis de riesgo/i })).toBeDefined();
  });

  it('debe poblar el select con las vacunas disponibles', () => {
    render(<RadarPerfilRiesgo />);
    const select = screen.getByRole('combobox', { name: /seleccionar vacuna/i });
    const opciones = Array.from(select.querySelectorAll('option')).map(o => o.textContent);
    expect(opciones).toContain('Pfizer');
    expect(opciones).toContain('Moderna');
    expect(opciones).toContain('Sinovac');
  });

  it('debe mostrar "Selecciona una vacuna" como título cuando useSintomas no tiene datos', () => {
    (useSintomas as any).mockReturnValue({ data: undefined });
    render(<RadarPerfilRiesgo />);
    expect(screen.getByText('Selecciona una vacuna')).toBeDefined();
  });

  it('debe mostrar el nombre de la vacuna seleccionada como título cuando hay perfil', () => {
    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    // selectedId=1 por defecto → Pfizer — buscamos solo en el heading para evitar
    // colisión con la <option> del select que también contiene "Pfizer"
    expect(screen.getByRole('heading', { name: 'Pfizer' })).toBeDefined();
  });

  it('debe actualizar el título al cambiar la vacuna en el select', () => {
    mockHookConDatos();
    render(<RadarPerfilRiesgo />);

    fireEvent.change(screen.getByRole('combobox', { name: /seleccionar vacuna/i }), {
      target: { value: '2' },
    });

    expect(screen.getByRole('heading', { name: 'Moderna' })).toBeDefined();
  });

  // ─── ESTADO DE CARGA (skeletons) ─────────────────────────────────────────

  it('debe mostrar el texto "Analizando métricas..." mientras isPending es true', () => {
    mockHookCargando();
    render(<RadarPerfilRiesgo />);
    const skeletons = screen.getAllByText('Analizando métricas...');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('no debe mostrar los KPIs mientras isPending es true', () => {
    mockHookCargando();
    render(<RadarPerfilRiesgo />);
    expect(screen.queryByText(/costo unitario/i)).toBeNull();
    expect(screen.queryByText(/índice de seguridad/i)).toBeNull();
  });

  it('no debe mostrar botones de exportación mientras isPending es true', () => {
    mockHookCargando();
    render(<RadarPerfilRiesgo />);
    expect(screen.queryByRole('button', { name: /png/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /pdf/i })).toBeNull();
  });

  // ─── KPIs CON DATOS REALES ───────────────────────────────────────────────

  it('debe mostrar el costo unitario formateado en los KPIs', () => {
    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    expect(screen.getByText('$299.99')).toBeDefined();
  });

  it('debe mostrar el porcentaje de síntomas graves en los KPIs', () => {
    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    expect(screen.getByText('5.2%')).toBeDefined();
  });

  it('debe mostrar el índice de seguridad en los KPIs', () => {
    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    expect(screen.getByText('91.3%')).toBeDefined();
  });

  it('debe mostrar el total de reportes formateado en los KPIs', () => {
    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    // toLocaleString('es-MX') formatea 1240 como "1,240"
    expect(screen.getByText('1,240')).toBeDefined();
  });

  // ─── CHART CARDS ─────────────────────────────────────────────────────────

  it('debe renderizar dos ChartCards cuando hay perfil con topSintomas', () => {
    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    const charts = screen.getAllByTestId('chart-card');
    expect(charts).toHaveLength(2);
  });

  it('el primer ChartCard debe ser el radar con título "Radar de Valor"', () => {
    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    const charts = screen.getAllByTestId('chart-card');
    expect(charts[0].dataset.title).toBe('Radar de Valor');
    expect(charts[0].dataset.type).toBe('radar');
  });

  it('el segundo ChartCard debe ser el bar con título "Top 5 Síntomas"', () => {
    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    const charts = screen.getAllByTestId('chart-card');
    expect(charts[1].dataset.title).toBe('Top 5 Síntomas');
    expect(charts[1].dataset.type).toBe('bar');
  });

  it('debe mostrar el estado vacío "Sin síntomas registrados" cuando topSintomas está vacío', () => {
    (useSintomas as any).mockReturnValue({ data: mockSintomasRaw });
    (usePerfilRiesgo as any).mockReturnValue({
      data: { ...mockPerfil, topSintomas: [] },
      isPending: false,
    });

    render(<RadarPerfilRiesgo />);

    expect(screen.getByText('Sin síntomas registrados')).toBeDefined();
    // Solo debe haber un ChartCard (el radar), no dos
    expect(screen.getAllByTestId('chart-card')).toHaveLength(1);
  });

  it('el estado vacío de síntomas debe tener role="status" y aria-live="polite"', () => {
    (useSintomas as any).mockReturnValue({ data: mockSintomasRaw });
    (usePerfilRiesgo as any).mockReturnValue({
      data: { ...mockPerfil, topSintomas: [] },
      isPending: false,
    });

    render(<RadarPerfilRiesgo />);

    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-live')).toBe('polite');
  });

  // ─── BOTONES DE EXPORTACIÓN ───────────────────────────────────────────────

  it('debe mostrar los botones de exportación cuando hay perfil y no está cargando', () => {
    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    expect(screen.getByRole('button', { name: /descargar gráfica como png/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /configurar y descargar gráfica como pdf/i })).toBeDefined();
  });

  it('no debe mostrar botones de exportación cuando no hay perfil', () => {
    mockHookIdle();
    render(<RadarPerfilRiesgo />);
    expect(screen.queryByRole('button', { name: /png/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /pdf/i })).toBeNull();
  });

  it('los botones de exportación deben estar habilitados por defecto', () => {
    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    const btnPNG = screen.getByRole('button', { name: /png/i }) as HTMLButtonElement;
    const btnPDF = screen.getByRole('button', { name: /pdf/i }) as HTMLButtonElement;
    expect(btnPNG.disabled).toBe(false);
    expect(btnPDF.disabled).toBe(false);
  });

  // ─── MODAL DE EXPORTACIÓN ────────────────────────────────────────────────

  it('no debe mostrar el ExportarReporteModal al inicio', () => {
    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    expect(screen.queryByTestId('export-modal')).toBeNull();
  });

  it('debe abrir el ExportarReporteModal al hacer clic en el botón PDF', () => {
    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    fireEvent.click(screen.getByRole('button', { name: /configurar y descargar gráfica como pdf/i }));
    expect(screen.getByTestId('export-modal')).toBeDefined();
  });

  it('debe cerrar el ExportarReporteModal al llamar onClose desde el modal', () => {
    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    fireEvent.click(screen.getByRole('button', { name: /configurar y descargar gráfica como pdf/i }));
    fireEvent.click(screen.getByRole('button', { name: /cerrar modal/i }));
    expect(screen.queryByTestId('export-modal')).toBeNull();
  });

  // ─── EXPORTAR PNG ────────────────────────────────────────────────────────

  it('debe llamar a html2canvas al hacer clic en el botón PNG', async () => {
    const mockCanvas = {
      toDataURL: vi.fn().mockReturnValue('data:image/png;base64,abc123'),
      height: 400,
      width: 800,
    };
    (html2canvas as any).mockResolvedValueOnce(mockCanvas);

    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    fireEvent.click(screen.getByRole('button', { name: /descargar gráfica como png/i }));

    await vi.waitFor(() => {
      expect(html2canvas).toHaveBeenCalledTimes(1);
    });
  });

  it('debe deshabilitar ambos botones mientras exporta PNG', async () => {
    (html2canvas as any).mockReturnValue(new Promise(() => {}));

    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    fireEvent.click(screen.getByRole('button', { name: /descargar gráfica como png/i }));

    await vi.waitFor(() => {
      expect((screen.getByRole('button', { name: /png/i }) as HTMLButtonElement).disabled).toBe(true);
      expect((screen.getByRole('button', { name: /pdf/i }) as HTMLButtonElement).disabled).toBe(true);
    });
  });

  // ─── EXPORTAR PDF ────────────────────────────────────────────────────────

  it('debe llamar a html2canvas al confirmar la exportación PDF desde el modal', async () => {
    const mockCanvas = {
      toDataURL: vi.fn().mockReturnValue('data:image/png;base64,abc123'),
      height: 400,
      width: 800,
    };
    (html2canvas as any).mockResolvedValueOnce(mockCanvas);

    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    fireEvent.click(screen.getByRole('button', { name: /configurar y descargar gráfica como pdf/i }));
    fireEvent.click(screen.getByRole('button', { name: /exportar/i }));

    await vi.waitFor(() => {
      expect(html2canvas).toHaveBeenCalledTimes(1);
    });
  });

  it('debe deshabilitar el botón Exportar del modal mientras procesa el PDF', async () => {
    (html2canvas as any).mockReturnValue(new Promise(() => {}));

    mockHookConDatos();
    render(<RadarPerfilRiesgo />);
    fireEvent.click(screen.getByRole('button', { name: /configurar y descargar gráfica como pdf/i }));
    fireEvent.click(screen.getByRole('button', { name: /exportar/i }));

    const btnExportar = screen.getByRole('button', { name: /exportar/i }) as HTMLButtonElement;
    await vi.waitFor(() => {
      expect(btnExportar.disabled).toBe(true);
    });
  });
});