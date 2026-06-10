// src/components/ComparisonTable/ComparisonTable.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import ComparisonTable from './ComparisonTable';
import type { ComparisonRowProps } from '../ComparisonRow/ComparisonRow';

vi.mock('../ComparisonRow/ComparisonRow', () => ({
  default: ({ label, showDivider }: any) => (
    <div
      data-testid="comparison-row"
      data-label={label}
      data-divider={String(showDivider)}
    />
  ),
}));

const mockRows: ComparisonRowProps[] = [
  { index: 1, label: 'Eficacia',    left: { value: '95%', status: 'better' }, right: { value: '90%', status: 'worse'   } },
  { index: 2, label: 'Seguridad',   left: { value: '88%', status: 'worse'  }, right: { value: '92%', status: 'better'  } },
  { index: 3, label: 'Durabilidad', left: { value: '12m', status: 'neutral'}, right: { value: '12m', status: 'neutral' } },
];

describe('Componente: ComparisonTable', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar una fila por cada elemento del array rows', () => {
    render(<ComparisonTable rows={mockRows} />);

    expect(screen.getAllByTestId('comparison-row')).toHaveLength(3);
  });

  it('debe mostrar la leyenda "Mejor opción" y "Opción inferior"', () => {
    render(<ComparisonTable rows={mockRows} />);

    expect(screen.getByText(/mejor opción/i)).toBeDefined();
    expect(screen.getByText(/opción inferior/i)).toBeDefined();
  });

  it('debe llamar a onVolver al hacer clic en el botón "Volver"', () => {
    const mockVolver = vi.fn();
    render(<ComparisonTable rows={mockRows} onVolver={mockVolver} />);

    fireEvent.click(screen.getByRole('button', { name: /volver/i }));

    expect(mockVolver).toHaveBeenCalledTimes(1);
  });

  it('debe pasar showDivider=false únicamente a la última fila', () => {
    render(<ComparisonTable rows={mockRows} />);

    const filas = screen.getAllByTestId('comparison-row');

    expect(filas[0].getAttribute('data-divider')).toBe('true');
    expect(filas[1].getAttribute('data-divider')).toBe('true');
    expect(filas[2].getAttribute('data-divider')).toBe('false');
  });
});
