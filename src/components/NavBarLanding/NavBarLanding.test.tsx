// src/components/NavBarLanding/NavBarLanding.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import NavBarLanding from './NavBarLanding';

vi.mock('../LogoMark/LogoMark', () => ({
  default: () => <div data-testid="logo-mark" />,
}));

vi.mock('../NavLink/NavLink', () => ({
  default: ({ label, active, onClick }: any) => (
    <button data-testid="nav-link" data-active={String(active)} onClick={onClick}>
      {label}
    </button>
  ),
}));

vi.mock('../primary/Button/Button', () => ({
  default: ({ children, onClick }: any) => (
    <button data-testid="login-button" onClick={onClick}>{children}</button>
  ),
}));

describe('Componente: NavBarLanding', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar el logo', () => {
    render(<NavBarLanding />);
    expect(screen.getByTestId('logo-mark')).toBeDefined();
  });

  it('debe renderizar los 3 links de navegación', () => {
    render(<NavBarLanding />);
    expect(screen.getAllByTestId('nav-link')).toHaveLength(3);
  });

  it('debe mostrar los labels correctos de navegación', () => {
    render(<NavBarLanding />);
    expect(screen.getByText('Sobre nosotros')).toBeDefined();
    expect(screen.getByText('Planes')).toBeDefined();
    expect(screen.getByText('Features')).toBeDefined();
  });

  it('debe renderizar el botón de iniciar sesión', () => {
    render(<NavBarLanding />);
    expect(screen.getByTestId('login-button')).toBeDefined();
    expect(screen.getByText('Iniciar Sesión')).toBeDefined();
  });

  it('debe llamar onLoginClick al hacer clic en el botón', () => {
    const mockOnLoginClick = vi.fn();
    render(<NavBarLanding onLoginClick={mockOnLoginClick} />);
    fireEvent.click(screen.getByTestId('login-button'));
    expect(mockOnLoginClick).toHaveBeenCalledTimes(1);
  });

  it('debe llamar onNavClick con el label correcto al hacer clic', () => {
    const mockOnNavClick = vi.fn();
    render(<NavBarLanding onNavClick={mockOnNavClick} />);
    fireEvent.click(screen.getByText('Planes'));
    expect(mockOnNavClick).toHaveBeenCalledWith('Planes');
  });

  it('debe marcar como activo el link que coincide con activeLink', () => {
    render(<NavBarLanding activeLink="Features" />);
    const links = screen.getAllByTestId('nav-link');
    const featuresLink = links.find(l => l.textContent === 'Features');
    expect(featuresLink?.dataset.active).toBe('true');
  });

  it('debe marcar como inactivos los links que no coinciden con activeLink', () => {
    render(<NavBarLanding activeLink="Features" />);
    const links = screen.getAllByTestId('nav-link');
    const planesLink = links.find(l => l.textContent === 'Planes');
    expect(planesLink?.dataset.active).toBe('false');
  });
});
