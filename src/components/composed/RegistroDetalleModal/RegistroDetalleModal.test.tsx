// src/components/composed/RegistroDetalleModal/RegistroDetalleModal.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import RegistroDetalleModal from './RegistroDetalleModal';

// Mockeamos el contenedor base para aislar este componente
vi.mock('../ModalContainer/ModalContainer', () => ({
  default: ({ children, isOpen }: any) =>
    isOpen ? <div data-testid="mock-modal">{children}</div> : null,
}));

// Mockeamos los componentes primarios para no depender de su implementación
vi.mock('../../primary/InputField/InputField', () => ({
  default: ({ label, value, onChange, disabled, type, placeholder }: any) => (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  ),
}));

vi.mock('../../primary/Button/Button', () => ({
  default: ({ children, onClick, disabled, type, variant }: any) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-variant={variant}
    >
      {children}
    </button>
  ),
}));

// Props base reutilizables
const baseProps = {
  isOpen: true,
  onClose: vi.fn(),
  onSubmit: vi.fn(),
  isLoading: false,
};

describe('Componente: RegistroDetalleModal', () => {

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // ─── VISIBILIDAD ────────────────────────────────────────────────────────────

  it('no debe renderizar nada si isOpen es false', () => {
    render(<RegistroDetalleModal {...baseProps} isOpen={false} tipo="costos" />);
    expect(screen.queryByTestId('mock-modal')).toBeNull();
  });

  it('debe renderizar el modal cuando isOpen es true', () => {
    render(<RegistroDetalleModal {...baseProps} tipo="costos" />);
    expect(screen.getByTestId('mock-modal')).toBeDefined();
  });

  // ─── TÍTULO DINÁMICO ────────────────────────────────────────────────────────

  it('debe mostrar "Registrar Costo" al crear en modo costos', () => {
    render(<RegistroDetalleModal {...baseProps} tipo="costos" />);
    expect(screen.getByText('Registrar Costo')).toBeDefined();
  });

  it('debe mostrar "Registrar Condición" al crear en modo condiciones', () => {
    render(<RegistroDetalleModal {...baseProps} tipo="condiciones" />);
    expect(screen.getByText('Registrar Condición')).toBeDefined();
  });

  it('debe mostrar "Editar Costo" cuando se pasa un itemToEdit en modo costos', () => {
    render(
      <RegistroDetalleModal
        {...baseProps}
        tipo="costos"
        itemToEdit={{ costoUnitario: 150 }}
      />
    );
    expect(screen.getByText('Editar Costo')).toBeDefined();
  });

  it('debe mostrar "Editar Condición" cuando se pasa un itemToEdit en modo condiciones', () => {
    render(
      <RegistroDetalleModal
        {...baseProps}
        tipo="condiciones"
        itemToEdit={{ temperatura: -70, tiempoAmbiente: 2 }}
      />
    );
    expect(screen.getByText('Editar Condición')).toBeDefined();
  });

  // ─── RENDERIZADO CONDICIONAL POR TIPO ───────────────────────────────────────

  it('debe renderizar solo el campo de Costo Unitario en modo costos', () => {
    render(<RegistroDetalleModal {...baseProps} tipo="costos" />);

    expect(screen.getByLabelText(/costo unitario/i)).toBeDefined();
    expect(screen.queryByLabelText(/temperatura/i)).toBeNull();
    expect(screen.queryByLabelText(/tiempo en ambiente/i)).toBeNull();
  });

  it('debe renderizar los campos de Temperatura y Tiempo en Ambiente en modo condiciones', () => {
    render(<RegistroDetalleModal {...baseProps} tipo="condiciones" />);

    expect(screen.getByLabelText(/temperatura de almacenamiento/i)).toBeDefined();
    expect(screen.getByLabelText(/tiempo en ambiente/i)).toBeDefined();
    expect(screen.queryByLabelText(/costo unitario/i)).toBeNull();
  });

  // ─── PRE-LLENADO DE CAMPOS (useEffect) ─────────────────────────────────────

  it('debe pre-llenar el campo de costo cuando se pasa itemToEdit en modo costos', () => {
    render(
      <RegistroDetalleModal
        {...baseProps}
        tipo="costos"
        itemToEdit={{ costoUnitario: 299.99 }}
      />
    );
    const input = screen.getByLabelText(/costo unitario/i) as HTMLInputElement;
    expect(input.value).toBe('299.99');
  });

  it('debe pre-llenar temperatura y tiempoAmbiente cuando se pasa itemToEdit en modo condiciones', () => {
    render(
      <RegistroDetalleModal
        {...baseProps}
        tipo="condiciones"
        itemToEdit={{ temperatura: -70, tiempoAmbiente: 2 }}
      />
    );
    const inputTemp = screen.getByLabelText(/temperatura de almacenamiento/i) as HTMLInputElement;
    const inputTiempo = screen.getByLabelText(/tiempo en ambiente/i) as HTMLInputElement;

    expect(inputTemp.value).toBe('-70');
    expect(inputTiempo.value).toBe('2');
  });

  it('debe dejar los campos vacíos cuando isOpen es true pero no hay itemToEdit', () => {
    render(<RegistroDetalleModal {...baseProps} tipo="costos" itemToEdit={null} />);
    const input = screen.getByLabelText(/costo unitario/i) as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('debe manejar tiempoAmbiente null en itemToEdit dejando el campo vacío', () => {
    render(
      <RegistroDetalleModal
        {...baseProps}
        tipo="condiciones"
        itemToEdit={{ temperatura: -20, tiempoAmbiente: null }}
      />
    );
    const inputTiempo = screen.getByLabelText(/tiempo en ambiente/i) as HTMLInputElement;
    expect(inputTiempo.value).toBe('');
  });

  // ─── VALIDACIÓN Y BOTÓN SUBMIT ──────────────────────────────────────────────

  it('debe tener el botón de submit deshabilitado si el campo de costo está vacío', () => {
    render(<RegistroDetalleModal {...baseProps} tipo="costos" />);
    const btnSubmit = screen.getByRole('button', { name: /crear registro/i }) as HTMLButtonElement;
    expect(btnSubmit.disabled).toBe(true);
  });

  it('debe habilitar el botón de submit al escribir en el campo de costo', () => {
    render(<RegistroDetalleModal {...baseProps} tipo="costos" />);
    const input = screen.getByLabelText(/costo unitario/i);
    const btnSubmit = screen.getByRole('button', { name: /crear registro/i }) as HTMLButtonElement;

    fireEvent.change(input, { target: { value: '150' } });
    expect(btnSubmit.disabled).toBe(false);
  });

  it('debe tener el botón de submit deshabilitado si temperatura está vacía en modo condiciones', () => {
    render(<RegistroDetalleModal {...baseProps} tipo="condiciones" />);
    const btnSubmit = screen.getByRole('button', { name: /crear registro/i }) as HTMLButtonElement;
    expect(btnSubmit.disabled).toBe(true);
  });

  it('debe habilitar el botón de submit al escribir temperatura aunque tiempoAmbiente esté vacío', () => {
    render(<RegistroDetalleModal {...baseProps} tipo="condiciones" />);
    const inputTemp = screen.getByLabelText(/temperatura de almacenamiento/i);
    const btnSubmit = screen.getByRole('button', { name: /crear registro/i }) as HTMLButtonElement;

    fireEvent.change(inputTemp, { target: { value: '-70' } });
    expect(btnSubmit.disabled).toBe(false);
  });

  // ─── SUBMIT: PAYLOAD CORRECTO ───────────────────────────────────────────────

  it('debe llamar onSubmit con costoUnitario como número en modo costos', () => {
    const mockOnSubmit = vi.fn();
    render(<RegistroDetalleModal {...baseProps} tipo="costos" onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/costo unitario/i), { target: { value: '299.99' } });
    fireEvent.click(screen.getByRole('button', { name: /crear registro/i }));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({ costoUnitario: 299.99 });
  });

  it('debe llamar onSubmit con temperatura y tiempoAmbiente como número cuando ambos tienen valor', () => {
    const mockOnSubmit = vi.fn();
    render(<RegistroDetalleModal {...baseProps} tipo="condiciones" onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/temperatura de almacenamiento/i), { target: { value: '-70' } });
    fireEvent.change(screen.getByLabelText(/tiempo en ambiente/i), { target: { value: '2' } });
    fireEvent.click(screen.getByRole('button', { name: /crear registro/i }));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({ temperatura: -70, tiempoAmbiente: 2 });
  });

  it('debe enviar tiempoAmbiente como null si el campo está vacío', () => {
    const mockOnSubmit = vi.fn();
    render(<RegistroDetalleModal {...baseProps} tipo="condiciones" onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/temperatura de almacenamiento/i), { target: { value: '-20' } });
    // tiempoAmbiente se deja vacío intencionalmente
    fireEvent.click(screen.getByRole('button', { name: /crear registro/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({ temperatura: -20, tiempoAmbiente: null });
  });

  it('no debe llamar onSubmit si se intenta hacer submit con el formulario vacío en modo costos', () => {
    const mockOnSubmit = vi.fn();
    render(<RegistroDetalleModal {...baseProps} tipo="costos" onSubmit={mockOnSubmit} />);

    // Intentamos submit sin llenar nada (el botón está disabled, pero también probamos el guard interno)
    const form = screen.getByTestId('mock-modal').querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  // ─── ESTADO DE CARGA (isLoading) ────────────────────────────────────────────

  it('debe deshabilitar todos los inputs y botones cuando isLoading es true', () => {
    render(<RegistroDetalleModal {...baseProps} tipo="costos" isLoading={true} />);

    const inputCosto = screen.getByLabelText(/costo unitario/i) as HTMLInputElement;
    const btnCancelar = screen.getByRole('button', { name: /cancelar/i }) as HTMLButtonElement;
    const btnSubmit = screen.getByRole('button', { name: /guardando/i }) as HTMLButtonElement;

    expect(inputCosto.disabled).toBe(true);
    expect(btnCancelar.disabled).toBe(true);
    expect(btnSubmit.disabled).toBe(true);
  });

  it('debe mostrar el texto "Guardando..." en el botón submit cuando isLoading es true', () => {
    render(<RegistroDetalleModal {...baseProps} tipo="costos" isLoading={true} />);
    expect(screen.getByRole('button', { name: /guardando/i })).toBeDefined();
  });

  it('debe mostrar "Guardar Cambios" al editar con isLoading false', () => {
    render(
      <RegistroDetalleModal
        {...baseProps}
        tipo="costos"
        isLoading={false}
        itemToEdit={{ costoUnitario: 100 }}
      />
    );
    expect(screen.getByRole('button', { name: /guardar cambios/i })).toBeDefined();
  });

  // ─── BOTÓN CANCELAR ─────────────────────────────────────────────────────────

  it('debe ejecutar onClose al hacer clic en Cancelar', () => {
    const mockOnClose = vi.fn();
    render(<RegistroDetalleModal {...baseProps} tipo="costos" onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(baseProps.onSubmit).not.toHaveBeenCalled();
  });
});