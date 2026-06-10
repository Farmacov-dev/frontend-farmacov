// src/components/KpiCard/KpiCard.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import KpiCard from './KpiCard';

vi.mock('../ChangeBadge/ChangeBadge', () => ({
  default: ({ value }: { value: number | null }) =>
    value !== null && value !== undefined
      ? <span data-testid="change-badge">{value}%</span>
      : null,
}));

describe('Componente: KpiCard', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar el título y el valor de la tarjeta', () => {
    render(
      <KpiCard
        title="Total Vacunas"
        value={1200}
        change={5}
      />
    );

    expect(screen.getByText('Total Vacunas')).toBeDefined();
    expect(screen.getByText('1200')).toBeDefined();
  });

  it('no debe mostrar el badge de cambio cuando change es null', () => {
    render(
      <KpiCard
        title="Total Vacunas"
        value={1200}
        change={null}
      />
    );

    expect(screen.queryByTestId('change-badge')).toBeNull();
  });

  it('debe renderizar el icono cuando se proporciona la prop icon', () => {
    render(
      <KpiCard
        title="Total Vacunas"
        value={1200}
        change={null}
        icon={<svg data-testid="kpi-icon" />}
      />
    );

    expect(screen.getByTestId('kpi-icon')).toBeDefined();
  });
});
