// src/components/ChangeBadge/ChangeBadge.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import ChangeBadge from './ChangeBadge';

describe('Componente: ChangeBadge', () => {
  afterEach(() => {
    cleanup();
  });

  it('debe retornar null cuando value es null', () => {
    const { container } = render(<ChangeBadge value={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('debe mostrar el valor positivo con prefijo +', () => {
    const { container } = render(<ChangeBadge value={5} />);
    expect(container.textContent).toContain('+5%');
  });

  it('debe mostrar el valor negativo sin prefijo +', () => {
    const { container } = render(<ChangeBadge value={-3} />);
    expect(container.textContent).toContain('-3%');
    expect(container.textContent).not.toContain('+-3%');
  });

  it('debe mostrar flecha cuando showArrow es true', () => {
    const { container } = render(<ChangeBadge value={5} showArrow={true} />);
    expect(container.textContent).toContain('↑');
  });

  it('debe ocultar flecha cuando showArrow es false', () => {
    const { container } = render(<ChangeBadge value={5} showArrow={false} />);
    expect(container.textContent).not.toContain('↑');
  });

  it('debe aplicar color verde cuando el valor es positivo y positiveDirection es up', () => {
    const { container } = render(<ChangeBadge value={10} positiveDirection="up" />);
    expect(container.querySelector('span')?.className).toContain('text-green-600');
  });

  it('debe aplicar color rojo cuando el valor es positivo y positiveDirection es down', () => {
    const { container } = render(<ChangeBadge value={10} positiveDirection="down" />);
    expect(container.querySelector('span')?.className).toContain('text-red-600');
  });

  it('debe aplicar color gris cuando positiveDirection es neutral', () => {
    const { container } = render(<ChangeBadge value={10} positiveDirection="neutral" />);
    expect(container.querySelector('span')?.className).toContain('text-gray-500');
  });

  it('debe aplicar color gris cuando value es 0', () => {
    const { container } = render(<ChangeBadge value={0} />);
    expect(container.querySelector('span')?.className).toContain('text-gray-500');
  });

  it('debe mostrar flecha hacia abajo para valores negativos', () => {
    const { container } = render(<ChangeBadge value={-5} />);
    expect(container.textContent).toContain('↓');
  });
});
