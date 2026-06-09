// src/components/composed/CrearRolModal/CrearRolModal.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import CrearRolModal from './CrearRolModal';
// Importamos el hook para poder interceptarlo
import { useCrearRol } from '../../../hooks/useRoles';

// 1. Mockeamos el contenedor del Modal para aislar la prueba
vi.mock('../ModalContainer/ModalContainer', () => ({
  default: ({ children, isOpen }: any) => (isOpen ? <div data-testid="mock-modal">{children}</div> : null)
}));

// 2. Mockeamos el módulo donde vive el hook
vi.mock('../../../hooks/useRoles', () => ({
  useCrearRol: vi.fn(),
}));

describe('Componente: CrearRolModal', () => {

  const mockOnClose = vi.fn();
  const mockMutate = vi.fn();

  beforeEach(() => {
    // Configuramos el estado por defecto del hook antes de cada prueba
    (useCrearRol as any).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
    
    // Interceptamos window.alert para que no rompa la consola de pruebas
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar correctamente el contenido cuando isOpen es true', () => {
    render(<CrearRolModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByRole('heading', { name: /crear nuevo rol/i })).toBeDefined();
    expect(screen.getByLabelText(/nombre del rol/i)).toBeDefined();
    expect(screen.getByRole('checkbox', { name: /otorgar privilegios de administrador/i })).toBeDefined();
  });

  it('debe mantener el botón de Crear Rol deshabilitado si el input está vacío', () => {
    render(<CrearRolModal isOpen={true} onClose={mockOnClose} />);

    const botonCrear = screen.getByRole('button', { name: /crear rol/i }) as HTMLButtonElement;
    expect(botonCrear.disabled).toBe(true);
  });

  it('debe habilitar el botón y enviar los datos correctos por defecto (no admin)', () => {
    render(<CrearRolModal isOpen={true} onClose={mockOnClose} />);

    const inputNombre = screen.getByLabelText(/nombre del rol/i);
    const botonCrear = screen.getByRole('button', { name: /crear rol/i }) as HTMLButtonElement;

    // Simulamos la escritura
    fireEvent.change(inputNombre, { target: { value: 'Auditor Médico' } });
    
    // El botón debe haberse habilitado
    expect(botonCrear.disabled).toBe(false);

    // Simulamos el envío
    fireEvent.click(botonCrear);

    // Verificamos que el hook se llamó con la data estructurada y esAdmin en false
    expect(mockMutate).toHaveBeenCalledTimes(1);
    expect(mockMutate).toHaveBeenCalledWith(
      { nombre: 'Auditor Médico', esAdmin: false },
      expect.any(Object) // Esperamos el objeto con onSuccess y onError
    );
  });

  it('debe enviar esAdmin como true si se marcó el checkbox', () => {
    render(<CrearRolModal isOpen={true} onClose={mockOnClose} />);

    const inputNombre = screen.getByLabelText(/nombre del rol/i);
    const checkboxAdmin = screen.getByRole('checkbox', { name: /otorgar privilegios/i });
    const botonCrear = screen.getByRole('button', { name: /crear rol/i });

    fireEvent.change(inputNombre, { target: { value: 'Super Usuario' } });
    fireEvent.click(checkboxAdmin);
    fireEvent.click(botonCrear);

    expect(mockMutate).toHaveBeenCalledWith(
      { nombre: 'Super Usuario', esAdmin: true },
      expect.any(Object)
    );
  });

  it('debe limpiar el estado y cerrar el modal cuando la petición es exitosa (onSuccess)', () => {
    // Sobrescribimos el mock para que automáticamente dispare el callback de éxito
    mockMutate.mockImplementation((data, options) => {
      options.onSuccess();
    });

    render(<CrearRolModal isOpen={true} onClose={mockOnClose} />);

    const inputNombre = screen.getByLabelText(/nombre del rol/i);
    const botonCrear = screen.getByRole('button', { name: /crear rol/i });

    fireEvent.change(inputNombre, { target: { value: 'Enfermera' } });
    fireEvent.click(botonCrear);

    // Si onSuccess se ejecutó, debió llamar a handleCerrar, que a su vez llama a onClose
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('debe disparar la alerta cuando la petición falla (onError)', () => {
    // Sobrescribimos el mock para que dispare el callback de error
    mockMutate.mockImplementation((data, options) => {
      options.onError();
    });

    render(<CrearRolModal isOpen={true} onClose={mockOnClose} />);

    const inputNombre = screen.getByLabelText(/nombre del rol/i);
    const botonCrear = screen.getByRole('button', { name: /crear rol/i });

    fireEvent.change(inputNombre, { target: { value: 'Recepcionista' } });
    fireEvent.click(botonCrear);

    // Verificamos que se haya ejecutado nuestra alerta interceptada
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Hubo un error'));
  });

  it('debe bloquear los inputs, cambiar textos y bloquear botones cuando isPending es true', () => {
    // Simulamos que el hook está en proceso de carga
    (useCrearRol as any).mockReturnValue({
      mutate: mockMutate,
      isPending: true,
    });

    render(<CrearRolModal isOpen={true} onClose={mockOnClose} />);

    const inputNombre = screen.getByLabelText(/nombre del rol/i) as HTMLInputElement;
    const checkboxAdmin = screen.getByRole('checkbox', { name: /otorgar privilegios/i }) as HTMLInputElement;
    const botonCancelar = screen.getByRole('button', { name: /cancelar/i }) as HTMLButtonElement;
    
    // El texto del botón debe haber cambiado a "Creando..."
    const botonCrear = screen.getByRole('button', { name: /creando/i }) as HTMLButtonElement;

    // Evaluamos que la interfaz completa esté bloqueada para evitar doble envío
    expect(inputNombre.disabled).toBe(true);
    expect(checkboxAdmin.disabled).toBe(true);
    expect(botonCancelar.disabled).toBe(true);
    expect(botonCrear.disabled).toBe(true);
  });
});