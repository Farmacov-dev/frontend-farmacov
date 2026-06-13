// src/components/composed/ConfirmModal/ConfirmModal.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import ConfirmModal from './ConfirmModal';

vi.mock('../ModalContainer/ModalContainer', () => ({
  default: ({ children, isOpen, showCloseButton }: any) => (
    isOpen ? <div data-testid="mock-modal" data-show-close={showCloseButton}>{children}</div> : null
  )
}));

vi.mock('lucide-react', () => ({
  AlertTriangle: () => <svg data-testid="icon-alert" />,
  Info: () => <svg data-testid="icon-info" />
}));

describe('Componente: ConfirmModal', () => {

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    title: '¿Dar de alta al paciente?',
    message: 'Esta acción guardará los datos en el sistema.',
  };

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('no debe renderizar nada si isOpen es false', () => {
    render(<ConfirmModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByTestId('mock-modal')).toBeNull();
  });

  it('debe renderizar textos base y ejecutar las acciones correspondientes al hacer clic', () => {
    render(<ConfirmModal {...defaultProps} />);

    expect(screen.getByRole('heading', { name: defaultProps.title })).toBeDefined();
    expect(screen.getByText(defaultProps.message)).toBeDefined();
    expect(screen.getByTestId('icon-info')).toBeDefined();

    const botonCancelar = screen.getByRole('button', { name: /cancelar/i });
    const botonConfirmar = screen.getByRole('button', { name: /confirmar/i });

    fireEvent.click(botonCancelar);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(botonConfirmar);
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it('debe aplicar estilos y el icono destructivo cuando isDestructive es true', () => {
    render(
      <ConfirmModal 
        {...defaultProps} 
        isDestructive={true} 
        confirmText="Sí, eliminar" 
      />
    );

    expect(screen.getByTestId('icon-alert')).toBeDefined();
    expect(screen.queryByTestId('icon-info')).toBeNull();

    const botonConfirmar = screen.getByRole('button', { name: /sí, eliminar/i });
    expect(botonConfirmar.className).toContain('bg-red');
    
    const iconContainer = screen.getByTestId('icon-alert').parentElement;
    expect(iconContainer?.className).toContain('text-red');
  });

  it('debe deshabilitar los controles y cambiar el texto al estar en modo loading', () => {
    render(<ConfirmModal {...defaultProps} isLoading={true} />);

    const modalContainer = screen.getByTestId('mock-modal');
    // ✅ dataset en lugar de getAttribute para data-* attributes
    expect(modalContainer.dataset.showClose).toBe('false');

    const botonCancelar  = screen.getByRole('button', { name: /cancelar/i   }) as HTMLButtonElement;
    const botonConfirmar = screen.getByRole('button', { name: /procesando/i }) as HTMLButtonElement;

    expect(botonCancelar.disabled).toBe(true);
    expect(botonConfirmar.disabled).toBe(true);

    fireEvent.click(botonCancelar);
    fireEvent.click(botonConfirmar);

    expect(defaultProps.onClose).not.toHaveBeenCalled();
    expect(defaultProps.onConfirm).not.toHaveBeenCalled();
  });
});