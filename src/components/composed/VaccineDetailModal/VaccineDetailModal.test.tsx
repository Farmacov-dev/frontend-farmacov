// src/components/composed/VaccineDetailModal/VaccineDetailModal.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import VaccineDetailModal from './VaccineDetailModal';
import type { VacunaDetalle, EfectoSecundario } from '../../../services/vacunas/getVacunaDetalle';

// ─── MOCKS ──────────────────────────────────────────────────────────────────

vi.mock('../ModalContainer/ModalContainer', () => ({
  default: ({ children, isOpen }: any) =>
    isOpen ? <div data-testid="mock-modal">{children}</div> : null,
}));

vi.mock('../../EmptyState/EmptyState', () => ({
  default: ({ title }: any) => (
    <div data-testid="empty-state">{title}</div>
  ),
}));

vi.mock('../../primary/VaccineDetailHeader/VaccineDetailHeader', () => ({
  default: ({ nombre, farmaceutica }: any) => (
    <div data-testid="vaccine-header" data-nombre={nombre} data-farmaceutica={farmaceutica} />
  ),
}));

vi.mock('../../primary/VaccineDescription/VaccineDescription', () => ({
  default: ({ descripcion, compact }: any) => (
    <div
      data-testid="vaccine-description"
      data-descripcion={descripcion}
      data-compact={String(compact)}
    />
  ),
}));

vi.mock('../../primary/MedicalSpecsSection/MedicalSpecsSection', () => ({
  default: ({ tipo, temperatura, tiempoAmbiente, costoUnitario }: any) => (
    <div
      data-testid="medical-specs"
      data-tipo={tipo}
      data-temperatura={temperatura}
      data-tiempo={tiempoAmbiente ?? 'null'}
      data-costo={costoUnitario}
    />
  ),
}));

vi.mock('../../primary/SideEffectsPanel/SideEffectsPanel', () => ({
  default: ({ efectos }: any) => (
    <div data-testid="side-effects" data-efectos={JSON.stringify(efectos)} />
  ),
}));

// ─── DATOS DE PRUEBA ────────────────────────────────────────────────────────

const mockVacuna: VacunaDetalle = {
  id: 1,
  nombre: 'Pfizer-BioNTech',
  farmaceutica: 'Pfizer',
  descripcionGeneral: 'Vacuna de ARNm contra el COVID-19.',
  tipo: 'ARNm',
  temperatura: -70,
  tiempoAmbiente: 2,
  costoUnitario: 299.99,
  efectosSecundarios: [
    { descripcion: 'Dolor en zona de inyección', severidad: 'leve' },
    { descripcion: 'Fatiga leve', severidad: 'leve' },
  ],
};

const baseProps = {
  isOpen: true,
  onClose: vi.fn(),
};

// ─── SUITE ──────────────────────────────────────────────────────────────────

