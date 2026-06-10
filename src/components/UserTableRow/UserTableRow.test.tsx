// src/components/UserTableRow/UserTableRow.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import UserTableRow from './UserTableRow';
import type { User } from './UserTableRow';

const mockUserExitoso: User = {
  id: 1,
  hora: '09:30',
  nombre: 'María Torres',
  iniciales: 'MT',
  colorAvatar: '#6366f1',
  accion: 'Acceso al sistema',
  resultado: 'Exitoso',
};

const mockUserFallido: User = {
  id: 2,
  hora: '10:45',
  nombre: 'Carlos Ruiz',
  iniciales: 'CR',
  colorAvatar: '#ec4899',
  accion: 'Cambio de contraseña',
  resultado: 'Fallido',
};

describe('Componente: UserTableRow', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar la hora del usuario', () => {
    render(<table><tbody><UserTableRow user={mockUserExitoso} /></tbody></table>);
    expect(screen.getByText('09:30')).toBeDefined();
  });

  it('debe renderizar el nombre del usuario', () => {
    render(<table><tbody><UserTableRow user={mockUserExitoso} /></tbody></table>);
    expect(screen.getByText('María Torres')).toBeDefined();
  });

  it('debe renderizar las iniciales del usuario', () => {
    render(<table><tbody><UserTableRow user={mockUserExitoso} /></tbody></table>);
    expect(screen.getByText('MT')).toBeDefined();
  });

  it('debe renderizar la acción del usuario', () => {
    render(<table><tbody><UserTableRow user={mockUserExitoso} /></tbody></table>);
    expect(screen.getByText('Acceso al sistema')).toBeDefined();
  });

  it('debe mostrar badge "Exitoso" cuando resultado es Exitoso', () => {
    render(<table><tbody><UserTableRow user={mockUserExitoso} /></tbody></table>);
    const badge = screen.getByText('Exitoso');
    expect(badge).toBeDefined();
    expect(badge.className).toContain('bg-emerald-500');
  });

  it('debe mostrar badge "Fallido" cuando resultado es Fallido', () => {
    render(<table><tbody><UserTableRow user={mockUserFallido} /></tbody></table>);
    const badge = screen.getByText('Fallido');
    expect(badge).toBeDefined();
    expect(badge.className).toContain('bg-red-500');
  });

  it('debe mostrar el nombre del admin cuando nombreAdmin está presente', () => {
    const userConAdmin = { ...mockUserExitoso, nombreAdmin: 'Pedro Gómez' };
    render(<table><tbody><UserTableRow user={userConAdmin} /></tbody></table>);
    expect(screen.getByText('Pedro Gómez')).toBeDefined();
  });

  it('debe mostrar guión cuando nombreAdmin no está presente', () => {
    render(<table><tbody><UserTableRow user={mockUserExitoso} /></tbody></table>);
    expect(screen.getByText('—')).toBeDefined();
  });

  it('debe mostrar las iniciales del admin cuando nombreAdmin está presente', () => {
    const userConAdmin = { ...mockUserExitoso, nombreAdmin: 'Pedro Gómez' };
    render(<table><tbody><UserTableRow user={userConAdmin} /></tbody></table>);
    expect(screen.getByText('PG')).toBeDefined();
  });
});
