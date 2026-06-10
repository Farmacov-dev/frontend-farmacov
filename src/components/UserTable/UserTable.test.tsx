// src/components/UserTable/UserTable.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import UserTable from './UserTable';

vi.mock('../UserTableRow/UserTableRow', () => ({
  default: ({ user }: any) => (
    <tr data-testid={`row-${user.id}`}>
      <td>{user.nombre}</td>
    </tr>
  ),
}));

const mockUsers = [
  { id: 1, hora: '10:00', nombre: 'Ana García', iniciales: 'AG', colorAvatar: '#6366f1', accion: 'Login', resultado: 'Exitoso' as const },
  { id: 2, hora: '11:00', nombre: 'Juan López', iniciales: 'JL', colorAvatar: '#8b5cf6', accion: 'Logout', resultado: 'Fallido' as const },
];

describe('Componente: UserTable', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar las cabeceras de la tabla', () => {
    render(<UserTable users={mockUsers} />);
    expect(screen.getByText('Hora')).toBeDefined();
    expect(screen.getByText('Usuario')).toBeDefined();
    expect(screen.getByText('Admin')).toBeDefined();
    expect(screen.getByText(/Acci/)).toBeDefined();
    expect(screen.getByText('Resultado')).toBeDefined();
  });

  it('debe renderizar una fila por cada usuario', () => {
    render(<UserTable users={mockUsers} />);
    expect(screen.getByTestId('row-1')).toBeDefined();
    expect(screen.getByTestId('row-2')).toBeDefined();
  });

  it('debe renderizar el nombre de cada usuario', () => {
    render(<UserTable users={mockUsers} />);
    expect(screen.getByText('Ana García')).toBeDefined();
    expect(screen.getByText('Juan López')).toBeDefined();
  });

  it('debe renderizar tabla vacía cuando no hay usuarios', () => {
    render(<UserTable users={[]} />);
    expect(screen.getByText('Hora')).toBeDefined();
    expect(screen.queryByTestId('row-1')).toBeNull();
  });
});
