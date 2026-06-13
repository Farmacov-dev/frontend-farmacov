// src/components/composed/ComparisonModal/ComparisonModal.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import ComparisonModal from './ComparisonModal';

vi.mock('../ModalContainer/ModalContainer', () => ({
  default: ({ children, isOpen }: any) => (isOpen ? <div data-testid="mock-modal">{children}</div> : null)
}));

vi.mock('../../SelectDropdown/SelectDropdown', () => ({
  default: ({ placeholder, onChange, options }: any) => (
    <select
      aria-label={placeholder}
      onChange={(e) => onChange(e.target.value)}
      data-opciones-disponibles={options.join(',')} 
    >
      <option value="">{placeholder}</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  )
}));

describe('Componente: ComparisonModal', () => {
  const mockVaccines = [
    { id: 1, nombre: 'Pfizer' },
    { id: 2, nombre: 'Moderna' },
    { id: 3, nombre: 'AstraZeneca' },
  ];

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('no debe renderizar nada si isOpen es false', () => {
    render(
      <ComparisonModal 
        isOpen={false} 
        onClose={vi.fn()} 
        onCompare={vi.fn()} 
        vaccines={mockVaccines} 
      />
    );
    expect(screen.queryByTestId('mock-modal')).toBeNull();
  });

  it('debe renderizar el contenido y mantener el botón deshabilitado al inicio', () => {
    render(
      <ComparisonModal 
        isOpen={true} 
        onClose={vi.fn()} 
        onCompare={vi.fn()} 
        vaccines={mockVaccines} 
      />
    );

    expect(screen.getByText('Comparación de Vacunas')).toBeDefined();
    
    const botonComparar = screen.getByRole('button', { name: /crear comparación/i }) as HTMLButtonElement;
    expect(botonComparar.disabled).toBe(true);
  });

  it('debe filtrar las opciones de un dropdown cuando se selecciona una vacuna en el otro', () => {
    render(
      <ComparisonModal 
        isOpen={true} 
        onClose={vi.fn()} 
        onCompare={vi.fn()} 
        vaccines={mockVaccines} 
      />
    );

    const dropdownA = screen.getByRole('combobox', { name: /primera vacuna/i });
    const dropdownB = screen.getByRole('combobox', { name: /segunda vacuna/i });

    // Verificamos el estado inicial: ambos tienen todas las vacunas
    expect(dropdownA.dataset.opcionesDisponibles).toBe('Pfizer,Moderna,AstraZeneca');
    
    // Simulamos que el usuario selecciona Pfizer en el primer dropdown
    fireEvent.change(dropdownA, { target: { value: 'Pfizer' } });

    // El segundo dropdown ya no debe contener a Pfizer en sus opciones gracias al useMemo
    expect(dropdownB.dataset.opcionesDisponibles).toBe('Moderna,AstraZeneca');
  });

  it('debe habilitar el botón y enviar los IDs y nombres correctos al hacer submit', () => {
    const handleCompare = vi.fn();
    render(
      <ComparisonModal 
        isOpen={true} 
        onClose={vi.fn()} 
        onCompare={handleCompare} 
        vaccines={mockVaccines} 
      />
    );

    const dropdownA = screen.getByRole('combobox', { name: /primera vacuna/i });
    const dropdownB = screen.getByRole('combobox', { name: /segunda vacuna/i });
    const botonComparar = screen.getByRole('button', { name: /crear comparación/i }) as HTMLButtonElement;

    fireEvent.change(dropdownA, { target: { value: 'AstraZeneca' } });
    expect(botonComparar.disabled).toBe(true);

    fireEvent.change(dropdownB, { target: { value: 'Moderna' } });
    expect(botonComparar.disabled).toBe(false);

    fireEvent.click(botonComparar);

    expect(handleCompare).toHaveBeenCalledTimes(1);
    expect(handleCompare).toHaveBeenCalledWith(3, 2, 'AstraZeneca', 'Moderna');
  });
});