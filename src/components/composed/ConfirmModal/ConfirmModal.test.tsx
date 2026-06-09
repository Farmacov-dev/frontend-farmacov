// src/components/composed/ConfirmModal/ConfirmModal.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import ConfirmModal from './ConfirmModal';

// Mockeamos el contenedor base para aislar las pruebas de la UI de esta pantalla
// Además, extraemos la prop showCloseButton a un data-attribute para poder evaluarla
vi.mock('../ModalContainer/ModalContainer', () => ({
  default: ({ children, isOpen, showCloseButton }: any) => (
    isOpen ? <div data-testid="mock-modal" data-show-close={showCloseButton}>{children}</div> : null
  )
}));

// Mockeamos lucide-react para evitar cargar los SVGs completos en el DOM de la prueba
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

    // Validamos que los textos existan
    expect(screen.getByRole('heading', { name: defaultProps.title })).toBeDefined();
    expect(screen.getByText(defaultProps.message)).toBeDefined();

    // Verificamos el ícono informativo por defecto
    expect(screen.getByTestId('icon-info')).toBeDefined();

    const botonCancelar = screen.getByRole('button', { name: /cancelar/i });
    const botonConfirmar = screen.getByRole('button', { name: /confirmar/i });

    // Simulamos las acciones
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

    // Evaluamos el cambio de ícono
    expect(screen.getByTestId('icon-alert')).toBeDefined();
    expect(screen.queryByTestId('icon-info')).toBeNull();

    // Evaluamos que el botón principal reciba las clases de peligro
    const botonConfirmar = screen.getByRole('button', { name: /sí, eliminar/i });
    expect(botonConfirmar.className).toContain('bg-red');
    
    // Verificamos el contenedor del ícono subiendo desde él
    const iconContainer = screen.getByTestId('icon-alert').parentElement;
    expect(iconContainer?.className).toContain('text-red');
  });

  it('debe deshabilitar los controles y cambiar el texto al estar en modo loading', () => {
    render(<ConfirmModal {...defaultProps} isLoading={true} />);

    const modalContainer = screen.getByTestId('mock-modal');
    // Verificamos que se oculte el botón de cerrar del contenedor padre
    expect(modalContainer.getAttribute('data-show-close')).toBe('false');

    const botonCancelar = screen.getByRole('button', { name: /cancelar/i }) as HTMLButtonElement;
    // Buscamos el botón confirmar por su nuevo texto dinámico
    const botonConfirmar = screen.getByRole('button', { name: /procesando/i }) as HTMLButtonElement;

    // Ambos botones deben estar bloqueados
    expect(botonCancelar.disabled).toBe(true);
    expect(botonConfirmar.disabled).toBe(true);

    // Intentamos hacer clic y verificamos que no se disparen los eventos
    fireEvent.click(botonCancelar);
    fireEvent.click(botonConfirmar);

    expect(defaultProps.onClose).not.toHaveBeenCalled();
    expect(defaultProps.onConfirm).not.toHaveBeenCalled();
  });
});