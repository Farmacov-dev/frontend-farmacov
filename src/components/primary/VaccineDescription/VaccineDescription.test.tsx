// src/components/primary/VaccineDescription/VaccineDescription.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import VaccineDescription from './VaccineDescription';

describe('Componente: VaccineDescription', () => {

  afterEach(() => {
    cleanup();
  });

  it('debe renderizar el título, la descripción y los márgenes por defecto', () => {
    const textoPrueba = 'Vacuna de ARNm diseñada para la inmunización activa.';
    render(<VaccineDescription descripcion={textoPrueba} />);

    // Validamos el título por rol semántico
    const heading = screen.getByRole('heading', { name: /descripción general/i });
    expect(heading).toBeDefined();

    // Validamos que el texto dinámico exista en el DOM
    const descriptionElement = screen.getByText(textoPrueba);
    expect(descriptionElement).toBeDefined();

    // Subimos al contenedor padre (<section>) para verificar las clases lógicas por defecto
    const sectionElement = heading.parentElement;
    expect(sectionElement?.className).toContain('mt-10');
    expect(sectionElement?.className).toContain('lg:mt-20');
  });

  it('debe aplicar el margen reducido cuando la prop compact es true', () => {
    render(<VaccineDescription descripcion="Descripción corta" compact={true} />);

    const heading = screen.getByRole('heading', { name: /descripción general/i });
    const sectionElement = heading.parentElement;

    // Verificamos la rama condicional de la propiedad compact
    expect(sectionElement?.className).toContain('mt-4');
    expect(sectionElement?.className).not.toContain('mt-10');
  });

  it('debe aceptar y concatenar clases adicionales pasadas por la prop className', () => {
    render(
      <VaccineDescription 
        descripcion="Descripción con clases" 
        className="borde-especial fondo-oscuro" 
      />
    );

    const heading = screen.getByRole('heading', { name: /descripción general/i });
    const sectionElement = heading.parentElement;

    // Verificamos que las clases externas se inyecten correctamente
    expect(sectionElement?.className).toContain('borde-especial');
    expect(sectionElement?.className).toContain('fondo-oscuro');
  });
});