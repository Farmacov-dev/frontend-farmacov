// src/components/composed/ExportarReporteModal/ExportarReporteModal.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import ExportarReporteModal from './ExportarReporteModal';

// Mockeamos el icono para no ensuciar el DOM
vi.mock('lucide-react', () => ({
  X: () => <svg data-testid="icon-x" />,
}));

describe('Componente: ExportarReporteModal', () => {

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onExport: vi.fn(),
    isLoading: false,
  };

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    // Nos aseguramos de restaurar el tiempo real después de cada prueba
    vi.useRealTimers(); 
  });

  it('no debe renderizar nada en el DOM si isOpen es false', () => {
    render(<ExportarReporteModal {...defaultProps} isOpen={false} />);
    
    // Buscamos el título, no debería existir
    expect(screen.queryByRole('heading', { name: /configurar reporte pdf/i })).toBeNull();
  });

  it('debe ejecutar onClose al hacer clic en Cancelar o en la X', () => {
    render(<ExportarReporteModal {...defaultProps} />);

    const botonCancelar = screen.getByRole('button', { name: /cancelar/i });
    
    // El botón X no tiene un texto, pero lo podemos encontrar subiendo desde su icono mockeado
    const iconX = screen.getByTestId('icon-x');
    const botonX = iconX.closest('button') as HTMLButtonElement;

    fireEvent.click(botonCancelar);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(botonX);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(2);
  });

  it('debe deshabilitar los controles y cambiar el texto del botón si isLoading es true', () => {
    render(<ExportarReporteModal {...defaultProps} isLoading={true} />);

    const textArea = screen.getByLabelText(/conclusiones/i) as HTMLTextAreaElement;
    const botonCancelar = screen.getByRole('button', { name: /cancelar/i }) as HTMLButtonElement;
    
    // El texto del botón principal debió cambiar
    const botonExportar = screen.getByRole('button', { name: /generando pdf/i }) as HTMLButtonElement;

    expect(textArea.disabled).toBe(true);
    expect(botonCancelar.disabled).toBe(true);
    expect(botonExportar.disabled).toBe(true);
  });

  it('debe enviar el texto a onExport y limpiar el campo después de 500ms', () => {
    // Activamos los Fake Timers de Vitest para controlar el setTimeout
    vi.useFakeTimers();
    
    render(<ExportarReporteModal {...defaultProps} />);

    const textArea = screen.getByLabelText(/conclusiones/i) as HTMLTextAreaElement;
    const botonExportar = screen.getByRole('button', { name: /generar reporte pdf/i });

    // 1. Simulamos que el usuario escribe un hallazgo
    fireEvent.change(textArea, { target: { value: 'Hallazgo crítico en la zona norte.' } });
    expect(textArea.value).toBe('Hallazgo crítico en la zona norte.');

    // 2. Hacemos clic en exportar
    fireEvent.click(botonExportar);

    // 3. Verificamos que la función externa recibió el texto correcto inmediatamente
    expect(defaultProps.onExport).toHaveBeenCalledTimes(1);
    expect(defaultProps.onExport).toHaveBeenCalledWith('Hallazgo crítico en la zona norte.');

    // 4. Verificamos que el texto SIGUE AHÍ porque no han pasado los 500ms
    expect(textArea.value).toBe('Hallazgo crítico en la zona norte.');

    // 5. Adelantamos el reloj de JavaScript 500 milisegundos exactos de forma síncrona
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // 6. Ahora sí, el estado debió haberse limpiado
    expect(textArea.value).toBe('');
  });
});