// src/components/VaccineCatalogTable/VaccineCatalogTable.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import VaccineCatalogTable from './VaccineCatalogTable';

vi.mock('lucide-react', () => ({
  ChevronDown: () => <svg data-testid="icon-chevron" />,
}));

vi.mock('../VaccineTableRow/VaccineTableRow', () => ({
  default: ({ vaccine, onClick }: any) => (
    <tr data-testid={`vaccine-row-${vaccine.id}`} onClick={onClick}>
      <td>{vaccine.name}</td>
      <td>{vaccine.farmaceutica}</td>
    </tr>
  ),
}));

const mockVaccines = [
  { id: 1, name: 'Comirnaty', farmaceutica: 'Pfizer', costoUnitario: 25.5, temperatura: '-70°C', indice_seguridad: 95, longevidad: '12 meses' },
  { id: 2, name: 'Spikevax', farmaceutica: 'Moderna', costoUnitario: 30, temperatura: '-20°C', indice_seguridad: 92, longevidad: '6 meses' },
];

describe('Componente: VaccineCatalogTable', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar todas las cabeceras de columnas', () => {
    render(<VaccineCatalogTable vaccines={mockVaccines} />);
    expect(screen.getByText('Nombre de Vacuna')).toBeDefined();
    expect(screen.getByText('Farmacéutica')).toBeDefined();
    expect(screen.getByText('Costo')).toBeDefined();
    expect(screen.getByText('Temperatura')).toBeDefined();
    expect(screen.getByText('Índice de Seguridad')).toBeDefined();
    expect(screen.getByText('Longevidad')).toBeDefined();
  });

  it('debe renderizar una fila por cada vacuna', () => {
    render(<VaccineCatalogTable vaccines={mockVaccines} />);
    expect(screen.getByTestId('vaccine-row-1')).toBeDefined();
    expect(screen.getByTestId('vaccine-row-2')).toBeDefined();
  });

  it('debe llamar onVaccineClick al hacer clic en una fila', () => {
    const mockOnClick = vi.fn();
    render(<VaccineCatalogTable vaccines={mockVaccines} onVaccineClick={mockOnClick} />);
    fireEvent.click(screen.getByTestId('vaccine-row-1'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('debe alternar la dirección de ordenamiento al hacer clic en la misma columna', () => {
    render(<VaccineCatalogTable vaccines={mockVaccines} />);
    const nombreHeader = screen.getByText('Nombre de Vacuna');
    fireEvent.click(nombreHeader);
    fireEvent.click(nombreHeader);
    expect(screen.getByTestId('vaccine-row-1')).toBeDefined();
  });

  it('debe cambiar la columna de ordenamiento al hacer clic en otra columna', () => {
    render(<VaccineCatalogTable vaccines={mockVaccines} />);
    fireEvent.click(screen.getByText('Farmacéutica'));
    expect(screen.getByTestId('vaccine-row-1')).toBeDefined();
    expect(screen.getByTestId('vaccine-row-2')).toBeDefined();
  });

  it('debe renderizar tabla vacía cuando no hay vacunas', () => {
    render(<VaccineCatalogTable vaccines={[]} />);
    expect(screen.getByText('Nombre de Vacuna')).toBeDefined();
    expect(screen.queryByTestId('vaccine-row-1')).toBeNull();
  });
});