describe('Componente: VaccineDetailModal', () => {

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // ─── VISIBILIDAD ─────────────────────────────────────────────────────────

  it('no debe renderizar nada si isOpen es false', () => {
    render(<VaccineDetailModal {...baseProps} isOpen={false} vacuna={null} />);
    expect(screen.queryByTestId('mock-modal')).toBeNull();
  });

  it('debe renderizar el modal cuando isOpen es true', () => {
    render(<VaccineDetailModal {...baseProps} vacuna={null} isPending={true} />);
    expect(screen.getByTestId('mock-modal')).toBeDefined();
  });

  // ─── ESTADO DE CARGA ─────────────────────────────────────────────────────

  it('debe mostrar el mensaje de carga cuando isPending es true', () => {
    render(<VaccineDetailModal {...baseProps} vacuna={null} isPending={true} />);
    expect(screen.getByText('Cargando información...')).toBeDefined();
  });

  it('no debe mostrar EmptyState ni contenido mientras isPending es true', () => {
    render(<VaccineDetailModal {...baseProps} vacuna={null} isPending={true} />);
    expect(screen.queryByTestId('empty-state')).toBeNull();
    expect(screen.queryByTestId('vaccine-header')).toBeNull();
  });

  it('no debe mostrar carga si hay vacuna pero isPending es true (isPending tiene prioridad)', () => {
    render(<VaccineDetailModal {...baseProps} vacuna={mockVacuna} isPending={true} />);
    expect(screen.getByText('Cargando información...')).toBeDefined();
    expect(screen.queryByTestId('vaccine-header')).toBeNull();
  });

  // ─── ESTADO VACÍO ────────────────────────────────────────────────────────

  it('debe mostrar EmptyState cuando vacuna es null y no está cargando', () => {
    render(<VaccineDetailModal {...baseProps} vacuna={null} isPending={false} />);
    expect(screen.getByTestId('empty-state')).toBeDefined();
  });

  it('debe mostrar el mensaje correcto en el EmptyState', () => {
    render(<VaccineDetailModal {...baseProps} vacuna={null} isPending={false} />);
    expect(screen.getByText('No hay información para mostrar sobre esta vacuna')).toBeDefined();
  });

  it('debe mostrar EmptyState con isPending en su valor por defecto (false)', () => {
    render(<VaccineDetailModal {...baseProps} vacuna={null} />);
    expect(screen.getByTestId('empty-state')).toBeDefined();
    expect(screen.queryByText('Cargando información...')).toBeNull();
  });

  // ─── CONTENIDO COMPLETO ──────────────────────────────────────────────────

  it('debe renderizar los 4 sub-componentes cuando hay vacuna y no está cargando', () => {
    render(<VaccineDetailModal {...baseProps} vacuna={mockVacuna} />);

    expect(screen.getByTestId('vaccine-header')).toBeDefined();
    expect(screen.getByTestId('vaccine-description')).toBeDefined();
    expect(screen.getByTestId('medical-specs')).toBeDefined();
    expect(screen.getByTestId('side-effects')).toBeDefined();
  });

  it('no debe mostrar el EmptyState cuando hay datos de vacuna', () => {
    render(<VaccineDetailModal {...baseProps} vacuna={mockVacuna} />);
    expect(screen.queryByTestId('empty-state')).toBeNull();
  });

  // ─── PROPS DE VaccineDetailHeader ────────────────────────────────────────

  it('debe pasar nombre y farmaceutica correctos a VaccineDetailHeader', () => {
    render(<VaccineDetailModal {...baseProps} vacuna={mockVacuna} />);

    const header = screen.getByTestId('vaccine-header');
    expect(header.dataset.nombre).toBe('Pfizer-BioNTech');
    expect(header.dataset.farmaceutica).toBe('Pfizer');
  });

  // ─── PROPS DE VaccineDescription ─────────────────────────────────────────

  it('debe pasar descripcion y compact=true a VaccineDescription', () => {
    render(<VaccineDetailModal {...baseProps} vacuna={mockVacuna} />);

    const desc = screen.getByTestId('vaccine-description');
    expect(desc.dataset.descripcion).toBe('Vacuna de ARNm contra el COVID-19.');
    expect(desc.dataset.compact).toBe('true');
  });

  // ─── PROPS DE MedicalSpecsSection ────────────────────────────────────────

  it('debe pasar tipo, temperatura, tiempoAmbiente y costoUnitario a MedicalSpecsSection', () => {
    render(<VaccineDetailModal {...baseProps} vacuna={mockVacuna} />);

    const specs = screen.getByTestId('medical-specs');
    expect(specs.dataset.tipo).toBe('ARNm');
    expect(specs.dataset.temperatura).toBe('-70');
    expect(specs.dataset.tiempo).toBe('2');
    expect(specs.dataset.costo).toBe('299.99');
  });

  it('debe pasar tiempoAmbiente como null cuando la vacuna no lo tiene', () => {
    const vacunaSinTiempo: VacunaDetalle = { ...mockVacuna, tiempoAmbiente: null };
    render(<VaccineDetailModal {...baseProps} vacuna={vacunaSinTiempo} />);

    const specs = screen.getByTestId('medical-specs');
    expect(specs.dataset.tiempo).toBe('null');
  });

  // ─── PROPS DE SideEffectsPanel ────────────────────────────────────────────

  it('debe pasar el array de efectosSecundarios a SideEffectsPanel', () => {
    render(<VaccineDetailModal {...baseProps} vacuna={mockVacuna} />);

    const efectos: EfectoSecundario[] = JSON.parse(
      screen.getByTestId('side-effects').dataset.efectos ?? '[]'
    );
    expect(efectos).toEqual([
      { descripcion: 'Dolor en zona de inyección', severidad: 'leve' },
      { descripcion: 'Fatiga leve', severidad: 'leve' },
    ]);
  });

  it('debe pasar un array vacío a SideEffectsPanel si no hay efectos', () => {
    const vacunaSinEfectos: VacunaDetalle = { ...mockVacuna, efectosSecundarios: [] };
    render(<VaccineDetailModal {...baseProps} vacuna={vacunaSinEfectos} />);

    const efectos: EfectoSecundario[] = JSON.parse(
      screen.getByTestId('side-effects').dataset.efectos ?? '[]'
    );
    expect(efectos).toEqual([]);
  });
});