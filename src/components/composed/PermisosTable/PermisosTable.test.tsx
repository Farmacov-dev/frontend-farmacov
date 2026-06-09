// src/components/composed/PermisosTable/PermisosTable.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { PermisosTable } from './PermisosTable';

describe('Componente: PermisosTable', () => {

  const mockOnToggle = vi.fn();

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar la tabla semántica con sus cabeceras correctamente', () => {
    render(<PermisosTable permisos={{}} onTogglePermiso={mockOnToggle} />);

    // Verificamos el contenedor principal de la tabla
    expect(screen.getByRole('table', { name: /tabla de permisos de usuario/i })).toBeDefined();

    // Verificamos las cabeceras semánticas
    expect(screen.getByRole('columnheader', { name: /módulo/i })).toBeDefined();
    expect(screen.getByRole('columnheader', { name: /acceso/i })).toBeDefined();
  });

  it('debe renderizar todas las filas de los módulos disponibles', () => {
    render(<PermisosTable permisos={{}} onTogglePermiso={mockOnToggle} />);

    // Validamos que los nombres de los 3 módulos hardcodeados existan en el DOM
    expect(screen.getByText('Dashboard')).toBeDefined();
    expect(screen.getByText('Análisis de Síntomas')).toBeDefined();
    expect(screen.getByText('Catálogo de Vacunas')).toBeDefined();
    
    // Contamos que existan 3 interruptores (switches) correspondientes a cada fila
    const switches = screen.getAllByRole('switch');
    expect(switches).toHaveLength(3);
  });

  it('debe leer el diccionario de permisos y asignar el estado correcto a cada Toggle', () => {
    // Simulamos que el usuario tiene acceso al dashboard, no al análisis, 
    // y dejamos el catálogo indefinido para probar el fallback a "false"
    const permisosSimulados = {
      dashboard: true,
      analisis: false,
    };

    render(<PermisosTable permisos={permisosSimulados} onTogglePermiso={mockOnToggle} />);

    // Obtenemos cada switch por su etiqueta ARIA dinámica
    const switchDashboard = screen.getByRole('switch', { name: /alternar acceso al módulo dashboard/i });
    const switchAnalisis = screen.getByRole('switch', { name: /alternar acceso al módulo análisis de síntomas/i });
    const switchCatalogo = screen.getByRole('switch', { name: /alternar acceso al módulo catálogo de vacunas/i });

    // Verificamos la lectura correcta de estados
    expect(switchDashboard.getAttribute('aria-checked')).toBe('true');
    expect(switchAnalisis.getAttribute('aria-checked')).toBe('false');
    
    // Verificamos que la rama de fallback "|| false" funcione correctamente
    expect(switchCatalogo.getAttribute('aria-checked')).toBe('false');
  });

  it('debe ejecutar onTogglePermiso devolviendo el id del módulo al hacer clic', () => {
    render(<PermisosTable permisos={{}} onTogglePermiso={mockOnToggle} />);

    // Hacemos clic en el switch del catálogo
    const switchCatalogo = screen.getByRole('switch', { name: /alternar acceso al módulo catálogo de vacunas/i });
    fireEvent.click(switchCatalogo);

    // Debe devolver el string 'catalogo' que es el id que el backend espera
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith('catalogo');
  });
});