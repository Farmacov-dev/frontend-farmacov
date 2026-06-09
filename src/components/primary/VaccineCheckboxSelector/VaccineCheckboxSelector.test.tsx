// src/components/primary/VaccineCheckboxSelector/VaccineCheckboxSelector.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import VaccineCheckboxSelector from './VaccineCheckboxSelector';

describe('Componente: VaccineCheckboxSelector', () => {

  const mockVacunas = [
    { id: 1, nombre: 'Vacuna A' },
    { id: 2, nombre: 'Vacuna B' },
    { id: 3, nombre: 'Vacuna C' },
  ];

  afterEach(() => {
    cleanup();
  });

  it('debe renderizar el titulo y el contador de seleccion correctamente', () => {
    render(
      <VaccineCheckboxSelector 
        vacunas={mockVacunas} 
        seleccionadas={[1]} 
        onChange={vi.fn()} 
        maxSeleccion={5} 
      />
    );

    // verificamos el titulo general
    expect(screen.getByText('Seleccionar vacunas a comparar')).toBeDefined();
    
    // verificamos el texto dinamico del contador
    expect(screen.getByText('1/5 seleccionadas')).toBeDefined();
  });

  it('debe asignar aria-checked="true" solo a las vacunas seleccionadas', () => {
    render(
      <VaccineCheckboxSelector 
        vacunas={mockVacunas} 
        seleccionadas={[2]} 
        onChange={vi.fn()} 
      />
    );

    // buscamos los botones por su rol semantico y su texto
    const checkboxA = screen.getByRole('checkbox', { name: /vacuna a/i });
    const checkboxB = screen.getByRole('checkbox', { name: /vacuna b/i });

    expect(checkboxA.getAttribute('aria-checked')).toBe('false');
    expect(checkboxB.getAttribute('aria-checked')).toBe('true');
  });

  it('debe agregar el id al arreglo al hacer clic en una vacuna no seleccionada', () => {
    const handleChange = vi.fn();
    render(
      <VaccineCheckboxSelector 
        vacunas={mockVacunas} 
        seleccionadas={[1]} 
        onChange={handleChange} 
      />
    );

    const checkboxC = screen.getByRole('checkbox', { name: /vacuna c/i });
    fireEvent.click(checkboxC);

    // debe devolver el arreglo existente mas el nuevo id (1 y 3)
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith([1, 3]);
  });

  it('debe remover el id del arreglo al hacer clic en una vacuna previamente seleccionada', () => {
    const handleChange = vi.fn();
    render(
      <VaccineCheckboxSelector 
        vacunas={mockVacunas} 
        seleccionadas={[1, 2]} 
        onChange={handleChange} 
      />
    );

    const checkboxB = screen.getByRole('checkbox', { name: /vacuna b/i });
    fireEvent.click(checkboxB);

    // debe devolver el arreglo filtrado sin el id 2
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith([1]);
  });

  it('debe bloquear opciones nuevas si se alcanzo el maxSeleccion, pero permitir deseleccionar las actuales', () => {
    const handleChange = vi.fn();
    render(
      <VaccineCheckboxSelector 
        vacunas={mockVacunas} 
        seleccionadas={[1, 2]} 
        onChange={handleChange} 
        maxSeleccion={2} 
      />
    );

    const checkboxA = screen.getByRole('checkbox', { name: /vacuna a/i }) as HTMLButtonElement;
    const checkboxC = screen.getByRole('checkbox', { name: /vacuna c/i }) as HTMLButtonElement;

    // verificamos el limite visual en el contador
    expect(screen.getByText('2/2 seleccionadas')).toBeDefined();

    // la vacuna C (no seleccionada) debe estar bloqueada por limite
    expect(checkboxC.disabled).toBe(true);
    expect(checkboxC.className).toContain('disabled:opacity-40');

    // la vacuna A (ya seleccionada) debe seguir activa para poder quitarse
    expect(checkboxA.disabled).toBe(false);

    // intentar hacer clic en la bloqueada no debe disparar onChange
    fireEvent.click(checkboxC);
    expect(handleChange).not.toHaveBeenCalled();
  });
});