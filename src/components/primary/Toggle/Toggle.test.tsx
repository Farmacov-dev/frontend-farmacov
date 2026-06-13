// src/components/primary/Toggle/Toggle.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { Toggle } from './Toggle';

describe('Componente: Toggle', () => {

  afterEach(() => {
    cleanup();
  });

  it('debe renderizarse en estado inactivo por defecto y leer el aria-label', () => {
    render(
      <Toggle 
        checked={false} 
        onChange={vi.fn()} 
        aria-label="Activar notificaciones" 
      />
    );

    // buscamos el elemento por su rol semántico nativo de switch
    const switchElement = screen.getByRole('switch', { name: /activar notificaciones/i });
    expect(switchElement).toBeDefined();
    
    // verificamos que el estado ARIA y las clases de apagado sean correctas
    expect(switchElement.getAttribute('aria-checked')).toBe('false');
    expect(switchElement.className).toContain('bg-stroke-light');
    
    // verificamos que la "bolita" no esté trasladada (estado inicial)
    const spanElement = switchElement.querySelector('span');
    expect(spanElement?.className).toContain('translate-x-0');
  });

  it('debe renderizarse en estado activo cuando checked es true', () => {
    render(<Toggle checked={true} onChange={vi.fn()} />);

    const switchElement = screen.getByRole('switch');
    
    // verificamos que el estado ARIA y las clases de encendido sean correctas
    expect(switchElement.getAttribute('aria-checked')).toBe('true');
    expect(switchElement.className).toContain('bg-accent');
    
    // verificamos la traslación de la "bolita"
    const spanElement = switchElement.querySelector('span');
    expect(spanElement?.className).toContain('translate-x-[20px]');
  });

  it('debe ejecutar onChange enviando el valor inverso al hacer clic', () => {
    const handleChange = vi.fn();
    // iniciamos en apagado
    render(<Toggle checked={false} onChange={handleChange} />);

    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);

    // al estar en falso, el clic debe intentar pasarlo a verdadero
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('debe aplicar el estado deshabilitado y no ejecutar onChange al recibir clic', () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} onChange={handleChange} disabled={true} />);

    const switchElement = screen.getByRole('switch') as HTMLButtonElement;
    
    // verificamos atributo nativo y clases visuales de bloqueo
    expect(switchElement.disabled).toBe(true);
    expect(switchElement.className).toContain('opacity-50 cursor-not-allowed');

    fireEvent.click(switchElement);
    expect(handleChange).not.toHaveBeenCalled();
  });
});