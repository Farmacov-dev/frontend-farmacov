// src/components/charts/GroupedBarChart.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import html2canvas from 'html2canvas';
import GroupedBarChart from './GroupedBarChart';

// ─── MOCKS ──────────────────────────────────────────────────────────────────

vi.mock('recharts', () => ({
  BarChart:            ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  Bar: () => null, XAxis: () => null, YAxis: () => null,
  CartesianGrid: () => null, Tooltip: () => null, Legend: () => null,
}));

vi.mock('html2canvas', () => ({ default: vi.fn() }));

// jsPDF mockeado como clase constructible con todos los métodos necesarios
vi.mock('jspdf', () => ({
  default: vi.fn().mockImplementation(() => ({
    addImage:    vi.fn(),
    save:        vi.fn(),
    setFont:     vi.fn(),
    setFontSize: vi.fn(),
    text:        vi.fn(),
  })),
}));

vi.mock('lucide-react', () => ({
  Download: () => <svg data-testid="icon-download" />,
  FileText: () => <svg data-testid="icon-filetext" />,
}));

// onExport('') — string vacío evita la rama pdf.text y llega al setIsExportModalOpen(false)
vi.mock('../composed/ExportarReporteModal/ExportarReporteModal', () => ({
  default: ({ isOpen, onClose, onExport, isLoading }: any) =>
    isOpen ? (
      <div data-testid="export-modal">
        <button onClick={onClose}>Cerrar Modal</button>
        <button onClick={() => onExport('')} disabled={isLoading}>
          Exportar
        </button>
      </div>
    ) : null,
}));

vi.mock('../primary/VaccineCheckboxSelector/VaccineCheckboxSelector', () => ({
  COLORES_VACUNA: ['#10B981', '#F59E0B', '#EF4444'],
}));

// ─── DATOS DE PRUEBA ────────────────────────────────────────────────────────

const mockData = [
  { sintoma: 'Dolor',  Pfizer: 80, Moderna: 60 },
  { sintoma: 'Fiebre', Pfizer: 50, Moderna: 70 },
];

const mockVacunas = [
  { id: 1, nombre: 'Pfizer'  },
  { id: 2, nombre: 'Moderna' },
];

const mockCanvas = {
  toDataURL: vi.fn().mockReturnValue('data:image/png;base64,abc123'),
  height: 400,
  width:  800,
};

// ─── SUITE ──────────────────────────────────────────────────────────────────

