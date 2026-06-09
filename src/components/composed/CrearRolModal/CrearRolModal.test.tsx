// src/components/composed/CrearRolModal/CrearRolModal.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import CrearRolModal from './CrearRolModal';
import { useCrearRol } from '../../../hooks/useRoles';

vi.mock('../ModalContainer/ModalContainer', () => ({
  default: ({ children, isOpen }: any) => (isOpen ? <div data-testid="mock-modal">{children}</div> : null)
}));

vi.mock('../../../hooks/useRoles', () => ({
  useCrearRol: vi.fn(),
}));

describe('Componente: CrearRolModal', () => {

  const mockOnClose = vi.fn();
  const mockMutate  = vi.fn();

  beforeEach(() => {
    (useCrearRol as any).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    // ✅ globalThis en lugar de window — estándar universal
    vi.spyOn(globalThis, 'alert').mockImplementation(() => {});
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
    const botonCrear  = screen.getByRole('button', { name: /crear rol/i }) as HTMLButtonElement;

    fireEvent.change(inputNombre, { target: { value: 'Auditor Médico' } });
    expect(botonCrear.disabled).toBe(false);

    fireEvent.click(botonCrear);

    expect(mockMutate).toHaveBeenCalledTimes(1);
    expect(mockMutate).toHaveBeenCalledWith(
      { nombre: 'Auditor Médico', esAdmin: false },
      expect.any(Object)
    );
  });

  it('debe enviar esAdmin como true si se marcó el checkbox', () => {
    render(<CrearRolModal isOpen={true} onClose={mockOnClose} />);

    const inputNombre    = screen.getByLabelText(/nombre del rol/i);
    const checkboxAdmin  = screen.getByRole('checkbox', { name: /otorgar privilegios/i });
    const botonCrear     = screen.getByRole('button', { name: /crear rol/i });

    fireEvent.change(inputNombre, { target: { value: 'Super Usuario' } });
    fireEvent.click(checkboxAdmin);
    fireEvent.click(botonCrear);

    expect(mockMutate).toHaveBeenCalledWith(
      { nombre: 'Super Usuario', esAdmin: true },
      expect.any(Object)
    );
  });

  it('debe limpiar el estado y cerrar el modal cuando la petición es exitosa (onSuccess)', () => {
    mockMutate.mockImplementation((data, options) => {
      options.onSuccess();
    });

    render(<CrearRolModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText(/nombre del rol/i), { target: { value: 'Enfermera' } });
    fireEvent.click(screen.getByRole('button', { name: /crear rol/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('debe disparar la alerta cuando la petición falla (onError)', () => {
    mockMutate.mockImplementation((data, options) => {
      options.onError();
    });

    render(<CrearRolModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText(/nombre del rol/i), { target: { value: 'Recepcionista' } });
    fireEvent.click(screen.getByRole('button', { name: /crear rol/i }));

    // ✅ globalThis en lugar de window
    expect(globalThis.alert).toHaveBeenCalledTimes(1);
    expect(globalThis.alert).toHaveBeenCalledWith(expect.stringContaining('Hubo un error'));
  });

  it('debe bloquear los inputs, cambiar textos y bloquear botones cuando isPending es true', () => {
    (useCrearRol as any).mockReturnValue({
      mutate: mockMutate,
      isPending: true,
    });

    render(<CrearRolModal isOpen={true} onClose={mockOnClose} />);

    const inputNombre    = screen.getByLabelText(/nombre del rol/i)                           as HTMLInputElement;
    const checkboxAdmin  = screen.getByRole('checkbox', { name: /otorgar privilegios/i })     as HTMLInputElement;
    const botonCancelar  = screen.getByRole('button',  { name: /cancelar/i })                 as HTMLButtonElement;
    const botonCrear     = screen.getByRole('button',  { name: /creando/i })                  as HTMLButtonElement;

    expect(inputNombre.disabled).toBe(true);
    expect(checkboxAdmin.disabled).toBe(true);
    expect(botonCancelar.disabled).toBe(true);
    expect(botonCrear.disabled).toBe(true);
  });
});