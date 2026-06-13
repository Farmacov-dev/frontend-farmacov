// src/components/composed/FarmacoModal/FarmacoModal.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import FarmacoModal from './FarmacoModal';

// Mockeamos el contenedor para aislar el DOM de este componente
vi.mock('../ModalContainer/ModalContainer', () => ({
  default: ({ children, isOpen }: any) => (isOpen ? <div data-testid="mock-modal">{children}</div> : null)
}));

describe('Componente: FarmacoModal', () => {

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSubmit: vi.fn(),
    isLoading: false,
  };

  const mockFarmaco = {
    id: 99,
    nombre: 'AstraZeneca',
    tipo: 'Vector Viral',
    descripcion: 'Desarrollada en conjunto con la Universidad de Oxford.',
    fechaCreacion: '2026-01-01', // Asumiendo campos extra que vienen del backend
  };

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar en modo "Crear" con los campos vacíos por defecto', () => {
    render(<FarmacoModal {...defaultProps} />);

    // Verificamos títulos y textos del modo creación
    expect(screen.getByRole('heading', { name: /crear nuevo fármaco/i })).toBeDefined();
    expect(screen.getByText(/ingresa los datos del nuevo laboratorio/i)).toBeDefined();

    // Verificamos que los inputs estén vacíos
    const inputNombre = screen.getByLabelText(/nombre del laboratorio/i) as HTMLInputElement;
    const inputTipo = screen.getByLabelText(/tipo de fármaco/i) as HTMLInputElement;
    const inputDesc = screen.getByLabelText(/descripción/i) as HTMLTextAreaElement;

    expect(inputNombre.value).toBe('');
    expect(inputTipo.value).toBe('');
    expect(inputDesc.value).toBe('');

    // Verificamos el texto del botón
    expect(screen.getByRole('button', { name: /crear fármaco/i })).toBeDefined();
  });

  it('debe renderizar en modo "Editar" y pre-llenar los campos usando el useEffect', () => {
    render(<FarmacoModal {...defaultProps} farmacoToEdit={mockFarmaco as any} />);

    // Verificamos títulos del modo edición
    expect(screen.getByRole('heading', { name: /editar fármaco/i })).toBeDefined();
    expect(screen.getByText(/modifica los detalles/i)).toBeDefined();

    // El useEffect debió inyectar los datos en los inputs
    const inputNombre = screen.getByLabelText(/nombre del laboratorio/i) as HTMLInputElement;
    const inputTipo = screen.getByLabelText(/tipo de fármaco/i) as HTMLInputElement;
    const inputDesc = screen.getByLabelText(/descripción/i) as HTMLTextAreaElement;

    expect(inputNombre.value).toBe('AstraZeneca');
    expect(inputTipo.value).toBe('Vector Viral');
    expect(inputDesc.value).toContain('Universidad de Oxford');

    // El texto del botón cambia
    expect(screen.getByRole('button', { name: /guardar cambios/i })).toBeDefined();
  });

  it('debe mantener el botón de submit bloqueado si faltan campos obligatorios', () => {
    render(<FarmacoModal {...defaultProps} />);

    const botonSubmit = screen.getByRole('button', { name: /crear fármaco/i }) as HTMLButtonElement;
    const inputNombre = screen.getByLabelText(/nombre del laboratorio/i);
    const inputTipo = screen.getByLabelText(/tipo de fármaco/i);

    // Estado inicial vacío = bloqueado
    expect(botonSubmit.disabled).toBe(true);

    // Llenamos solo el nombre = sigue bloqueado
    fireEvent.change(inputNombre, { target: { value: 'Moderna' } });
    expect(botonSubmit.disabled).toBe(true);

    // Llenamos el tipo = se desbloquea
    fireEvent.change(inputTipo, { target: { value: 'ARNm' } });
    expect(botonSubmit.disabled).toBe(false);

    // Borramos el nombre (dejando solo espacios) = se vuelve a bloquear
    fireEvent.change(inputNombre, { target: { value: '   ' } });
    expect(botonSubmit.disabled).toBe(true);
  });

  it('debe ejecutar onSubmit con la estructura correcta del DTO al hacer clic', () => {
    render(<FarmacoModal {...defaultProps} />);

    const inputNombre = screen.getByLabelText(/nombre del laboratorio/i);
    const inputTipo = screen.getByLabelText(/tipo de fármaco/i);
    const inputDesc = screen.getByLabelText(/descripción/i);
    const botonSubmit = screen.getByRole('button', { name: /crear fármaco/i });

    fireEvent.change(inputNombre, { target: { value: 'BioNTech' } });
    fireEvent.change(inputTipo, { target: { value: 'ARNm' } });
    fireEvent.change(inputDesc, { target: { value: 'Socio europeo' } });

    fireEvent.click(botonSubmit);

    // Verificamos que se haya enviado sin el id ni fechas de creación (solo el DTO)
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
    expect(defaultProps.onSubmit).toHaveBeenCalledWith({
      nombre: 'BioNTech',
      tipo: 'ARNm',
      descripcion: 'Socio europeo'
    });
  });

  it('debe deshabilitar la interfaz y mostrar "Guardando..." cuando isLoading es true', () => {
    render(<FarmacoModal {...defaultProps} farmacoToEdit={mockFarmaco as any} isLoading={true} />);

    const inputNombre = screen.getByLabelText(/nombre del laboratorio/i) as HTMLInputElement;
    const inputTipo = screen.getByLabelText(/tipo de fármaco/i) as HTMLInputElement;
    const inputDesc = screen.getByLabelText(/descripción/i) as HTMLTextAreaElement;
    const botonCancelar = screen.getByRole('button', { name: /cancelar/i }) as HTMLButtonElement;
    const botonSubmit = screen.getByRole('button', { name: /guardando/i }) as HTMLButtonElement;

    expect(inputNombre.disabled).toBe(true);
    expect(inputTipo.disabled).toBe(true);
    expect(inputDesc.disabled).toBe(true);
    expect(botonCancelar.disabled).toBe(true);
    expect(botonSubmit.disabled).toBe(true);
  });
});