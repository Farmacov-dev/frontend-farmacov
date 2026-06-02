// src/components/primary/VaccineCheckboxSelector/VaccineCheckboxSelector.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import VaccineCheckboxSelector, { type VacunaOption } from './VaccineCheckboxSelector';

const meta = {
  title: 'Components/Primary/VaccineCheckboxSelector',
  component: VaccineCheckboxSelector,
  tags: ['autodocs'],
} satisfies Meta<typeof VaccineCheckboxSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

// Catálogo de prueba basado en datos reales
const mockVacunas: VacunaOption[] = [
  { id: 1, nombre: 'Comirnaty (Pfizer)' },
  { id: 2, nombre: 'Spikevax (Moderna)' },
  { id: 3, nombre: 'Vaxzevria (AstraZeneca)' },
  { id: 4, nombre: 'Jcovden (Janssen)' },
  { id: 5, nombre: 'Nuvaxovid (Novavax)' },
  { id: 6, nombre: 'Valneva' },
];

// Wrapper para manejar el estado local en Storybook
const WrapperInteractivo = (args: any) => {
  const [seleccionadas, setSeleccionadas] = useState<number[]>(args.seleccionadas || []);
  return (
    <VaccineCheckboxSelector
      {...args}
      seleccionadas={seleccionadas}
      onChange={(ids) => {
        setSeleccionadas(ids);
        if (args.onChange) args.onChange(ids);
      }}
    />
  );
};

export const Interactivo: Story = {
  args: {
    vacunas: mockVacunas,
    seleccionadas: [1, 2], // Empezamos con Pfizer y Moderna pre-seleccionadas
    maxSeleccion: 3,
    onChange: () => {},
  },
  render: (args) => <WrapperInteractivo {...args} />,
};

export const MaximoAlcanzado: Story = {
  args: {
    vacunas: mockVacunas,
    seleccionadas: [1, 3, 5],
    maxSeleccion: 3,
    onChange: () => {},
  },
  render: (args) => <WrapperInteractivo {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Muestra cómo se bloquean visualmente las opciones restantes al alcanzar el límite (maxSeleccion).',
      },
    },
  },
};

export const EstadoVacio: Story = {
  args: {
    vacunas: mockVacunas,
    seleccionadas: [],
    maxSeleccion: 5,
    onChange: () => {},
  },
  render: (args) => <WrapperInteractivo {...args} />,
};