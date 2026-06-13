// src/components/composed/VacunaModal/VacunaModal.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import VacunaModal from './VacunaModal';
import type { Vacuna, CrearVacunaDTO } from '../../../services/admin/adminVacunas';
import type { Farmaco } from '../../../services/admin/adminFarmacos';

// ─── MOCKS ──────────────────────────────────────────────────────────────────

vi.mock('../ModalContainer/ModalContainer', () => ({
  default: ({ children, isOpen }: any) =>
    isOpen ? <div data-testid="mock-modal">{children}</div> : null,
}));

vi.mock('../../primary/InputField/InputField', () => ({
  default: ({ label, value, onChange, disabled, type, placeholder }: any) => (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type={type ?? 'text'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  ),
}));

vi.mock('../../primary/TextAreaField/TextAreaField', () => ({
  default: ({ label, value, onChange, disabled, placeholder, rows }: any) => (
    <div>
      <label htmlFor={label}>{label}</label>
      <textarea
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
      />
    </div>
  ),
}));

vi.mock('../../primary/Button/Button', () => ({
  default: ({ children, onClick, disabled, type }: any) => (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

// ─── DATOS DE PRUEBA ────────────────────────────────────────────────────────

const mockFarmaco: Farmaco = {
  id: 10,
  nombre: 'Pfizer Inc.',
  tipo: 'Biofarmacéutica',
  descripcion: 'Empresa farmacéutica multinacional.',
};

const mockVacunaToEdit: Vacuna = {
  idVacuna: 5,
  idFarmaco: 10,
  nombre: 'Comirnaty',
  farmaceutica: 'Pfizer Inc.',
  tipo: 'ARNm',
};

const baseProps = {
  isOpen: true,
  onClose: vi.fn(),
  onSubmit: vi.fn(),
  farmacoActivo: mockFarmaco,
  isLoading: false,
};

// ─── SUITE ──────────────────────────────────────────────────────────────────

describe('Componente: VacunaModal', () => {

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // ─── VISIBILIDAD ─────────────────────────────────────────────────────────

  it('no debe renderizar nada si isOpen es false', () => {
    render(<VacunaModal {...baseProps} isOpen={false} />);
    expect(screen.queryByTestId('mock-modal')).toBeNull();
  });

  it('debe renderizar el modal cuando isOpen es true', () => {
    render(<VacunaModal {...baseProps} />);
    expect(screen.getByTestId('mock-modal')).toBeDefined();
  });

  // ─── TÍTULO DINÁMICO ─────────────────────────────────────────────────────

  it('debe mostrar el título con el nombre del fármaco en modo creación', () => {
    render(<VacunaModal {...baseProps} />);
    expect(screen.getByText(`Nueva Vacuna para ${mockFarmaco.nombre}`)).toBeDefined();
  });

  it('debe mostrar "Editar Vacuna" cuando se pasa vacunaToEdit', () => {
    render(<VacunaModal {...baseProps} vacunaToEdit={mockVacunaToEdit} />);
    expect(screen.getByText('Editar Vacuna')).toBeDefined();
  });

  // ─── CAMPOS VISIBLES POR MODO ─────────────────────────────────────────────

  it('debe mostrar el campo ID Manual solo en modo creación', () => {
    render(<VacunaModal {...baseProps} />);
    expect(screen.getByLabelText(/id de la vacuna/i)).toBeDefined();
  });

  it('no debe mostrar el campo ID Manual en modo edición', () => {
    render(<VacunaModal {...baseProps} vacunaToEdit={mockVacunaToEdit} />);
    expect(screen.queryByLabelText(/id de la vacuna/i)).toBeNull();
  });

  it('debe mostrar los campos Nombre, Tipo y Descripción en ambos modos', () => {
    render(<VacunaModal {...baseProps} />);
    expect(screen.getByLabelText(/nombre comercial/i)).toBeDefined();
    expect(screen.getByLabelText(/tipo de vacuna/i)).toBeDefined();
    expect(screen.getByLabelText(/descripción general/i)).toBeDefined();
  });

  // ─── PRE-LLENADO (useEffect) ──────────────────────────────────────────────

  it('debe pre-llenar nombre y tipo al abrir en modo edición', () => {
    render(<VacunaModal {...baseProps} vacunaToEdit={mockVacunaToEdit} />);

    const inputNombre = screen.getByLabelText(/nombre comercial/i) as HTMLInputElement;
    const inputTipo   = screen.getByLabelText(/tipo de vacuna/i)   as HTMLInputElement;

    expect(inputNombre.value).toBe('Comirnaty');
    expect(inputTipo.value).toBe('ARNm');
  });

  it('debe dejar descripcionGeneral vacía al abrir en modo edición', () => {
    render(<VacunaModal {...baseProps} vacunaToEdit={mockVacunaToEdit} />);

    const textarea = screen.getByLabelText(/descripción general/i) as HTMLTextAreaElement;
    expect(textarea.value).toBe('');
  });

  it('debe dejar todos los campos vacíos al abrir en modo creación', () => {
    render(<VacunaModal {...baseProps} />);

    expect((screen.getByLabelText(/id de la vacuna/i)    as HTMLInputElement).value).toBe('');
    expect((screen.getByLabelText(/nombre comercial/i)   as HTMLInputElement).value).toBe('');
    expect((screen.getByLabelText(/tipo de vacuna/i)     as HTMLInputElement).value).toBe('');
    expect((screen.getByLabelText(/descripción general/i) as HTMLTextAreaElement).value).toBe('');
  });

  // ─── VALIDACIÓN Y BOTÓN SUBMIT ────────────────────────────────────────────

  it('debe tener el botón deshabilitado si todos los campos están vacíos en modo creación', () => {
    render(<VacunaModal {...baseProps} />);
    const btn = screen.getByRole('button', { name: /crear vacuna/i }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it('debe mantener el botón deshabilitado si solo nombre está lleno (falta tipo e id)', () => {
    render(<VacunaModal {...baseProps} />);
    fireEvent.change(screen.getByLabelText(/nombre comercial/i), { target: { value: 'Comirnaty' } });
    const btn = screen.getByRole('button', { name: /crear vacuna/i }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it('debe mantener el botón deshabilitado si nombre y tipo están llenos pero falta idManual en creación', () => {
    render(<VacunaModal {...baseProps} />);
    fireEvent.change(screen.getByLabelText(/nombre comercial/i), { target: { value: 'Comirnaty' } });
    fireEvent.change(screen.getByLabelText(/tipo de vacuna/i),   { target: { value: 'ARNm' } });
    const btn = screen.getByRole('button', { name: /crear vacuna/i }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it('debe habilitar el botón cuando id, nombre y tipo están llenos en modo creación', () => {
    render(<VacunaModal {...baseProps} />);
    fireEvent.change(screen.getByLabelText(/id de la vacuna/i),  { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/nombre comercial/i), { target: { value: 'Comirnaty' } });
    fireEvent.change(screen.getByLabelText(/tipo de vacuna/i),   { target: { value: 'ARNm' } });
    const btn = screen.getByRole('button', { name: /crear vacuna/i }) as HTMLButtonElement;
    expect(btn.disabled).toBe(false);
  });

  it('debe tener el botón deshabilitado si nombre está vacío en modo edición', () => {
    render(<VacunaModal {...baseProps} vacunaToEdit={mockVacunaToEdit} />);
    // Borramos el nombre pre-llenado
    fireEvent.change(screen.getByLabelText(/nombre comercial/i), { target: { value: '' } });
    const btn = screen.getByRole('button', { name: /guardar/i }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it('debe habilitar el botón con solo nombre y tipo en modo edición (sin idManual)', () => {
    render(<VacunaModal {...baseProps} vacunaToEdit={mockVacunaToEdit} />);
    // nombre y tipo ya vienen pre-llenados
    const btn = screen.getByRole('button', { name: /guardar/i }) as HTMLButtonElement;
    expect(btn.disabled).toBe(false);
  });

  // ─── PAYLOAD DE onSubmit ──────────────────────────────────────────────────

  it('debe llamar onSubmit con idManual como número y el DTO correcto en modo creación', () => {
    const mockOnSubmit = vi.fn();
    render(<VacunaModal {...baseProps} onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/id de la vacuna/i),    { target: { value: '7' } });
    fireEvent.change(screen.getByLabelText(/nombre comercial/i),   { target: { value: 'Comirnaty' } });
    fireEvent.change(screen.getByLabelText(/tipo de vacuna/i),     { target: { value: 'ARNm' } });
    fireEvent.change(screen.getByLabelText(/descripción general/i),{ target: { value: 'Vacuna contra COVID-19.' } });

    fireEvent.click(screen.getByRole('button', { name: /crear vacuna/i }));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(
      7,
      {
        idFarmaco:        mockFarmaco.id,
        farmaceutica:     mockFarmaco.nombre,
        nombre:           'Comirnaty',
        tipo:             'ARNm',
        descripcionGeneral: 'Vacuna contra COVID-19.',
      } satisfies CrearVacunaDTO
    );
  });

  it('debe llamar onSubmit con undefined como primer argumento en modo edición', () => {
    const mockOnSubmit = vi.fn();
    render(<VacunaModal {...baseProps} onSubmit={mockOnSubmit} vacunaToEdit={mockVacunaToEdit} />);

    fireEvent.click(screen.getByRole('button', { name: /guardar/i }));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        idFarmaco:    mockFarmaco.id,
        farmaceutica: mockFarmaco.nombre,
        nombre:       'Comirnaty',
        tipo:         'ARNm',
      })
    );
  });

  it('debe incluir descripcionGeneral vacía en el DTO al editar (no se pre-llena)', () => {
    const mockOnSubmit = vi.fn();
    render(<VacunaModal {...baseProps} onSubmit={mockOnSubmit} vacunaToEdit={mockVacunaToEdit} />);

    fireEvent.click(screen.getByRole('button', { name: /guardar/i }));

    const dto: CrearVacunaDTO = mockOnSubmit.mock.calls[0][1];
    expect(dto.descripcionGeneral).toBe('');
  });

  it('no debe llamar onSubmit al hacer submit con campos vacíos en modo creación', () => {
    const mockOnSubmit = vi.fn();
    render(<VacunaModal {...baseProps} onSubmit={mockOnSubmit} />);

    const form = screen.getByTestId('mock-modal').querySelector('form') as HTMLFormElement;
    fireEvent.submit(form);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  // ─── ESTADO DE CARGA ──────────────────────────────────────────────────────

  it('debe deshabilitar todos los campos y botones cuando isLoading es true', () => {
    render(<VacunaModal {...baseProps} isLoading={true} />);

    expect((screen.getByLabelText(/id de la vacuna/i)     as HTMLInputElement).disabled).toBe(true);
    expect((screen.getByLabelText(/nombre comercial/i)    as HTMLInputElement).disabled).toBe(true);
    expect((screen.getByLabelText(/tipo de vacuna/i)      as HTMLInputElement).disabled).toBe(true);
    expect((screen.getByLabelText(/descripción general/i) as HTMLTextAreaElement).disabled).toBe(true);
    expect((screen.getByRole('button', { name: /cancelar/i }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('debe mostrar "Guardando..." en el botón submit cuando isLoading es true', () => {
    render(<VacunaModal {...baseProps} isLoading={true} />);
    expect(screen.getByRole('button', { name: /guardando/i })).toBeDefined();
  });

  // ─── BOTÓN CANCELAR ───────────────────────────────────────────────────────

  it('debe ejecutar onClose al hacer clic en Cancelar', () => {
    const mockOnClose = vi.fn();
    render(<VacunaModal {...baseProps} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(baseProps.onSubmit).not.toHaveBeenCalled();
  });
});