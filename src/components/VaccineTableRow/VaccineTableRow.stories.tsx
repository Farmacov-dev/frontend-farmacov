import type { Meta, StoryObj } from '@storybook/react-vite';
import VaccineTableRow from './VaccineTableRow';

const meta: Meta<typeof VaccineTableRow> = {
  title: 'Components/VaccineTableRow',
  component: VaccineTableRow,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VaccineTableRow>;

const mockVaccine = {
  id: '1',
  name: 'Cominarty',
  farmaceutica: 'Pfizer',
  costo: 19.50,
  costoMayoreo: 15.80,
  temperatura: '-70°C',
  efectividad: 95,
  longevidad: '2 horas (ambiente)',
};

export const Excelente: Story = {
  render: () => (
    <table><tbody>
      <VaccineTableRow vaccine={mockVaccine} />
    </tbody></table>
  ),
};

export const Aceptable: Story = {
  render: () => (
    <table><tbody>
      <VaccineTableRow vaccine={{ ...mockVaccine, id: '2', name: 'CoronaVac', farmaceutica: 'Sinovac', costo: 13.60, costoMayoreo: 10.20, temperatura: '-18°C', efectividad: 51, longevidad: '12 meses (refrigerado)' }} />
    </tbody></table>
  ),
};