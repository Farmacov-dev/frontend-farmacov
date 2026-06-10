// src/components/PageHeader/PageHeader.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import PageHeader from './PageHeader';

vi.mock('lucide-react', () => ({
  Calendar: () => <svg data-testid="icon-calendar" />,
}));

describe('Componente: PageHeader', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar el título', () => {
    render(<PageHeader title="Catálogo de Vacunas" />);
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
    expect(screen.getByText('Catálogo de Vacunas')).toBeDefined();
  });

  it('debe renderizar description cuando se proporciona', () => {
    render(<PageHeader title="Título" description="Una descripción" />);
    expect(screen.getByText('Una descripción')).toBeDefined();
  });

  it('debe usar subtitle como fallback cuando no hay description', () => {
    render(<PageHeader title="Título" subtitle="Subtítulo fallback" />);
    expect(screen.getByText('Subtítulo fallback')).toBeDefined();
  });

  it('debe priorizar description sobre subtitle', () => {
    render(<PageHeader title="Título" description="Desc" subtitle="Sub" />);
    expect(screen.getByText('Desc')).toBeDefined();
    expect(screen.queryByText('Sub')).toBeNull();
  });

  it('debe renderizar lastUpdated con icono de calendario', () => {
    render(<PageHeader title="Título" lastUpdated="01/01/2025" />);
    expect(screen.getByText(/01\/01\/2025/)).toBeDefined();
    expect(screen.getByTestId('icon-calendar')).toBeDefined();
  });

  it('debe usar date como fallback cuando no hay lastUpdated', () => {
    render(<PageHeader title="Título" date="15/06/2025" />);
    expect(screen.getByText(/15\/06\/2025/)).toBeDefined();
  });

  it('debe no renderizar descripción cuando no se proporciona', () => {
    render(<PageHeader title="Título" />);
    expect(screen.queryByRole('paragraph')).toBeNull();
  });

  it('debe no renderizar icono de calendario cuando no hay fecha', () => {
    render(<PageHeader title="Título" />);
    expect(screen.queryByTestId('icon-calendar')).toBeNull();
  });
});
