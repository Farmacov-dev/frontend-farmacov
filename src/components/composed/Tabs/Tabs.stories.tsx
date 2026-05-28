// src/components/composed/Tabs/Tabs.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Tabs from './Tabs';

const meta = {
  title: 'Components/Composed/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-white w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const TabsWrapper = (args: any) => {
  const [activeTab, setActiveTab] = useState(args.activeTab || 'tab1');

  return (
    <div className="flex flex-col gap-6">
      <Tabs 
        {...args} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      {/* Contenido simulado para que se entienda la acción en Storybook */}
      <div className="p-4 bg-surface rounded-card border border-stroke min-h-[150px]">
        <p className="text-muted font-inter">
          Contenido de la pestaña seleccionada: <strong className="text-primary">{activeTab}</strong>
        </p>
      </div>
    </div>
  );
};

export const Interactivo: Story = {
  args: {
    tabs: [
      { id: 'tab1', label: 'Datos Generales' },
      { id: 'tab2', label: 'Permisos de Acceso' },
      { id: 'tab3', label: 'Historial de Actividad' },
    ],
    activeTab: 'tab1', // Pestaña inicial
    onTabChange: () => {}, 
  },
  render: (args) => <TabsWrapper {...args} />,
};