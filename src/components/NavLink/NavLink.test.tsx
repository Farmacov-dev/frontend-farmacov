// src/components/NavLink/NavLink.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import NavLink from './NavLink';

describe('Componente: NavLink', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar el label', () => {
    render(<NavLink label="Planes" />);
    expect(screen.getByText('Planes')).toBeDefined();
  });

  it('debe llamar onClick al hacer clic', () => {
    const mockOnClick = vi.fn();
    render(<NavLink label="Planes" onClick={mockOnClick} />);
    fireEvent.click(screen.getByText('Planes'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('debe aplicar estilo activo cuando active es true', () => {
    render(<NavLink label="Planes" active={true} />);
    const el = screen.getByText('Planes');
    expect(el.className).toContain('font-semibold');
    expect(el.className).toContain('text-indigo-500');
  });

  it('debe aplicar estilo inactivo cuando active es false', () => {
    render(<NavLink label="Planes" active={false} />);
    const el = screen.getByText('Planes');
    expect(el.className).toContain('font-normal');
    expect(el.className).toContain('text-gray-700');
  });

  it('debe usar active=false por defecto', () => {
    render(<NavLink label="Features" />);
    const el = screen.getByText('Features');
    expect(el.className).toContain('font-normal');
  });
});
