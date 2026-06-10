// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ComparisonRow from './ComparisonRow';

describe('Componente: ComparisonRow', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar los textos de la etiqueta izquierda y derecha', () => {
    render(
      <ComparisonRow
        index={1}
        label="Eficacia"
        left={{ value: '95%', status: 'better' }}
        right={{ value: '94%', status: 'worse' }}
      />
    );

    expect(screen.getByText('95%')).toBeTruthy();
    expect(screen.getByText('94%')).toBeTruthy();
  });

  it('debe mostrar ambos textos en color negro cuando el estado es neutral', () => {
    render(
      <ComparisonRow
        index={4}
        label="Número de dosis"
        left={{ value: '2 dosis A', status: 'neutral' }}
        right={{ value: '2 dosis B', status: 'neutral' }}
      />
    );

    const leftSpan = screen.getByText('2 dosis A');
    const rightSpan = screen.getByText('2 dosis B');

    expect(leftSpan.className).toContain('text-[#22324a]');
    expect(rightSpan.className).toContain('text-[#22324a]');
  });
});
