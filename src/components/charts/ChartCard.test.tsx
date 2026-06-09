// src/components/charts/ChartCard.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import html2canvas from 'html2canvas';
import ChartCard from './ChartCard';

// ─── MOCKS ──────────────────────────────────────────────────────────────────

vi.mock('recharts', () => ({
  BarChart:          ({ children }: any) => <div data-testid="chart-bar">{children}</div>,
  LineChart:         ({ children }: any) => <div data-testid="chart-line">{children}</div>,
  AreaChart:         ({ children }: any) => <div data-testid="chart-area">{children}</div>,
  PieChart:          ({ children }: any) => <div data-testid="chart-pie">{children}</div>,
  RadarChart:        ({ children }: any) => <div data-testid="chart-radar">{children}</div>,
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  Bar: () => null, Line: () => null, Area: () => null,
  Pie: () => null, Cell: () => null, Radar: () => null,
  XAxis: () => null, YAxis: () => null, CartesianGrid: () => null,
  Tooltip: () => null, Legend: () => null,
  PolarGrid: () => null, PolarAngleAxis: () => null, PolarRadiusAxis: () => null,
}));

vi.mock('html2canvas', () => ({ default: vi.fn() }));
vi.mock('jspdf', () => ({
  default: vi.fn().mockImplementation(() => ({
    addImage: vi.fn(),
    save:     vi.fn(),
    setFont:  vi.fn(),
    setFontSize: vi.fn(),
    text:     vi.fn(),
  })),
}));

vi.mock('lucide-react', () => ({
  Download: () => <svg data-testid="icon-download" />,
  FileText: () => <svg data-testid="icon-filetext" />,
}));

vi.mock('../composed/ExportarReporteModal/ExportarReporteModal', () => ({
  default: ({ isOpen, onClose, onExport, isLoading }: any) =>
    isOpen ? (
      <div data-testid="export-modal">
        <button onClick={onClose}>Cerrar Modal</button>
        {/* Pasamos string vacío para evitar la rama pdf.text y llegar al setIsExportModalOpen(false) */}
        <button onClick={() => onExport('')} disabled={isLoading}>
          Exportar
        </button>
      </div>
    ) : null,
}));

// ─── DATOS DE PRUEBA ────────────────────────────────────────────────────────

const mockData = [
  { label: 'Leve',     value: 100 },
  { label: 'Moderado', value: 50  },
  { label: 'Grave',    value: 10  },
];

// Canvas falso que html2canvas resolverá
const mockCanvas = {
  toDataURL: vi.fn().mockReturnValue('data:image/png;base64,abc123'),
  height: 400,
  width: 800,
};

// ─── SUITE ──────────────────────────────────────────────────────────────────

