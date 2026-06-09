// src/components/composed/ModalContainer/ModalContainer.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import ModalContainer from './ModalContainer';

vi.mock('react-icons/io5', () => ({
  IoClose: () => <svg data-testid="icon-close" />
}));

describe('Componente: ModalContainer', () => {

  const mockOnClose = vi.fn();

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    document.body.style.overflow = '';
  });

  it('no debe renderizar nada si isOpen es false', () => {
    render(
      <ModalContainer isOpen={false} onClose={mockOnClose}>
        <p>Contenido Oculto</p>
      </ModalContainer>
    );
    expect(screen.queryByText('Contenido Oculto')).toBeNull();
  });

  it('debe renderizar el contenido usando su rol de dialog cuando isOpen es true', () => {
    render(
      <ModalContainer isOpen={true} onClose={mockOnClose}>
        <p>Contenido Visible</p>
      </ModalContainer>
    );

    const dialogElement = screen.getByRole('dialog');
    expect(dialogElement).toBeDefined();
    expect(dialogElement.getAttribute('aria-modal')).toBe('true');
    expect(screen.getByText('Contenido Visible')).toBeDefined();
  });

  it('debe bloquear el scroll del body al abrirse y restaurarlo al desmontarse', () => {
    expect(document.body.style.overflow).toBe('');

    const { unmount } = render(
      <ModalContainer isOpen={true} onClose={mockOnClose}>
        <p>Modal</p>
      </ModalContainer>
    );

    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('debe cerrar el modal al hacer clic en el botón de la X', () => {
    render(
      <ModalContainer isOpen={true} onClose={mockOnClose}>
        <p>Modal</p>
      </ModalContainer>
    );

    fireEvent.click(screen.getByRole('button', { name: /cerrar modal/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('no debe mostrar el botón de la X si showCloseButton es false', () => {
    render(
      <ModalContainer isOpen={true} onClose={mockOnClose} showCloseButton={false}>
        <p>Modal</p>
      </ModalContainer>
    );

    expect(screen.queryByRole('button', { name: /cerrar modal/i })).toBeNull();
  });

  it('debe cerrar el modal al presionar la tecla Escape', () => {
    render(
      <ModalContainer isOpen={true} onClose={mockOnClose}>
        <p>Modal</p>
      </ModalContainer>
    );

    // ✅ globalThis en lugar de window
    fireEvent.keyDown(globalThis as unknown as Window, { key: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('debe ejecutar onClose al hacer clic en el fondo oscuro (backdrop), pero NO al hacer clic dentro del modal', () => {
    render(
      <ModalContainer isOpen={true} onClose={mockOnClose}>
        <p>Contenido</p>
      </ModalContainer>
    );

    const dialogElement  = screen.getByRole('dialog');
    const backdropElement = dialogElement.parentElement as HTMLElement;

    fireEvent.click(dialogElement);
    expect(mockOnClose).not.toHaveBeenCalled();

    fireEvent.click(backdropElement);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});