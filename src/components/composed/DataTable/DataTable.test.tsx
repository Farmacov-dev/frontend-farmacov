// src/components/composed/DataTable/DataTable.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { DataTable, type Column } from './DataTable';

// Mockeamos los iconos para evitar ensuciar el DOM de las pruebas
vi.mock('lucide-react', () => ({
  Pencil: () => <svg data-testid="icon-pencil" />,
  Trash2: () => <svg data-testid="icon-trash" />,
  ChevronRight: () => <svg data-testid="icon-chevron" />
}));

// Definimos datos de prueba tipados
interface TestUser {
  id: number;
  nombre: string;
  departamento: string;
}

const mockData: TestUser[] = [
  { id: 1, nombre: 'Ana García', departamento: 'Cardiología' },
  { id: 2, nombre: 'Luis Pérez', departamento: 'Pediatría' },
];

const mockColumns: Column<TestUser>[] = [
  { header: 'Nombre', accessor: (row) => row.nombre },
  { header: 'Depto', accessor: (row) => row.departamento },
];

describe('Componente: DataTable', () => {

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar el estado vacío cuando no hay datos', () => {
    render(<DataTable data={[]} columns={mockColumns} />);
    
    expect(screen.getByRole('table', { name: /tabla de datos/i })).toBeDefined();
    
    // Verificamos que se renderice el mensaje de estado vacío
    const celdaVacia = screen.getByRole('cell', { name: /no hay registros disponibles/i });
    expect(celdaVacia).toBeDefined();
  });

  it('debe renderizar las cabeceras y las filas correctamente sin la columna de acciones', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    // Verificamos que las cabeceras principales existan
    expect(screen.getByRole('columnheader', { name: /nombre/i })).toBeDefined();
    expect(screen.getByRole('columnheader', { name: /depto/i })).toBeDefined();
    
    // Al no pasar onEdit, onDelete ni onRowClick, la columna "Acciones" no debe existir
    expect(screen.queryByRole('columnheader', { name: /acciones/i })).toBeNull();

    // Validamos que los datos se rendericen evaluando los accessors
    expect(screen.getByText('Ana García')).toBeDefined();
    expect(screen.getByText('Cardiología')).toBeDefined();
    expect(screen.getByText('Luis Pérez')).toBeDefined();
  });

  it('debe renderizar la columna de acciones y sus botones si se pasan las funciones', () => {
    render(
      <DataTable 
        data={[mockData[0]]} 
        columns={mockColumns} 
        onEdit={vi.fn()} 
        onDelete={vi.fn()} 
      />
    );

    // Ahora sí debe existir la cabecera de acciones
    expect(screen.getByRole('columnheader', { name: /acciones/i })).toBeDefined();

    // Verificamos que existan los botones usando sus aria-labels
    expect(screen.getByRole('button', { name: /editar registro/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /eliminar registro/i })).toBeDefined();
  });

  it('debe ejecutar onRowClick al hacer clic en una fila', () => {
    const handleRowClick = vi.fn();
    render(
      <DataTable 
        data={mockData} 
        columns={mockColumns} 
        onRowClick={handleRowClick} 
      />
    );

    // Obtenemos todas las filas (role="row"). 
    // La primera suele ser la cabecera, así que interactuamos con la de "Ana García"
    const celdaAna = screen.getByText('Ana García');
    const filaAna = celdaAna.closest('div[role="row"]') as HTMLElement;
    
    fireEvent.click(filaAna);

    expect(handleRowClick).toHaveBeenCalledTimes(1);
    expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it('debe ejecutar onEdit/onDelete y detener la propagación para no disparar onRowClick', () => {
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();
    const handleRowClick = vi.fn();

    render(
      <DataTable 
        data={[mockData[0]]} 
        columns={mockColumns} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        onRowClick={handleRowClick}
      />
    );

    const btnEditar = screen.getByRole('button', { name: /editar registro/i });
    const btnEliminar = screen.getByRole('button', { name: /eliminar registro/i });

    // Hacemos clic en Editar
    fireEvent.click(btnEditar);
    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleEdit).toHaveBeenCalledWith(mockData[0]);
    // El onRowClick NO debió dispararse
    expect(handleRowClick).not.toHaveBeenCalled();

    // Hacemos clic en Eliminar
    fireEvent.click(btnEliminar);
    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(mockData[0]);
    // El onRowClick sigue sin dispararse
    expect(handleRowClick).not.toHaveBeenCalled();
  });
});