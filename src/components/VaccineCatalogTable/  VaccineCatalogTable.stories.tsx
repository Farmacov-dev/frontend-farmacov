import type { Meta, StoryObj } from '@storybook/react-vite';
import VaccineCatalogTable from './VaccineCatalogTable';

const meta: Meta<typeof VaccineCatalogTable> = {
  title: 'Components/VaccineCatalogTable',
  component: VaccineCatalogTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VaccineCatalogTable>;

const mockVaccines = [
  { id: '1', name: 'Cominarty', farmaceutica: 'Pfizer', costo: 19.50, costoMayoreo: 15.80, temperatura: '-70°C', efectividad: 95, longevidad: '2 horas (ambiente)' },
  { id: '2', name: 'Spikevax', farmaceutica: 'Moderna', costo: 25.00, costoMayoreo: 20.50, temperatura: '-20°C', efectividad: 94, longevidad: '12 horas (ambiente)' },
  { id: '3', name: 'Vaxzevria', farmaceutica: 'AstraZeneca', costo: 4.00, costoMayoreo: 2.80, temperatura: '2-8°C', efectividad: 74, longevidad: '6 meses (refrigerado)' },
  { id: '4', name: 'Janssen', farmaceutica: 'Johnson & Johnson', costo: 10.00, costoMayoreo: 8.50, temperatura: '2-8°C', efectividad: 66, longevidad: '3 meses (refrigerado)' },
  { id: '5', name: 'CoronaVac', farmaceutica: 'Sinovac', costo: 13.60, costoMayoreo: 10.20, temperatura: '-18°C', efectividad: 51, longevidad: '12 meses (refrigerado)' },
  { id: '6', name: 'Sinopharm', farmaceutica: 'Sinopharm', costo: 36.00, costoMayoreo: 28.00, temperatura: '2-8°C', efectividad: 79, longevidad: '24 meses (refrigerado)' },
];

export const Default: Story = {
  render: () => <VaccineCatalogTable vaccines={mockVaccines} />,
};

export const WithClick: Story = {
  render: () => (
    <VaccineCatalogTable
      vaccines={mockVaccines}
      onVaccineClick={(v) => alert(v.name)}
    />
  ),
};