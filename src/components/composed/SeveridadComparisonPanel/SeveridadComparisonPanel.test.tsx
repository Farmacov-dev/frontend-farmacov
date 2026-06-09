// src/components/composed/SeveridadComparisonPanel/SeveridadComparisonPanel.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import SeveridadComparisonPanel from './SeveridadComparisonPanel';
import { useDistribucionSeveridadPorVacuna } from '../../../hooks/useDashboard';

// ─── MOCKS DE MÓDULOS ───────────────────────────────────────────────────────

vi.mock('../../../hooks/useDashboard', () => ({
  useDistribucionSeveridadPorVacuna: vi.fn(),
}));

// SelectDropdown: simulamos un <select> nativo para poder disparar onChange fácilmente
vi.mock('../../SelectDropdown/SelectDropdown', () => ({
  default: ({ options, placeholder, value, onChange }: any) => (
    <select
      aria-label={placeholder}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  ),
}));

vi.mock('../../charts/ChartCard', () => ({
  default: ({ title, subtitle, type, data }: any) => (
    <div data-testid="chart-card" data-type={type}>
      <span data-testid="chart-title">{title}</span>
      <span data-testid="chart-subtitle">{subtitle}</span>
      <span data-testid="chart-data">{JSON.stringify(data)}</span>
    </div>
  ),
}));

vi.mock('../../EmptyState/EmptyState', () => ({
  default: ({ title }: any) => (
    <div data-testid="empty-state">{title}</div>
  ),
}));

vi.mock('../../LoadingState/LoadingState', () => ({
  default: ({ color }: any) => (
    <div data-testid="loading-state" data-color={color ?? 'default'} />
  ),
}));

vi.mock('react-icons/fa', () => ({
  FaChartPie: () => <svg data-testid="icon-chart-pie" />,
}));

// ─── DATOS DE PRUEBA ────────────────────────────────────────────────────────

const mockVacunas = [
  { id: 1, name: 'Pfizer' },
  { id: 2, nombre: 'Moderna' },   // cubre la rama con 'nombre'
  { id: 3, name: 'AstraZeneca' },
];

const mockSeveridadData = { leve: 100, moderado: 50, grave: 10 };

// ─── HELPER: estado idle del hook (sin selección) ───────────────────────────
const mockHookIdle = () => {
  (useDistribucionSeveridadPorVacuna as any).mockReturnValue({
    data: undefined,
    isPending: false,
  });
};

// ─── SUITE ──────────────────────────────────────────────────────────────────

