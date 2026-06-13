// src/components/primary/SearchInput/SearchInput.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import SearchInput from './SearchInput';

describe('Componente: SearchInput', () => {

  afterEach(() => {
    cleanup();
  });

  it('debe renderizarse correctamente con el placeholder por defecto', () => {
    render(<SearchInput value="" onChange={vi.fn()} />);

    // El rol semántico de un <input type="text"> es 'textbox'
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeDefined();
    expect(inputElement.getAttribute('placeholder')).toBe('Busqueda');

    // Evaluamos el icono de búsqueda como elemento presentacional (decorativo)
    const iconElement = screen.getByRole('presentation', { hidden: true });
    expect(iconElement).toBeDefined();
  });

  it('debe aceptar un placeholder personalizado y aplicar clases extra al contenedor', () => {
    render(
      <SearchInput 
        value="Aspirina" 
        onChange={vi.fn()} 
        placeholder="Buscar medicamento..." 
        className="margen-extra-custom" 
      />
    );

    // Podemos buscar directamente por el placeholder que le pasamos
    const inputElement = screen.getByPlaceholderText(/buscar medicamento/i) as HTMLInputElement;
    expect(inputElement).toBeDefined();
    
    // Validamos que el valor actual (value) se esté inyectando correctamente
    expect(inputElement.value).toBe('Aspirina');

    // Subimos un nivel en el DOM para verificar las clases del <div> contenedor
    const containerElement = inputElement.parentElement;
    expect(containerElement?.className).toContain('margen-extra-custom');
  });

  it('debe ejecutar la función onChange pasando el valor de lo que el usuario escribe', () => {
    const handleChange = vi.fn();
    render(<SearchInput value="" onChange={handleChange} />);

    const inputElement = screen.getByRole('textbox');

    // Simulamos a un usuario tecleando en el buscador
    fireEvent.change(inputElement, { target: { value: 'Paracetamol' } });

    // Verificamos que la función recibida por props haya reaccionado correctamente
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('Paracetamol');
  });
});