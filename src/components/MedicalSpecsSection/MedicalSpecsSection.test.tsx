// src/components/MedicalSpecsSection/MedicalSpecsSection.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import MedicalSpecsSection from './MedicalSpecsSection';

vi.mock('lucide-react', () => ({
  Stethoscope: () => <svg data-testid="icon-stethoscope" />,
}));

const mockSpecs = [
  { label: 'Tipo', value: 'ARNm' },
  { label: 'Temperatura', value: '-70°C' },
];

describe('Componente: MedicalSpecsSection', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar el título de la sección', () => {
    render(<MedicalSpecsSection specs={mockSpecs} />);
    expect(screen.getByText('Especificaciones medicas')).toBeDefined();
  });

  it('debe renderizar el label de cada spec', () => {
    render(<MedicalSpecsSection specs={mockSpecs} />);
    expect(screen.getByText(/Tipo:/)).toBeDefined();
    expect(screen.getByText(/Temperatura:/)).toBeDefined();
  });

  it('debe renderizar el valor de cada spec', () => {
    render(<MedicalSpecsSection specs={mockSpecs} />);
    expect(screen.getByText('ARNm')).toBeDefined();
    expect(screen.getByText('-70°C')).toBeDefined();
  });

  it('debe renderizar un icono por cada spec', () => {
    render(<MedicalSpecsSection specs={mockSpecs} />);
    expect(screen.getAllByTestId('icon-stethoscope')).toHaveLength(2);
  });

  it('debe renderizar lista vacía cuando specs es un array vacío', () => {
    render(<MedicalSpecsSection specs={[]} />);
    expect(screen.getByText('Especificaciones medicas')).toBeDefined();
    expect(screen.queryAllByTestId('icon-stethoscope')).toHaveLength(0);
  });
});