describe('Componente: SeveridadComparisonPanel', () => {

  beforeEach(() => {
    mockHookIdle();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // ─── RENDERIZADO INICIAL ─────────────────────────────────────────────────

  it('debe renderizar el encabezado del panel correctamente', () => {
    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);

    expect(screen.getByText('Comparativa de Severidad')).toBeDefined();
    expect(screen.getByText('Contrasta la distribución de efectos por fármaco')).toBeDefined();
  });

  it('debe renderizar los dos dropdowns con sus placeholders', () => {
    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);

    expect(screen.getByRole('combobox', { name: /vacuna a/i })).toBeDefined();
    expect(screen.getByRole('combobox', { name: /vacuna b/i })).toBeDefined();
  });

  it('debe mostrar el separador "VS" entre los dos selectores', () => {
    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);
    expect(screen.getByText('VS')).toBeDefined();
  });

  it('debe mostrar EmptyState en ambos paneles al inicio sin ninguna vacuna seleccionada', () => {
    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);

    const emptyStates = screen.getAllByTestId('empty-state');
    expect(emptyStates).toHaveLength(2);
    expect(screen.getByText('Selecciona una vacuna para el panel izquierdo')).toBeDefined();
    expect(screen.getByText('Selecciona una vacuna para el panel derecho')).toBeDefined();
  });

  it('no debe mostrar ningún ChartCard ni LoadingState al inicio', () => {
    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);

    expect(screen.queryByTestId('chart-card')).toBeNull();
    expect(screen.queryByTestId('loading-state')).toBeNull();
  });

  // ─── OPCIONES DE LOS DROPDOWNS ───────────────────────────────────────────

  it('debe poblar el dropdown A con todos los nombres de vacunas al inicio', () => {
    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);

    const selectA = screen.getByRole('combobox', { name: /vacuna a/i });
    // Las 3 vacunas deben ser opciones (+ la opción vacía del placeholder)
    expect(selectA.querySelectorAll('option').length).toBe(4);
  });

  it('debe resolver el nombre usando la propiedad "nombre" si "name" no existe', () => {
    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);

    const selectA = screen.getByRole('combobox', { name: /vacuna a/i });
    const opciones = Array.from(selectA.querySelectorAll('option')).map(o => o.textContent);
    expect(opciones).toContain('Moderna');
  });

  // ─── FILTRADO CRUZADO DE OPCIONES ────────────────────────────────────────

  it('debe excluir la vacuna seleccionada en B de las opciones de A', () => {
    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);

    // Seleccionamos Moderna en el dropdown B
    fireEvent.change(screen.getByRole('combobox', { name: /vacuna b/i }), {
      target: { value: 'Moderna' },
    });

    const selectA = screen.getByRole('combobox', { name: /vacuna a/i });
    const opciones = Array.from(selectA.querySelectorAll('option')).map(o => o.textContent);
    expect(opciones).not.toContain('Moderna');
    expect(opciones).toContain('Pfizer');
    expect(opciones).toContain('AstraZeneca');
  });

  it('debe excluir la vacuna seleccionada en A de las opciones de B', () => {
    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);

    fireEvent.change(screen.getByRole('combobox', { name: /vacuna a/i }), {
      target: { value: 'Pfizer' },
    });

    const selectB = screen.getByRole('combobox', { name: /vacuna b/i });
    const opciones = Array.from(selectB.querySelectorAll('option')).map(o => o.textContent);
    expect(opciones).not.toContain('Pfizer');
    expect(opciones).toContain('Moderna');
    expect(opciones).toContain('AstraZeneca');
  });

  // ─── ESTADO DE CARGA ─────────────────────────────────────────────────────
  // NOTA: usamos mockImplementation (no mockReturnValueOnce) porque el hook
  // se invoca dos veces por render. mockReturnValueOnce se agota en el render
  // inicial y no tiene valores para el re-render tras el fireEvent.
  // mockImplementation responde según el id recibido en cada llamada.

  it('debe mostrar LoadingState en el panel A mientras el hook está cargando', () => {
    const ID_PFIZER = 1;
    (useDistribucionSeveridadPorVacuna as any).mockImplementation((id: number | undefined) => {
      if (id === ID_PFIZER) return { data: undefined, isPending: true };
      return { data: undefined, isPending: false };
    });

    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);

    fireEvent.change(screen.getByRole('combobox', { name: /vacuna a/i }), {
      target: { value: 'Pfizer' },
    });

    expect(screen.getByTestId('loading-state')).toBeDefined();
    expect(screen.getByText('Selecciona una vacuna para el panel derecho')).toBeDefined();
  });

  it('debe mostrar LoadingState en el panel B mientras el hook está cargando', () => {
    const ID_MODERNA = 2;
    (useDistribucionSeveridadPorVacuna as any).mockImplementation((id: number | undefined) => {
      if (id === ID_MODERNA) return { data: undefined, isPending: true };
      return { data: undefined, isPending: false };
    });

    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);

    fireEvent.change(screen.getByRole('combobox', { name: /vacuna b/i }), {
      target: { value: 'Moderna' },
    });

    expect(screen.getByTestId('loading-state')).toBeDefined();
    expect(screen.getByText('Selecciona una vacuna para el panel izquierdo')).toBeDefined();
  });

  // ─── CHART CARD CON DATOS ────────────────────────────────────────────────

  it('debe mostrar ChartCard con el título correcto cuando el panel A tiene datos', () => {
    const ID_PFIZER = 1;
    (useDistribucionSeveridadPorVacuna as any).mockImplementation((id: number | undefined) => {
      if (id === ID_PFIZER) return { data: mockSeveridadData, isPending: false };
      return { data: undefined, isPending: false };
    });

    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);

    fireEvent.change(screen.getByRole('combobox', { name: /vacuna a/i }), {
      target: { value: 'Pfizer' },
    });

    expect(screen.getByTestId('chart-title').textContent).toBe('Severidad: Pfizer');
  });

  it('debe mostrar ChartCard con el título correcto cuando el panel B tiene datos', () => {
    const ID_MODERNA = 2;
    (useDistribucionSeveridadPorVacuna as any).mockImplementation((id: number | undefined) => {
      if (id === ID_MODERNA) return { data: mockSeveridadData, isPending: false };
      return { data: undefined, isPending: false };
    });

    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);

    fireEvent.change(screen.getByRole('combobox', { name: /vacuna b/i }), {
      target: { value: 'Moderna' },
    });

    expect(screen.getByTestId('chart-title').textContent).toBe('Severidad: Moderna');
  });

  it('debe pasar el subtitle correcto a ChartCard', () => {
    const ID_PFIZER = 1;
    (useDistribucionSeveridadPorVacuna as any).mockImplementation((id: number | undefined) => {
      if (id === ID_PFIZER) return { data: mockSeveridadData, isPending: false };
      return { data: undefined, isPending: false };
    });

    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);

    fireEvent.change(screen.getByRole('combobox', { name: /vacuna a/i }), {
      target: { value: 'Pfizer' },
    });

    expect(screen.getByTestId('chart-subtitle').textContent).toBe('Basado en reportes clínicos individuales');
  });

  // ─── formatData ──────────────────────────────────────────────────────────

  it('debe transformar los datos de la API al formato correcto para ChartCard', () => {
    const ID_PFIZER = 1;
    (useDistribucionSeveridadPorVacuna as any).mockImplementation((id: number | undefined) => {
      if (id === ID_PFIZER) return { data: mockSeveridadData, isPending: false };
      return { data: undefined, isPending: false };
    });

    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);

    fireEvent.change(screen.getByRole('combobox', { name: /vacuna a/i }), {
      target: { value: 'Pfizer' },
    });

    const chartData = JSON.parse(screen.getByTestId('chart-data').textContent!);
    expect(chartData).toEqual([
      { label: 'Leve',     value: 100 },
      { label: 'Moderado', value: 50  },
      { label: 'Grave',    value: 10  },
    ]);
  });

  it('debe pasar type="pie" a ChartCard', () => {
    const ID_PFIZER = 1;
    (useDistribucionSeveridadPorVacuna as any).mockImplementation((id: number | undefined) => {
      if (id === ID_PFIZER) return { data: mockSeveridadData, isPending: false };
      return { data: undefined, isPending: false };
    });

    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);

    fireEvent.change(screen.getByRole('combobox', { name: /vacuna a/i }), {
      target: { value: 'Pfizer' },
    });

    expect(screen.getByTestId('chart-card').getAttribute('data-type')).toBe('pie');
  });

  // ─── AMBOS PANELES CON DATOS ─────────────────────────────────────────────

  it('debe mostrar dos ChartCards cuando ambas vacunas están seleccionadas y tienen datos', () => {
    const mockDataB = { leve: 80, moderado: 30, grave: 5 };
    const ID_PFIZER = 1;
    const ID_ASTRAZENECA = 3;
    (useDistribucionSeveridadPorVacuna as any).mockImplementation((id: number | undefined) => {
      if (id === ID_PFIZER)      return { data: mockSeveridadData, isPending: false };
      if (id === ID_ASTRAZENECA) return { data: mockDataB, isPending: false };
      return { data: undefined, isPending: false };
    });

    render(<SeveridadComparisonPanel vacunas={mockVacunas} />);

    fireEvent.change(screen.getByRole('combobox', { name: /vacuna a/i }), {
      target: { value: 'Pfizer' },
    });
    fireEvent.change(screen.getByRole('combobox', { name: /vacuna b/i }), {
      target: { value: 'AstraZeneca' },
    });

    const charts = screen.getAllByTestId('chart-card');
    expect(charts).toHaveLength(2);
    expect(screen.queryByTestId('empty-state')).toBeNull();
  });
});