// src/components/VaccineTableRow/VaccineTableRow.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import VaccineTableRow from './VaccineTableRow';
import type { Vaccine } from './VaccineTableRow';

vi.mock('lucide-react', () => ({
  Info: ({ onClick }: any) => <svg data-testid="icon-info" onClick={onClick} />,
}));

vi.mock('../EffectivenessBadge/EffectivenessBadge', () => ({
  default: ({ value }: any) => <span data-testid="effectiveness-badge">{value}%</span>,
}));

const mockVaccine: Vaccine = {
  id: 1,
  name: 'Comirnaty',
  farmaceutica: 'Pfizer',
  costoUnitario: 25.5,
  temperatura: '-70°C',
  indice_seguridad: 95,
  longevidad: '12 meses',
};

describe('Componente: VaccineTableRow', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar el nombre de la vacuna', () => {
    render(<table><tbody><VaccineTableRow vaccine={mockVaccine} /></tbody></table>);
    expect(screen.getByText('Comirnaty')).toBeDefined();
  });

  it('debe renderizar la farmacéutica', () => {
    render(<table><tbody><VaccineTableRow vaccine={mockVaccine} /></tbody></table>);
    expect(screen.getByText('Pfizer')).toBeDefined();
  });

  it('debe renderizar el costo formateado a 2 decimales', () => {
    render(<table><tbody><VaccineTableRow vaccine={mockVaccine} /></tbody></table>);
    expect(screen.getByText('$25.50')).toBeDefined();
  });

  it('debe mostrar "0.00" cuando costoUnitario es 0', () => {
    const vacunaSinCosto = { ...mockVaccine, costoUnitario: 0 };
    render(<table><tbody><VaccineTableRow vaccine={vacunaSinCosto} /></tbody></table>);
    expect(screen.getByText('$0.00')).toBeDefined();
  });

  it('debe renderizar la temperatura', () => {
    render(<table><tbody><VaccineTableRow vaccine={mockVaccine} /></tbody></table>);
    expect(screen.getByText('-70°C')).toBeDefined();
  });

  it('debe renderizar la longevidad', () => {
    render(<table><tbody><VaccineTableRow vaccine={mockVaccine} /></tbody></table>);
    expect(screen.getByText('12 meses')).toBeDefined();
  });

  it('debe renderizar el EffectivenessBadge con indice_seguridad', () => {
    render(<table><tbody><VaccineTableRow vaccine={mockVaccine} /></tbody></table>);
    expect(screen.getByTestId('effectiveness-badge')).toBeDefined();
    expect(screen.getByText('95%')).toBeDefined();
  });

  it('debe llamar onClick al hacer clic en la fila', () => {
    const mockOnClick = vi.fn();
    render(<table><tbody><VaccineTableRow vaccine={mockVaccine} onClick={mockOnClick} /></tbody></table>);
    fireEvent.click(screen.getByText('Comirnaty'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('debe llamar onInfoClick al hacer clic en el icono de info', () => {
    const mockOnInfoClick = vi.fn();
    const mockOnClick = vi.fn();
    render(
      <table><tbody>
        <VaccineTableRow vaccine={mockVaccine} onClick={mockOnClick} onInfoClick={mockOnInfoClick} />
      </tbody></table>
    );
    fireEvent.click(screen.getByTestId('icon-info'));
    expect(mockOnInfoClick).toHaveBeenCalledWith(mockVaccine);
  });

  it('no debe llamar onClick de la fila al hacer clic en el icono de info', () => {
    const mockOnInfoClick = vi.fn();
    const mockOnClick = vi.fn();
    render(
      <table><tbody>
        <VaccineTableRow vaccine={mockVaccine} onClick={mockOnClick} onInfoClick={mockOnInfoClick} />
      </tbody></table>
    );
    fireEvent.click(screen.getByTestId('icon-info'));
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
