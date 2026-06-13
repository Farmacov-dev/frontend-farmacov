// src/components/composed/PermisosTable/PermisosTable.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PermisosTable } from './PermisosTable';

const meta = {
  title: 'Components/Composed/PermisosTable',
  component: PermisosTable,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-slate-50 min-h-[300px] flex justify-center">
        <div className="w-full max-w-[800px]">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof PermisosTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper interactivo
const PermisosWrapper = (args: any) => {
  // Tomamos la propiedad nativa 'args.permisos' para inicializar el estado
  const [permisosState, setPermisosState] = useState<Record<string, boolean>>(args.permisos || {});

  const handleToggle = (moduloId: string) => {
    setPermisosState((prev) => ({
      ...prev,
      [moduloId]: !prev[moduloId],
    }));
  };

  return (
    <PermisosTable 
      permisos={permisosState} 
      onTogglePermiso={handleToggle} 
    />
  );
};

export const EstadoPorDefecto: Story = {
  args: {
    // Usamos el nombre exacto de la prop: 'permisos'
    permisos: {
      dashboard: true,
      analisis: false,
      catalogo: false,
    },
    onTogglePermiso: () => {}, // Función vacía para cumplir la interfaz
  },
  render: (args) => <PermisosWrapper {...args} />,
};

export const TodoDenegado: Story = {
  args: {
    permisos: {}, 
    onTogglePermiso: () => {},
  },
  render: (args) => <PermisosWrapper {...args} />,
};

export const SuperAdmin: Story = {
  args: {
    permisos: {
      dashboard: true,
      analisis: true,
      catalogo: true,
    },
    onTogglePermiso: () => {},
  },
  render: (args) => <PermisosWrapper {...args} />,
};