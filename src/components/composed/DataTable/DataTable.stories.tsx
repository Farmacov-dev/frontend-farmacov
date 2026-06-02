// src/components/composed/DataTable/DataTable.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, type Column } from './DataTable';

interface MockUser {
  id: number;
  nombre: string;
  rol: string;
  estado: 'Activo' | 'Inactivo';
}

const MockDataTable = (props: {
  data: MockUser[];
  columns: Column<MockUser>[];
  onEdit?: (row: MockUser) => void;
  onDelete?: (row: MockUser) => void;
  onRowClick?: (row: MockUser) => void;
}) => <DataTable<MockUser> {...props} />;

const mockData: MockUser[] = [
  { id: 1, nombre: 'Caro Lopez', rol: 'Administrador', estado: 'Activo' },
  { id: 2, nombre: 'Artemio Urbina', rol: 'Finanzas', estado: 'Inactivo' },
  { id: 3, nombre: 'María Rodríguez', rol: 'Logistica', estado: 'Activo' },
];

const mockColumns: Column<MockUser>[] = [
  { 
    header: 'Nombre del usuario', 
    accessor: (row) => row.nombre, 
    widthClass: 'flex-[2]' 
  },
  { 
    header: 'Rol asignado', 
    accessor: (row) => row.rol, 
    widthClass: 'flex-1' 
  },
  { 
    header: 'Estado', 
    accessor: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        row.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {row.estado}
      </span>
    ), 
    widthClass: 'w-[100px]' 
  },
];

const meta = {
  title: 'Components/Composed/DataTable',
  component: MockDataTable, 
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-slate-50 min-h-[300px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MockDataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// historias

export const SoloLectura: Story = {
  args: {
    data: mockData,
    columns: mockColumns,
  },
};

export const ConAcciones: Story = {
  args: {
    data: mockData,
    columns: mockColumns,
    onEdit: (row) => alert(`Editando a: ${row.nombre}`),
    onDelete: (row) => alert(`Borrando a: ${row.nombre}`),
  },
};

export const Navegable: Story = {
  args: {
    data: mockData,
    columns: mockColumns,
    onRowClick: (row) => alert(`Navegando al detalle de: ${row.nombre}`),
  },
};

export const TodasLasAcciones: Story = {
  args: {
    data: mockData,
    columns: mockColumns,
    onEdit: () => {},
    onDelete: () => {},
    onRowClick: () => {},
  },
};

export const EstadoVacio: Story = {
  args: {
    data: [],
    columns: mockColumns,
  },
};