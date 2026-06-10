// src/components/EmptyState/EmptyState.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import EmptyState from './EmptyState';

describe('Componente: EmptyState', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar el título proporcionado', () => {
    render(<EmptyState title="Sin datos disponibles" />);

    expect(screen.getByText('Sin datos disponibles')).toBeDefined();
  });

  it('debe renderizar el icono cuando se proporciona la prop icon', () => {
    render(
      <EmptyState
        title="Sin datos"
        icon={<svg data-testid="empty-icon" />}
      />
    );

    expect(screen.getByTestId('empty-icon')).toBeDefined();
  });
});
