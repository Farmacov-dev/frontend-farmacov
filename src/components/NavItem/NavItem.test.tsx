// src/components/NavItem/NavItem.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import NavItem from './NavItem';

const MockIcon = (props: any) => <svg data-testid="mock-icon" />;

describe('Componente: NavItem', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar el label', () => {
    render(<NavItem label="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeDefined();
  });

  it('debe ocultar el label cuando collapsed es true', () => {
    render(<NavItem label="Dashboard" collapsed={true} />);
    expect(screen.queryByText('Dashboard')).toBeNull();
  });

  it('debe mostrar el label cuando collapsed es false', () => {
    render(<NavItem label="Dashboard" collapsed={false} />);
    expect(screen.getByText('Dashboard')).toBeDefined();
  });

  it('debe aplicar clase activa cuando active es true', () => {
    const { container } = render(<NavItem label="Dashboard" active={true} />);
    const div = container.querySelector('div');
    expect(div?.className).toContain('bg-indigo-500');
    expect(div?.className).toContain('text-white');
  });

  it('debe aplicar clase inactiva cuando active es false', () => {
    const { container } = render(<NavItem label="Dashboard" active={false} />);
    const div = container.querySelector('div');
    expect(div?.className).toContain('text-gray-700');
  });

  it('debe llamar onClick al hacer clic', () => {
    const mockOnClick = vi.fn();
    render(<NavItem label="Dashboard" onClick={mockOnClick} />);
    fireEvent.click(screen.getByText('Dashboard'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('debe renderizar el icono cuando se proporciona', () => {
    render(<NavItem label="Dashboard" icon={MockIcon} />);
    expect(screen.getByTestId('mock-icon')).toBeDefined();
  });

  it('debe no renderizar icono cuando no se proporciona', () => {
    render(<NavItem label="Dashboard" />);
    expect(screen.queryByTestId('mock-icon')).toBeNull();
  });
});
