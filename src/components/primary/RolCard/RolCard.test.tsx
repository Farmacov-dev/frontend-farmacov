// src/components/primary/RolCard/RolCard.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import RolCard from './RolCard';

describe('Componente: RolCard', () => {

  afterEach(() => {
    cleanup();
  });

  it('debe renderizar el botón y extraer las iniciales para un nombre de dos palabras', () => {
    // Al pasar un nombre compuesto, debe tomar la primera letra de las dos primeras palabras
    render(<RolCard id={1} nombre="Médico General" />);
    
    const buttonElement = screen.getByRole('button', { name: /médico general/i });
    expect(buttonElement).toBeDefined();
    
    // Verificamos que se renderice el avatar con "MG"
    expect(screen.getByText('MG')).toBeDefined();
  });

  it('debe extraer una sola inicial si el nombre es de una sola palabra', () => {
    // Rama 2 de getInitiales
    render(<RolCard id={2} nombre="Administrador" />);
    
    expect(screen.getByText('A')).toBeDefined();
  });

  it('debe usar el fallback "?" si el nombre está vacío o tiene puros espacios', () => {
    // Rama 3 (extrema) de getInitiales
    render(<RolCard id={3} nombre="    " />);
    
    expect(screen.getByText('?')).toBeDefined();
  });

  it('debe aplicar las clases de estado "no seleccionado" por defecto', () => {
    render(<RolCard id={4} nombre="Enfermero" />);
    
    const buttonElement = screen.getByRole('button', { name: /enfermero/i });
    
    expect(buttonElement.className).toContain('border-stroke');
    expect(buttonElement.className).toContain('bg-white');
  });

  it('debe aplicar las clases de estado "seleccionado" cuando la prop es true', () => {
    render(<RolCard id={5} nombre="Paciente" seleccionado={true} />);
    
    const buttonElement = screen.getByRole('button', { name: /paciente/i });
    
    expect(buttonElement.className).toContain('border-primary');
    expect(buttonElement.className).toContain('bg-surface');
  });

  it('debe ejecutar la función onClick devolviendo el id correcto', () => {
    // vi.fn() nos permite "espiar" si la función fue llamada y con qué argumentos
    const handleClick = vi.fn();
    const testId = 99;
    
    render(<RolCard id={testId} nombre="Especialista" onClick={handleClick} />);
    
    const buttonElement = screen.getByRole('button', { name: /especialista/i });
    fireEvent.click(buttonElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(testId);
  });
});