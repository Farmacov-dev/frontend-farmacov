// src/components/primary/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'Components/Primary/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline', 'ghost', 'sidebar', 'floating', 'inverse'],
      description: 'Variante visual del botón',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado de deshabilitado',
    },
    children: {
      control: 'text',
      description: 'Texto del botón',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// historias 

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Guardar Cambios',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Cancelar Operación',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Solo Texto',
  },
};

export const Sidebar: Story = {
  args: {
    variant: 'sidebar',
    children: 'Dashboard Principal',
  },
  decorators: [
    (Story) => (
      <div className="w-[250px] bg-white p-4">
        <Story />
      </div>
    ),
  ],
};

export const Floating: Story = {
  args: {
    variant: 'floating',
    children: 'Filtros Avanzados',
  },
};

export const Inverse: Story = {
  args: {
    variant: 'inverse',
    children: 'Acción Secundaria',
  },
  decorators: [
    (Story) => (
      <div className="bg-primary p-6 rounded-card">
        <Story />
      </div>
    ),
  ],
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: 'Exportar CSV',
    icon: 'https://cdn-icons-png.flaticon.com/512/109/109612.png',
    iconAlt: 'Icono de descarga',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Botón Deshabilitado',
  },
};