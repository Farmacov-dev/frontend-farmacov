// src/components/composed/LogoutConfirmationModal/LogoutConfirmationModal.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import LogoutConfirmationModal from './LogoutConfirmationModal';

// Mockeamos el contenedor base
vi.mock('../ModalContainer/ModalContainer', () => ({
  default: ({ children, isOpen }: any) => (isOpen ? <div data-testid="mock-modal">{children}</div> : null)
}));

describe('Componente: LogoutConfirmationModal', () => {

  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('no debe renderizar nada en el DOM si isOpen es false', () => {
    render(
      <LogoutConfirmationModal 
        isOpen={false} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    expect(screen.queryByTestId('mock-modal')).toBeNull();
  });

  it('debe renderizar la pregunta de confirmación y ambos botones cuando isOpen es true', () => {
    render(
      <LogoutConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );

    // Verificamos el texto principal
    expect(screen.getByText('¿Está seguro de cerrar sesión?')).toBeDefined();

    // Verificamos los botones por su rol y texto
    expect(screen.getByRole('button', { name: /cerrar sesión/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeDefined();
  });

  it('debe ejecutar la función onConfirm al hacer clic en el botón principal', () => {
    render(
      <LogoutConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );

    const botonCerrarSesion = screen.getByRole('button', { name: /cerrar sesión/i });
    fireEvent.click(botonCerrarSesion);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnClose).not.toHaveBeenCalled(); // Validamos que no haya cruce de cables
  });

  it('debe ejecutar la función onClose al hacer clic en Cancelar', () => {
    render(
      <LogoutConfirmationModal 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );

    const botonCancelar = screen.getByRole('button', { name: /cancelar/i });
    fireEvent.click(botonCancelar);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });
});