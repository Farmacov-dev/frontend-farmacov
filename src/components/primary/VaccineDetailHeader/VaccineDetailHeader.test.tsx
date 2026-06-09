// src/components/primary/VaccineDetailHeader/VaccineDetailHeader.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import VaccineDetailHeader from './VaccineDetailHeader';

describe('Componente: VaccineDetailHeader', () => {

  afterEach(() => {
    cleanup();
  });

  it('debe renderizar el nombre de la vacuna y la farmacéutica correctamente', () => {
    render(
      <VaccineDetailHeader 
        nombre="Comirnaty" 
        farmaceutica="Pfizer-BioNTech" 
      />
    );

    // Validamos el nombre de la vacuna buscando su rol semántico de encabezado
    const headingElement = screen.getByRole('heading', { name: /comirnaty/i });
    expect(headingElement).toBeDefined();

    // Validamos que el texto de la farmacéutica se construya y renderice bien
    const farmaceuticaElement = screen.getByText('Diseñada por: Pfizer-BioNTech');
    expect(farmaceuticaElement).toBeDefined();
  });

  it('no debe romperse al recibir las props opcionales compact y effectiveness', () => {
    // Aunque el componente no las usa visualmente en el DOM actual, 
    // pasarlas nos asegura que la interfaz TypeScript y el renderizado no fallen
    render(
      <VaccineDetailHeader 
        nombre="Spikevax" 
        farmaceutica="Moderna" 
        compact={true} 
        effectiveness={94.1} 
      />
    );

    expect(screen.getByRole('heading', { name: /spikevax/i })).toBeDefined();
  });
});