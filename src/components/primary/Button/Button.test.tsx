// src/components/primary/Button/Button.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import Button from './Button';

describe('Componente: Button', () => {
  
  afterEach(() => {
    cleanup();
  });

  it('debe renderizarse correctamente con su texto', () => {
    render(<Button>Guardar</Button>);
    
    const buttonElement = screen.getByRole('button', { name: /guardar/i });
    expect(buttonElement).toBeDefined();
  });

  it('debe aplicar las clases de la variante "outline" correctamente', () => {
    render(<Button variant="outline">Cancelar</Button>);
    
    const buttonElement = screen.getByRole('button', { name: /cancelar/i });
    
    expect(buttonElement.className).toContain('bg-white');
    expect(buttonElement.className).toContain('text-primary');
    expect(buttonElement.className).toContain('border-primary');
  });

  it('debe renderizar el icono cuando se pasa por props utilizando su alt text', () => {
    const testIconUrl = '/icon-path.svg';
    render(<Button icon={testIconUrl} iconAlt="Icono de prueba">Con Icono</Button>);
    
    const iconElement = screen.getByAltText('Icono de prueba');
    
    expect(iconElement).toBeDefined();
    expect(iconElement.getAttribute('src')).toBe(testIconUrl);
  });

  it('debe renderizar el icono como puramente decorativo si no hay iconAlt', () => {
    render(<Button icon="/icon.svg">Icono Decorativo</Button>);
    
    // Al tener alt="", el navegador lo clasifica como presentación, no como imagen
    const iconElement = screen.getByRole('presentation', { hidden: true });
    
    expect(iconElement).toBeDefined();
    expect(iconElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('no debe renderizar la imagen si no se pasa la prop icon', () => {
    render(<Button>Sin Icono</Button>);
    
    // queryByRole devuelve null si no lo encuentra
    const iconElement = screen.queryByRole('img', { hidden: true });
    expect(iconElement).toBeNull();
  });

  it('debe ejecutar la función onClick al ser clickeado', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(buttonElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('debe estar deshabilitado y no ejecutar onClick si disabled es true', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Bloqueado</Button>);
    
    const buttonElement = screen.getByRole('button', { name: /bloqueado/i }) as HTMLButtonElement;
    
    expect(buttonElement.disabled).toBe(true);
    expect(buttonElement.className).toContain('disabled:opacity-50');
    
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });
});