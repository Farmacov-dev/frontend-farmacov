// src/components/SelectDropdown/SelectDropdown.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import SelectDropdown from './SelectDropdown';

vi.mock('lucide-react', () => ({
  ChevronDown: () => <svg data-testid="icon-chevron" />,
}));

const opciones = ['Opción A', 'Opción B', 'Opción C'];

describe('Componente: SelectDropdown', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar el placeholder por defecto', () => {
    render(<SelectDropdown options={opciones} />);
    expect(screen.getByText('Seleccionar')).toBeDefined();
  });

  it('debe mostrar el placeholder personalizado', () => {
    render(<SelectDropdown options={opciones} placeholder="Elige uno" />);
    expect(screen.getByText('Elige uno')).toBeDefined();
  });

  it('debe mostrar el valor seleccionado cuando se proporciona', () => {
    render(<SelectDropdown options={opciones} value="Opción B" />);
    expect(screen.getByText('Opción B')).toBeDefined();
  });

  it('debe mostrar las opciones al hacer clic en el trigger', () => {
    render(<SelectDropdown options={opciones} />);
    expect(screen.queryByText('Opción A')).toBeNull();
    fireEvent.click(screen.getByText('Seleccionar'));
    expect(screen.getByText('Opción A')).toBeDefined();
    expect(screen.getByText('Opción B')).toBeDefined();
    expect(screen.getByText('Opción C')).toBeDefined();
  });

  it('debe cerrar el dropdown al seleccionar una opción', () => {
    render(<SelectDropdown options={opciones} onChange={vi.fn()} />);
    fireEvent.click(screen.getByText('Seleccionar'));
    fireEvent.click(screen.getByText('Opción A'));
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('debe llamar onChange con el valor seleccionado', () => {
    const mockOnChange = vi.fn();
    render(<SelectDropdown options={opciones} onChange={mockOnChange} />);
    fireEvent.click(screen.getByText('Seleccionar'));
    fireEvent.click(screen.getByText('Opción B'));
    expect(mockOnChange).toHaveBeenCalledWith('Opción B');
  });

  it('debe alternar el dropdown al hacer clic dos veces', () => {
    render(<SelectDropdown options={opciones} />);
    const trigger = screen.getByText('Seleccionar');
    fireEvent.click(trigger);
    expect(screen.getByRole('list')).toBeDefined();
    fireEvent.click(trigger);
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('debe renderizar el icono ChevronDown', () => {
    render(<SelectDropdown options={opciones} />);
    expect(screen.getByTestId('icon-chevron')).toBeDefined();
  });
});
