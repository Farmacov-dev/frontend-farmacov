// src/components/composed/Tabs/Tabs.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import Tabs, { type TabItem } from './Tabs';

// ─── DATOS DE PRUEBA ────────────────────────────────────────────────────────

const mockTabs: TabItem[] = [
  { id: 'costos',     label: 'Costos'     },
  { id: 'condiciones', label: 'Condiciones' },
  { id: 'lotes',      label: 'Lotes'      },
];

describe('Componente: Tabs', () => {

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  // ─── ESTRUCTURA Y ACCESIBILIDAD ──────────────────────────────────────────

  it('debe renderizar el contenedor con role="tablist" y su aria-label', () => {
    render(<Tabs tabs={mockTabs} activeTab="costos" onTabChange={vi.fn()} />);

    const tablist = screen.getByRole('tablist', { name: /navegación de secciones/i });
    expect(tablist).toBeDefined();
  });

  it('debe renderizar un botón por cada tab del array', () => {
    render(<Tabs tabs={mockTabs} activeTab="costos" onTabChange={vi.fn()} />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
  });

  it('debe renderizar el label de cada tab correctamente', () => {
    render(<Tabs tabs={mockTabs} activeTab="costos" onTabChange={vi.fn()} />);

    expect(screen.getByRole('tab', { name: /costos/i })).toBeDefined();
    expect(screen.getByRole('tab', { name: /condiciones/i })).toBeDefined();
    expect(screen.getByRole('tab', { name: /lotes/i })).toBeDefined();
  });

  it('debe renderizar el tablist vacío sin errores si no se pasan tabs', () => {
    render(<Tabs tabs={[]} activeTab="" onTabChange={vi.fn()} />);

    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeDefined();
    expect(screen.queryAllByRole('tab')).toHaveLength(0);
  });

  // ─── ARIA: TAB ACTIVO ────────────────────────────────────────────────────

  it('debe marcar el tab activo con aria-selected="true"', () => {
    render(<Tabs tabs={mockTabs} activeTab="condiciones" onTabChange={vi.fn()} />);

    const tabActivo = screen.getByRole('tab', { name: /condiciones/i });
    expect(tabActivo.getAttribute('aria-selected')).toBe('true');
  });

  it('debe marcar los tabs inactivos con aria-selected="false"', () => {
    render(<Tabs tabs={mockTabs} activeTab="costos" onTabChange={vi.fn()} />);

    const tabInactivo1 = screen.getByRole('tab', { name: /condiciones/i });
    const tabInactivo2 = screen.getByRole('tab', { name: /lotes/i });

    expect(tabInactivo1.getAttribute('aria-selected')).toBe('false');
    expect(tabInactivo2.getAttribute('aria-selected')).toBe('false');
  });

  it('debe haber exactamente un tab con aria-selected="true"', () => {
    render(<Tabs tabs={mockTabs} activeTab="lotes" onTabChange={vi.fn()} />);

    const tabsSeleccionados = screen
      .getAllByRole('tab')
      .filter(tab => tab.getAttribute('aria-selected') === 'true');

    expect(tabsSeleccionados).toHaveLength(1);
  });

  // ─── ARIA: aria-controls ─────────────────────────────────────────────────

  it('debe asignar aria-controls="panel-{id}" a cada tab', () => {
    render(<Tabs tabs={mockTabs} activeTab="costos" onTabChange={vi.fn()} />);

    expect(screen.getByRole('tab', { name: /costos/i })
      .getAttribute('aria-controls')).toBe('panel-costos');

    expect(screen.getByRole('tab', { name: /condiciones/i })
      .getAttribute('aria-controls')).toBe('panel-condiciones');

    expect(screen.getByRole('tab', { name: /lotes/i })
      .getAttribute('aria-controls')).toBe('panel-lotes');
  });

  // ─── INTERACCIÓN ─────────────────────────────────────────────────────────

  it('debe llamar onTabChange con el id correcto al hacer clic en un tab', () => {
    const handleTabChange = vi.fn();
    render(<Tabs tabs={mockTabs} activeTab="costos" onTabChange={handleTabChange} />);

    fireEvent.click(screen.getByRole('tab', { name: /condiciones/i }));

    expect(handleTabChange).toHaveBeenCalledTimes(1);
    expect(handleTabChange).toHaveBeenCalledWith('condiciones');
  });

  it('debe llamar onTabChange con el id correcto al hacer clic en el primer tab', () => {
    const handleTabChange = vi.fn();
    render(<Tabs tabs={mockTabs} activeTab="lotes" onTabChange={handleTabChange} />);

    fireEvent.click(screen.getByRole('tab', { name: /costos/i }));

    expect(handleTabChange).toHaveBeenCalledWith('costos');
  });

  it('debe llamar onTabChange incluso al hacer clic en el tab ya activo', () => {
    const handleTabChange = vi.fn();
    render(<Tabs tabs={mockTabs} activeTab="costos" onTabChange={handleTabChange} />);

    fireEvent.click(screen.getByRole('tab', { name: /costos/i }));

    expect(handleTabChange).toHaveBeenCalledTimes(1);
    expect(handleTabChange).toHaveBeenCalledWith('costos');
  });

  it('debe llamar onTabChange una vez por clic, sin llamadas extra', () => {
    const handleTabChange = vi.fn();
    render(<Tabs tabs={mockTabs} activeTab="costos" onTabChange={handleTabChange} />);

    fireEvent.click(screen.getByRole('tab', { name: /lotes/i }));
    fireEvent.click(screen.getByRole('tab', { name: /condiciones/i }));

    expect(handleTabChange).toHaveBeenCalledTimes(2);
  });

  // ─── CAMBIO DE PROP ACTIVA ───────────────────────────────────────────────

  it('debe reflejar el cambio de activeTab cuando la prop se actualiza', () => {
    const { rerender } = render(
      <Tabs tabs={mockTabs} activeTab="costos" onTabChange={vi.fn()} />
    );

    expect(screen.getByRole('tab', { name: /costos/i })
      .getAttribute('aria-selected')).toBe('true');

    rerender(<Tabs tabs={mockTabs} activeTab="lotes" onTabChange={vi.fn()} />);

    expect(screen.getByRole('tab', { name: /costos/i })
      .getAttribute('aria-selected')).toBe('false');
    expect(screen.getByRole('tab', { name: /lotes/i })
      .getAttribute('aria-selected')).toBe('true');
  });
});