// src/components/primary/TextAreaField/TextAreaField.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import TextAreaField from './TextAreaField';

describe('Componente: TextAreaField', () => {

  afterEach(() => {
    cleanup();
  });

  it('debe renderizar el textarea y vincularlo a su label si se proporciona', () => {
    render(<TextAreaField label="Notas médicas" />);

    // El label vincula correctamente si encontramos el elemento subyacente
    const textareaElement = screen.getByLabelText(/notas médicas/i);
    expect(textareaElement).toBeDefined();
    expect(textareaElement.tagName).toBe('TEXTAREA');
  });

  it('debe renderizar solo el textarea si no se proporciona label', () => {
    render(<TextAreaField />);

    // Si no hay label, lo buscamos directamente por su rol semántico
    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toBeDefined();

    // Verificamos explícitamente que la etiqueta <label> no se haya renderizado
    const labelElement = document.querySelector('label');
    expect(labelElement).toBeNull();
  });

  it('debe aplicar las clases de error correctamente tanto al label como al campo', () => {
    render(<TextAreaField label="Observaciones" error={true} />);

    const labelElement = screen.getByText(/observaciones/i);
    const textareaElement = screen.getByLabelText(/observaciones/i);

    expect(labelElement.className).toContain('text-red');
    expect(textareaElement.className).toContain('border-red-light');
  });

  it('debe aplicar estilos y atributos nativos si disabled es true', () => {
    render(<TextAreaField label="Antecedentes" disabled={true} />);

    const textareaElement = screen.getByLabelText(/antecedentes/i) as HTMLTextAreaElement;

    expect(textareaElement.disabled).toBe(true);
    expect(textareaElement.className).toContain('disabled:opacity-50');
  });

  it('debe mostrar el contador de caracteres correctamente basado en el texto recibido', () => {
    render(
      <TextAreaField
        value="Paciente estable"
        maxLength={100}
        showCount={true}
      />
    );

    // "Paciente estable" tiene 16 caracteres
    const counterElement = screen.getByText('16 / 100');
    expect(counterElement).toBeDefined();
  });

  it('debe mostrar 0 en el contador si el valor es nulo o indefinido evitando el conteo de la palabra undefined', () => {
    render(
      <TextAreaField
        value={undefined}
        maxLength={50}
        showCount={true}
      />
    );

    // Verificamos la protección de la rama contra valores falsy
    const counterElement = screen.getByText('0 / 50');
    expect(counterElement).toBeDefined();
  });

  it('debe reaccionar a los cambios de texto ejecutando onChange', () => {
    const handleChange = vi.fn();
    render(<TextAreaField label="Síntomas" onChange={handleChange} />);

    const textareaElement = screen.getByLabelText(/síntomas/i);
    
    // Simulamos la escritura
    fireEvent.change(textareaElement, { target: { value: 'Cefalea' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});