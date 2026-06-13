// src/components/primary/SideEffectsPanel/SideEffectsPanel.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import SideEffectsPanel, { type EfectoSecundario } from './SideEffectsPanel';

describe('Componente: SideEffectsPanel', () => {

  afterEach(() => {
    cleanup();
  });

  it('debe renderizar el título principal correctamente', () => {
    render(<SideEffectsPanel efectos={[]} />);
    
    // Validamos el encabezado por su rol semántico
    const heading = screen.getByRole('heading', { name: /efectos secundarios/i });
    expect(heading).toBeDefined();
  });

  it('debe renderizar el estado vacío cuando el arreglo no tiene elementos', () => {
    render(<SideEffectsPanel efectos={[]} />);
    
    // Buscamos el texto que se le pasa como prop al componente EmptyState
    const emptyStateText = screen.getByText('No hay efectos secundarios');
    expect(emptyStateText).toBeDefined();
  });

  it('debe renderizar la lista de efectos con los colores de severidad correctos', () => {
    // Preparamos datos simulados que cubran todas las ramas del diccionario de severidad
    const mockEfectos: EfectoSecundario[] = [
      { descripcion: 'Mareos esporádicos', severidad: 'leve' },
      { descripcion: 'Fiebre persistente', severidad: 'moderado' },
      { descripcion: 'Dificultad respiratoria', severidad: 'grave' },
    ];

    render(<SideEffectsPanel efectos={mockEfectos} />);

    // 1. Verificamos que el estado vacío ya no esté presente
    expect(screen.queryByText('No hay efectos secundarios')).toBeNull();

    // 2. Evaluamos el efecto "leve" y su clase dinámica
    const efectoLeve = screen.getByText('Mareos esporádicos');
    expect(efectoLeve).toBeDefined();
    expect(efectoLeve.className).toContain('text-severity-leve');

    // 3. Evaluamos el efecto "moderado" y su clase dinámica
    const efectoModerado = screen.getByText('Fiebre persistente');
    expect(efectoModerado).toBeDefined();
    expect(efectoModerado.className).toContain('text-severity-moderado');

    // 4. Evaluamos el efecto "grave" y su clase dinámica
    const efectoGrave = screen.getByText('Dificultad respiratoria');
    expect(efectoGrave).toBeDefined();
    expect(efectoGrave.className).toContain('text-severity-grave');
  });
});