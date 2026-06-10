// src/components/LoadingState/LoadingState.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import LoadingState from './LoadingState';

describe('Componente: LoadingState', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar el indicador de carga con role="status" y aria-label="Cargando"', () => {
    render(<LoadingState />);

    const spinner = screen.getByRole('status', { name: 'Cargando' });

    expect(spinner).toBeDefined();
  });
});
