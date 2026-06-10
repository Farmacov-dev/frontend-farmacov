// src/components/FormSectionTitle/FormSectionTitle.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import FormSectionTitle from './FormSectionTitle';

describe('Componente: FormSectionTitle', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar el título en el encabezado', () => {
    render(<FormSectionTitle title="Información General" />);

    expect(screen.getByRole('heading', { name: 'Información General' })).toBeDefined();
  });

  it('debe renderizar el divisor horizontal debajo del título', () => {
    const { container } = render(<FormSectionTitle title="Sección" />);

    const divider = container.querySelector('.h-px.w-full.bg-gray-200');

    expect(divider).toBeDefined();
  });

  it('debe aplicar la clase adicional al contenedor cuando se proporciona className', () => {
    const { container } = render(
      <FormSectionTitle title="Sección" className="mt-8" />
    );

    expect(container.firstChild as HTMLElement).toBeDefined();
    expect((container.firstChild as HTMLElement).className).toContain('mt-8');
  });
});
