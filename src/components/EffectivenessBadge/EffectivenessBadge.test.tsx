// src/components/EffectivenessBadge/EffectivenessBadge.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import EffectivenessBadge from './EffectivenessBadge';

describe('Componente: EffectivenessBadge', () => {
  afterEach(() => {
    cleanup();
  });

  it('debe mostrar el valor en porcentaje', () => {
    render(<EffectivenessBadge value={85} />);
    expect(screen.getByText(/85%/)).toBeDefined();
  });

  it('debe aplicar clase verde para valor >= 90', () => {
    const { container } = render(<EffectivenessBadge value={90} />);
    const span = container.querySelector('span');
    expect(span?.className).toContain('text-green-600');
  });

  it('debe aplicar clase indigo para valor entre 75 y 89', () => {
    const { container } = render(<EffectivenessBadge value={80} />);
    const span = container.querySelector('span');
    expect(span?.className).toContain('text-indigo-500');
  });

  it('debe aplicar clase amber para valor entre 65 y 74', () => {
    const { container } = render(<EffectivenessBadge value={70} />);
    const span = container.querySelector('span');
    expect(span?.className).toContain('text-amber-600');
  });

  it('debe aplicar clase roja para valor menor a 65', () => {
    const { container } = render(<EffectivenessBadge value={60} />);
    const span = container.querySelector('span');
    expect(span?.className).toContain('text-red-600');
  });

  it('debe renderizar el punto de color', () => {
    const { container } = render(<EffectivenessBadge value={95} />);
    const dot = container.querySelector('span > span');
    expect(dot).toBeDefined();
    expect(dot?.className).toContain('rounded-full');
  });
});