describe('Componente: GroupedBarChart', () => {

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // ─── ESTRUCTURA Y VALORES POR DEFECTO ────────────────────────────────────

  it('debe renderizar el título y subtítulo pasados por props', () => {
    render(<GroupedBarChart title="Comparativa" subtitle="Por vacuna" data={mockData} vacunasSeleccionadas={mockVacunas} />);
    expect(screen.getByText('Comparativa')).toBeDefined();
    expect(screen.getByText('Por vacuna')).toBeDefined();
  });

  it('debe usar el título por defecto si no se pasa la prop title', () => {
    render(<GroupedBarChart data={mockData} vacunasSeleccionadas={mockVacunas} />);
    expect(screen.getByText('Distribución de síntomas')).toBeDefined();
  });

  it('debe usar el subtítulo por defecto si no se pasa la prop subtitle', () => {
    render(<GroupedBarChart data={mockData} vacunasSeleccionadas={mockVacunas} />);
    expect(screen.getByText('Comparativa por vacuna seleccionada')).toBeDefined();
  });

  it('debe renderizar el region con aria-label que incluye el título', () => {
    render(<GroupedBarChart title="Comparativa" data={mockData} vacunasSeleccionadas={mockVacunas} />);
    expect(screen.getByRole('region', { name: /gráfica comparativa: comparativa/i })).toBeDefined();
  });

  // ─── ESTADO VACÍO ────────────────────────────────────────────────────────

  it('debe mostrar el mensaje de estado vacío cuando data está vacío', () => {
    render(<GroupedBarChart data={[]} vacunasSeleccionadas={mockVacunas} />);
    expect(screen.getByText(/selecciona al menos una vacuna para ver la gráfica/i)).toBeDefined();
  });

  it('debe mostrar el mensaje de estado vacío cuando vacunasSeleccionadas está vacío', () => {
    render(<GroupedBarChart data={mockData} vacunasSeleccionadas={[]} />);
    expect(screen.getByText(/selecciona al menos una vacuna para ver la gráfica/i)).toBeDefined();
  });

  it('debe mostrar el estado vacío cuando tanto data como vacunasSeleccionadas están vacíos', () => {
    render(<GroupedBarChart data={[]} vacunasSeleccionadas={[]} />);
    expect(screen.getByText(/selecciona al menos una vacuna para ver la gráfica/i)).toBeDefined();
  });

  it('el estado vacío debe tener role="status" y aria-live="polite"', () => {
    render(<GroupedBarChart data={[]} vacunasSeleccionadas={[]} />);
    const status = screen.getByRole('status');
    expect(status).toBeDefined();
    expect(status.getAttribute('aria-live')).toBe('polite');
  });

  it('no debe mostrar el estado vacío cuando hay data y vacunas seleccionadas', () => {
    render(<GroupedBarChart data={mockData} vacunasSeleccionadas={mockVacunas} />);
    expect(screen.queryByRole('status')).toBeNull();
    expect(screen.queryByText(/selecciona al menos una vacuna/i)).toBeNull();
  });

  // ─── GRÁFICA ─────────────────────────────────────────────────────────────

  it('debe renderizar la gráfica cuando hay data y vacunas seleccionadas', () => {
    render(<GroupedBarChart data={mockData} vacunasSeleccionadas={mockVacunas} />);
    expect(screen.getByTestId('bar-chart')).toBeDefined();
  });

  it('no debe renderizar la gráfica cuando data está vacío', () => {
    render(<GroupedBarChart data={[]} vacunasSeleccionadas={mockVacunas} />);
    expect(screen.queryByTestId('bar-chart')).toBeNull();
  });

  it('no debe renderizar la gráfica cuando vacunasSeleccionadas está vacío', () => {
    render(<GroupedBarChart data={mockData} vacunasSeleccionadas={[]} />);
    expect(screen.queryByTestId('bar-chart')).toBeNull();
  });

  // ─── BOTONES DE EXPORTACIÓN ───────────────────────────────────────────────

  it('debe mostrar los botones de exportación solo cuando hay data y vacunas', () => {
    render(<GroupedBarChart data={mockData} vacunasSeleccionadas={mockVacunas} />);
    expect(screen.getByRole('button', { name: /descargar gráfica como png/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /configurar y descargar gráfica como pdf/i })).toBeDefined();
  });

  it('no debe mostrar botones de exportación cuando data está vacío', () => {
    render(<GroupedBarChart data={[]} vacunasSeleccionadas={mockVacunas} />);
    expect(screen.queryByRole('button', { name: /png/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /pdf/i })).toBeNull();
  });

  it('no debe mostrar botones de exportación cuando vacunasSeleccionadas está vacío', () => {
    render(<GroupedBarChart data={mockData} vacunasSeleccionadas={[]} />);
    expect(screen.queryByRole('button', { name: /png/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /pdf/i })).toBeNull();
  });

  it('los botones de exportación deben estar habilitados por defecto', () => {
    render(<GroupedBarChart data={mockData} vacunasSeleccionadas={mockVacunas} />);
    const btnPNG = screen.getByRole('button', { name: /png/i }) as HTMLButtonElement;
    const btnPDF = screen.getByRole('button', { name: /pdf/i }) as HTMLButtonElement;
    expect(btnPNG.disabled).toBe(false);
    expect(btnPDF.disabled).toBe(false);
  });

  // ─── MODAL DE EXPORTACIÓN ────────────────────────────────────────────────

  it('no debe mostrar el ExportarReporteModal al inicio', () => {
    render(<GroupedBarChart data={mockData} vacunasSeleccionadas={mockVacunas} />);
    expect(screen.queryByTestId('export-modal')).toBeNull();
  });

  it('debe abrir el ExportarReporteModal al hacer clic en el botón PDF', () => {
    render(<GroupedBarChart data={mockData} vacunasSeleccionadas={mockVacunas} />);
    fireEvent.click(screen.getByRole('button', { name: /configurar y descargar gráfica como pdf/i }));
    expect(screen.getByTestId('export-modal')).toBeDefined();
  });

  it('debe cerrar el ExportarReporteModal al llamar onClose desde el modal', () => {
    render(<GroupedBarChart data={mockData} vacunasSeleccionadas={mockVacunas} />);
    fireEvent.click(screen.getByRole('button', { name: /configurar y descargar gráfica como pdf/i }));
    fireEvent.click(screen.getByRole('button', { name: /cerrar modal/i }));
    expect(screen.queryByTestId('export-modal')).toBeNull();
  });

  // ─── EXPORTAR PNG ────────────────────────────────────────────────────────

  it('debe llamar a html2canvas al hacer clic en el botón PNG', async () => {
    (html2canvas as any).mockResolvedValueOnce(mockCanvas);

    render(<GroupedBarChart title="Comparativa" data={mockData} vacunasSeleccionadas={mockVacunas} />);
    fireEvent.click(screen.getByRole('button', { name: /descargar gráfica como png/i }));

    await vi.waitFor(() => {
      expect(html2canvas).toHaveBeenCalledTimes(1);
    });
  });

  it('debe deshabilitar ambos botones mientras exporta PNG', async () => {
    (html2canvas as any).mockReturnValue(new Promise(() => {}));

    render(<GroupedBarChart title="Comparativa" data={mockData} vacunasSeleccionadas={mockVacunas} />);
    fireEvent.click(screen.getByRole('button', { name: /descargar gráfica como png/i }));

    await vi.waitFor(() => {
      expect((screen.getByRole('button', { name: /png/i }) as HTMLButtonElement).disabled).toBe(true);
      expect((screen.getByRole('button', { name: /pdf/i }) as HTMLButtonElement).disabled).toBe(true);
    });
  });

  // ─── EXPORTAR PDF ────────────────────────────────────────────────────────

  it('debe llamar a html2canvas al confirmar la exportación PDF desde el modal', async () => {
    (html2canvas as any).mockResolvedValueOnce(mockCanvas);

    render(<GroupedBarChart title="Comparativa" data={mockData} vacunasSeleccionadas={mockVacunas} />);
    fireEvent.click(screen.getByRole('button', { name: /configurar y descargar gráfica como pdf/i }));
    fireEvent.click(screen.getByRole('button', { name: /exportar/i }));

    await vi.waitFor(() => {
      expect(html2canvas).toHaveBeenCalledTimes(1);
    });
  });

  it('debe deshabilitar el botón Exportar del modal mientras procesa el PDF', async () => {
    (html2canvas as any).mockReturnValue(new Promise(() => {}));

    render(<GroupedBarChart title="Comparativa" data={mockData} vacunasSeleccionadas={mockVacunas} />);
    fireEvent.click(screen.getByRole('button', { name: /configurar y descargar gráfica como pdf/i }));
    fireEvent.click(screen.getByRole('button', { name: /exportar/i }));

    const btnExportar = screen.getByRole('button', { name: /exportar/i }) as HTMLButtonElement;
    await vi.waitFor(() => {
      expect(btnExportar.disabled).toBe(true);
    });
  });
});