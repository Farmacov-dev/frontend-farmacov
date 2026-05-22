// src/components/composed/PermisosTable/PermisosTable.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PermisosTable } from "./PermisosTable";

const meta: Meta<typeof PermisosTable> = {
  title: "Composed/PermisosTable",
  component: PermisosTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PermisosTable>;

export const Predeterminado: Story = {
  args: {
    permisos: {
      dashboard: true,
      analisis: false,
      catalogo: true,
    },
    onTogglePermiso: () => {}, // Función vacía para las vistas estáticas
  },
};

export const TodosInactivos: Story = {
  args: {
    permisos: {},
    onTogglePermiso: () => {},
  },
};

export const TodosActivos: Story = {
  args: {
    permisos: {
      dashboard: true,
      analisis: true,
      catalogo: true,
    },
    onTogglePermiso: () => {},
  },
};

export const Interactivo: Story = {
  render: () => {
    // Simulamos el estado que viviría en la pantalla principal (Page)
    const [permisos, setPermisos] = useState<Record<string, boolean>>({
      dashboard: true,
      analisis: false,
      catalogo: false,
    });

    const handleToggle = (moduloId: string) => {
      setPermisos((prev) => ({
        ...prev,
        [moduloId]: !prev[moduloId],
      }));
    };

    return (
      <PermisosTable 
        permisos={permisos} 
        onTogglePermiso={handleToggle} 
      />
    );
  },
};