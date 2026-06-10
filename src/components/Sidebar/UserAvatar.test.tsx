// src/components/Sidebar/UserAvatar.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import UserAvatar from './UserAvatar';

describe('Componente: UserAvatar', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe mostrar las iniciales de un nombre con dos palabras', () => {
    render(<UserAvatar userName="Caro Ramirez" />);

    expect(screen.getByText('CR')).toBeDefined();
  });

  it('debe mostrar las dos primeras letras de un nombre con una sola palabra', () => {
    render(<UserAvatar userName="Carlos" />);

    expect(screen.getByText('CA')).toBeDefined();
  });

  it('debe mostrar "U" cuando el nombre está vacío', () => {
    render(<UserAvatar userName="" />);

    expect(screen.getByText('U')).toBeDefined();
  });
});
