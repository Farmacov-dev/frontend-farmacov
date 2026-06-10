// src/components/shared/VaccineDetailContent.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import VaccineDetailContent from './VaccineDetailContent';

vi.mock('./TagBadge', () => ({
  default: ({ label }: any) => <span data-testid="tag-badge">{label}</span>,
}));

vi.mock('./MedicalSpecsSection', () => ({
  default: ({ items }: any) => <div data-testid="medical-specs" data-count={items.length} />,
}));

vi.mock('./PurchaseLocationsPanel', () => ({
  default: ({ locations }: any) => <div data-testid="purchase-locations" data-count={locations.length} />,
}));

vi.mock('./SideEffectsPanel', () => ({
  default: ({ effects }: any) => <div data-testid="side-effects" data-count={effects.length} />,
}));

const mockProps = {
  vaccineName: 'Comirnaty',
  manufacturer: 'Pfizer',
  description: 'Vacuna de ARNm contra COVID-19.',
  effectiveness: 95,
  specs: [{ label: 'Tipo', value: 'ARNm' }],
  locations: [{ title: 'Farmacia Central', address: 'Calle 1' }],
  sideEffects: [{ label: 'Fiebre', severity: 'low' as const }],
};

describe('Componente: VaccineDetailContent', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar el nombre de la vacuna', () => {
    render(<VaccineDetailContent {...mockProps} />);
    expect(screen.getByText('Comirnaty')).toBeDefined();
  });

  it('debe renderizar el fabricante', () => {
    render(<VaccineDetailContent {...mockProps} />);
    expect(screen.getByText(/Pfizer/)).toBeDefined();
  });

  it('debe renderizar la descripción', () => {
    render(<VaccineDetailContent {...mockProps} />);
    expect(screen.getByText('Vacuna de ARNm contra COVID-19.')).toBeDefined();
  });

  it('debe renderizar el badge de efectividad con el valor correcto', () => {
    render(<VaccineDetailContent {...mockProps} />);
    expect(screen.getByTestId('tag-badge')).toBeDefined();
    expect(screen.getByText('95% de efectividad')).toBeDefined();
  });

  it('debe renderizar MedicalSpecsSection con los specs correctos', () => {
    render(<VaccineDetailContent {...mockProps} />);
    const el = screen.getByTestId('medical-specs');
    expect(el.getAttribute('data-count')).toBe('1');
  });

  it('debe renderizar PurchaseLocationsPanel con las ubicaciones correctas', () => {
    render(<VaccineDetailContent {...mockProps} />);
    const el = screen.getByTestId('purchase-locations');
    expect(el.getAttribute('data-count')).toBe('1');
  });

  it('debe renderizar SideEffectsPanel con los efectos correctos', () => {
    render(<VaccineDetailContent {...mockProps} />);
    const el = screen.getByTestId('side-effects');
    expect(el.getAttribute('data-count')).toBe('1');
  });
});
