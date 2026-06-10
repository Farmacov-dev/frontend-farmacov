// src/components/LogoMark/LogoMark.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import LogoMark from './LogoMark';

vi.mock('lucide-react', () => ({
  Shield: () => <svg data-testid="icon-shield" />,
}));

describe('Componente: LogoMark', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar el icono Shield', () => {
    render(<LogoMark />);
    expect(screen.getByTestId('icon-shield')).toBeDefined();
  });

  it('debe mostrar el nombre y subtítulo en variante full', () => {
    render(<LogoMark variant="full" />);
    expect(screen.getByText('Farmacov')).toBeDefined();
    expect(screen.getByText('Portal Ejecutivo')).toBeDefined();
  });

  it('debe ocultar el nombre en variante icon', () => {
    render(<LogoMark variant="icon" />);
    expect(screen.queryByText('Farmacov')).toBeNull();
    expect(screen.queryByText('Portal Ejecutivo')).toBeNull();
  });

  it('debe usar variante full por defecto', () => {
    render(<LogoMark />);
    expect(screen.getByText('Farmacov')).toBeDefined();
  });
});
