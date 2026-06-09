// src/components/primary/MedicalSpecsSection/MedicalSpecsSection.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import MedicalSpecsSection from './MedicalSpecsSection';

describe('Componente: MedicalSpecsSection', () => {

  afterEach(() => {
    cleanup();
  });

  it('debe renderizar correctamente con las propiedades obligatorias y valores por defecto', () => {
    render(
      <MedicalSpecsSection 
        tipo="Vacuna" 
        temperatura={-80} 
        tiempoAmbiente={null} 
        costoUnitario={150.5} 
      />
    );

    // 1. Verificamos el título principal usando su rol semántico
    const heading = screen.getByRole('heading', { name: /especificaciones médicas/i });
    expect(heading).toBeDefined();

    // 2. Verificamos que las etiquetas base existan
    expect(screen.getByText('Tipo:')).toBeDefined();
    expect(screen.getByText('Temperatura:')).toBeDefined();
    expect(screen.getByText('Costo unitario:')).toBeDefined();
    expect(screen.getByText('Dosis requerida:')).toBeDefined();

    // 3. Verificamos el formateo matemático y condicional
    expect(screen.getByText('Vacuna')).toBeDefined();
    expect(screen.getByText('-80°C')).toBeDefined();
    // Verifica que toFixed(2) funcione agregando el cero final
    expect(screen.getByText('$150.50')).toBeDefined(); 
    // Verifica que el valor por defecto de dosis (2) esté presente
    expect(screen.getByText('2')).toBeDefined(); 

    // 4. Verificamos la rama negativa: Preservación NO debe existir si es null
    expect(screen.queryByText('Preservación:')).toBeNull();
  });

  it('debe renderizar la fila de preservación cuando tiempoAmbiente tiene un valor numérico', () => {
    render(
      <MedicalSpecsSection 
        tipo="Suero" 
        temperatura={4} 
        tiempoAmbiente={12} 
        costoUnitario={300} 
      />
    );

    // Ahora la rama positiva: debe existir y tener el texto formateado con "hrs (amb)"
    expect(screen.getByText('Preservación:')).toBeDefined();
    expect(screen.getByText('12 hrs (amb)')).toBeDefined();
  });

  it('debe renderizar el valor correcto cuando se especifica dosisRequerida sobreescribiendo el default', () => {
    render(
      <MedicalSpecsSection 
        tipo="Antibiótico" 
        temperatura={20} 
        tiempoAmbiente={null} 
        costoUnitario={50} 
        dosisRequerida={4} 
      />
    );

    // Validamos que sobreescriba el "2" inicial
    expect(screen.getByText('4')).toBeDefined();
  });
});