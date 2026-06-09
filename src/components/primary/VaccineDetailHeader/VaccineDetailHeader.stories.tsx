import type { Meta, StoryObj } from '@storybook/react';
import VaccineDetailHeader from './VaccineDetailHeader';

// Configuración general del componente en Storybook
const meta: Meta<typeof VaccineDetailHeader> = {
  title: 'Primary/VaccineDetailHeader', 
  component: VaccineDetailHeader,
  parameters: {
    layout: 'padded', 
  },
 
  tags: ['autodocs'],
  argTypes: {
    nombre: { control: 'text' },
    farmaceutica: { control: 'text' },
    compact: { control: 'boolean' },
    effectiveness: { control: 'number', min: 0, max: 100 },
  },
};

export default meta;
type Story = StoryObj<typeof VaccineDetailHeader>;


export const Default: Story = {
  args: {
    nombre: 'Vacuna COVID-19 (ARNm)',
    farmaceutica: 'Pfizer-BioNTech',
    compact: false,
  },
};

export const NombreLargo: Story = {
  args: {
    nombre: 'Vacuna conjugada contra el neumococo (13-valente)',
    farmaceutica: 'Wyeth Pharmaceuticals Inc.',
    compact: false,
  },
};

export const ConEfectividad: Story = {
  args: {
    nombre: 'Vacuna Recombinante VPH',
    farmaceutica: 'Merck & Co.',
    effectiveness: 98,
    compact: false,
  },
};

export const VistaCompacta: Story = {
  args: {
    nombre: 'Influenza Trivalente',
    farmaceutica: 'Sanofi Pasteur',
    compact: true,
  },
};