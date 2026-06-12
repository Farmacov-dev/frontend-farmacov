// src/components/ComparisonHeader/ComparisonHeader.test.tsx
// @vitest-environment jsdom
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import ComparisonHeader from './ComparisonHeader';

describe('Componente: ComparisonHeader', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar las etiquetas izquierda y derecha cuando se pasan como props', () => {
    render(<ComparisonHeader leftLabel="Vacuna A" rightLabel="Vacuna B" />);

    expect(screen.getByText('Vacuna A')).toBeDefined();
    expect(screen.getByText('Vacuna B')).toBeDefined();
  });

  it('debe mostrar "VS" en el centro', () => {
    render(<ComparisonHeader />);

    expect(screen.getByText('VS')).toBeDefined();
  });

  it('debe mostrar los valores por defecto cuando no se pasan props', () => {
    render(<ComparisonHeader />);

    // RTL normaliza \n a espacio al comparar texto
    expect(screen.getByText(/old\s+product/i)).toBeDefined();
    expect(screen.getByText(/new\s+product/i)).toBeDefined();
  });
});
