// src/components/Sidebar/Sidebar.test.tsx
// @vitest-environment jsdom
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import Sidebar from './Sidebar';

vi.mock('react-icons/fa', () => ({
  FaShieldAlt:  () => <svg data-testid="icon-shield" />,
  FaSignOutAlt: () => <svg data-testid="icon-logout" />,
  FaCompress:   () => <svg data-testid="icon-compress" />,
}));

vi.mock('../NavItem/NavItem', () => ({
  default: ({ label, active }: any) => (
    <div data-testid="nav-item" data-label={label} data-active={String(active)} />
  ),
}));

vi.mock('./UserProfile', () => ({
  default: ({ userName, userRole }: any) => (
    <div data-testid="user-profile" data-username={userName} data-userrole={userRole} />
  ),
}));

const MockIcon = () => <svg />;

const mockItems = [
  { key: 'dashboard', label: 'Dashboard', icon: MockIcon },
  { key: 'reportes',  label: 'Reportes',  icon: MockIcon },
];

describe('Componente: Sidebar', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar el nombre de la app y el subtítulo cuando no está colapsado', () => {
    render(<Sidebar items={mockItems} />);

    expect(screen.getByText('Farmacov')).toBeDefined();
    expect(screen.getByText('Portal Ejecutivo')).toBeDefined();
  });

  it('debe ocultar el nombre de la app y el subtítulo cuando está colapsado', () => {
    render(<Sidebar items={mockItems} collapsed={true} />);

    expect(screen.queryByText('Farmacov')).toBeNull();
    expect(screen.queryByText('Portal Ejecutivo')).toBeNull();
  });

  it('debe llamar a onLogoutClick al hacer clic en "Cerrar Sesion"', () => {
    const mockLogout = vi.fn();
    render(<Sidebar items={mockItems} onLogoutClick={mockLogout} />);

    fireEvent.click(screen.getByRole('button', { name: /cerrar sesion/i }));

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