describe('Componente: ChartCard', () => {

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // ─── ESTRUCTURA Y VALORES POR DEFECTO ────────────────────────────────────

  it('debe renderizar el título y subtítulo pasados por props', () => {
    render(<ChartCard title="Severidad" subtitle="Por reporte clínico" />);
    expect(screen.getByText('Severidad')).toBeDefined();
    expect(screen.getByText('Por reporte clínico')).toBeDefined();
  });

  it('debe usar el título por defecto si no se pasa la prop title', () => {
    render(<ChartCard />);
    expect(screen.getByText('Frecuencia de síntomas')).toBeDefined();
  });

  it('debe usar el subtítulo por defecto si no se pasa la prop subtitle', () => {
    render(<ChartCard />);
    expect(screen.getByText('Distribución estimada por síntoma seleccionado')).toBeDefined();
  });

  it('debe renderizar el region con aria-label que incluye el título', () => {
    render(<ChartCard title="Severidad" />);
    expect(screen.getByRole('region', { name: /gráfica de severidad/i })).toBeDefined();
  });

  it('debe usar el aria-label por defecto si no se pasa title', () => {
    render(<ChartCard />);
    expect(screen.getByRole('region', { name: /gráfica de frecuencia de síntomas/i })).toBeDefined();
  });

  // ─── TIPO DE GRÁFICA ─────────────────────────────────────────────────────

  it('debe renderizar BarChart por defecto si no se pasa la prop type', () => {
    render(<ChartCard data={mockData} />);
    expect(screen.getByTestId('chart-bar')).toBeDefined();
  });

  it('debe renderizar LineChart cuando type="line"', () => {
    render(<ChartCard data={mockData} type="line" />);
    expect(screen.getByTestId('chart-line')).toBeDefined();
    expect(screen.queryByTestId('chart-bar')).toBeNull();
  });

  it('debe renderizar AreaChart cuando type="area"', () => {
    render(<ChartCard data={mockData} type="area" />);
    expect(screen.getByTestId('chart-area')).toBeDefined();
  });

  it('debe renderizar PieChart cuando type="pie"', () => {
    render(<ChartCard data={mockData} type="pie" />);
    expect(screen.getByTestId('chart-pie')).toBeDefined();
  });

  it('debe renderizar RadarChart cuando type="radar"', () => {
    render(<ChartCard data={mockData} type="radar" />);
    expect(screen.getByTestId('chart-radar')).toBeDefined();
  });

  // ─── BOTONES DE EXPORTACIÓN ───────────────────────────────────────────────

  it('debe renderizar el botón de descarga PNG con su aria-label', () => {
    render(<ChartCard />);
    expect(screen.getByRole('button', { name: /descargar gráfica como imagen png/i })).toBeDefined();
  });

  it('debe renderizar el botón de descarga PDF con su aria-label', () => {
    render(<ChartCard />);
    expect(screen.getByRole('button', { name: /configurar y descargar gráfica como pdf/i })).toBeDefined();
  });

  it('los botones de exportación deben estar habilitados por defecto', () => {
    render(<ChartCard />);
    const btnPNG = screen.getByRole('button', { name: /png/i }) as HTMLButtonElement;
    const btnPDF = screen.getByRole('button', { name: /pdf/i }) as HTMLButtonElement;
    expect(btnPNG.disabled).toBe(false);
    expect(btnPDF.disabled).toBe(false);
  });

  // ─── MODAL DE EXPORTACIÓN ────────────────────────────────────────────────

  it('no debe mostrar el ExportarReporteModal al inicio', () => {
    render(<ChartCard />);
    expect(screen.queryByTestId('export-modal')).toBeNull();
  });

  it('debe abrir el ExportarReporteModal al hacer clic en el botón PDF', () => {
    render(<ChartCard />);
    fireEvent.click(screen.getByRole('button', { name: /configurar y descargar gráfica como pdf/i }));
    expect(screen.getByTestId('export-modal')).toBeDefined();
  });

  it('debe cerrar el ExportarReporteModal al llamar onClose desde el modal', () => {
    render(<ChartCard />);
    fireEvent.click(screen.getByRole('button', { name: /configurar y descargar gráfica como pdf/i }));
    fireEvent.click(screen.getByRole('button', { name: /cerrar modal/i }));
    expect(screen.queryByTestId('export-modal')).toBeNull();
  });

  // ─── EXPORTAR PNG ────────────────────────────────────────────────────────

  it('debe llamar a html2canvas al hacer clic en el botón PNG', async () => {
    (html2canvas as any).mockResolvedValueOnce(mockCanvas);

    render(<ChartCard title="Severidad" />);
    fireEvent.click(screen.getByRole('button', { name: /descargar gráfica como imagen png/i }));

    await vi.waitFor(() => {
      expect(html2canvas).toHaveBeenCalledTimes(1);
    });
  });

  it('debe deshabilitar el botón PNG mientras exporta', async () => {
    // html2canvas nunca resuelve durante este test — simula estado de carga indefinido
    (html2canvas as any).mockReturnValue(new Promise(() => {}));

    render(<ChartCard title="Severidad" />);
    const btnPNG = screen.getByRole('button', { name: /descargar gráfica como imagen png/i }) as HTMLButtonElement;

    fireEvent.click(btnPNG);

    await vi.waitFor(() => {
      expect(btnPNG.disabled).toBe(true);
    });
  });

  it('debe deshabilitar el botón PDF mientras exporta PNG', async () => {
    (html2canvas as any).mockReturnValue(new Promise(() => {}));

    render(<ChartCard title="Severidad" />);
    fireEvent.click(screen.getByRole('button', { name: /descargar gráfica como imagen png/i }));

    const btnPDF = screen.getByRole('button', { name: /configurar y descargar gráfica como pdf/i }) as HTMLButtonElement;
    await vi.waitFor(() => {
      expect(btnPDF.disabled).toBe(true);
    });
  });

  // ─── EXPORTAR PDF ────────────────────────────────────────────────────────

  it('debe llamar a html2canvas al confirmar la exportación PDF desde el modal', async () => {
    (html2canvas as any).mockResolvedValueOnce(mockCanvas);

    render(<ChartCard title="Severidad" />);

    // Abrir modal y confirmar exportación
    fireEvent.click(screen.getByRole('button', { name: /configurar y descargar gráfica como pdf/i }));
    fireEvent.click(screen.getByRole('button', { name: /exportar/i }));

    await vi.waitFor(() => {
      expect(html2canvas).toHaveBeenCalledTimes(1);
    });
  });

  it('debe deshabilitar el botón Exportar del modal mientras procesa el PDF', async () => {
    (html2canvas as any).mockReturnValue(new Promise(() => {}));

    render(<ChartCard title="Severidad" />);
    fireEvent.click(screen.getByRole('button', { name: /configurar y descargar gráfica como pdf/i }));
    fireEvent.click(screen.getByRole('button', { name: /exportar/i }));

    const btnExportar = screen.getByRole('button', { name: /exportar/i }) as HTMLButtonElement;
    await vi.waitFor(() => {
      expect(btnExportar.disabled).toBe(true);
    });
  });
});