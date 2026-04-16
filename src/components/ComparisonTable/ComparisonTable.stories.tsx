import type { Meta, StoryObj } from '@storybook/react-vite';
import ComparisonTable from './ComparisonTable';
import type { ComparisonRowProps } from '../ComparisonRow/ComparisonRow';

const comparisonRows: ComparisonRowProps[] = [
  {
    index: 1,
    label: 'Eficacia',
    left: { value: '95%', status: 'better' },
    right: { value: '94%', status: 'worse' },
  },
  {
    index: 2,
    label: 'Costo Unitario',
    left: { value: '$19.50 USD', status: 'better' },
    right: { value: '$25.00 USD', status: 'worse' },
  },
  {
    index: 3,
    label: 'Costo al Mayoreo',
    left: { value: '$15.80 USD', status: 'better' },
    right: { value: '$20.50 USD', status: 'worse' },
  },
  {
    index: 4,
    label: 'Número de Dosis',
    left: { value: '2 dosis', status: 'neutral' },
    right: { value: '2 dosis', status: 'neutral' },
  },
  {
    index: 5,
    label: 'Temperatura de Conservación',
    left: { value: '-70°C', status: 'neutral' },
    right: { value: '-20°C', status: 'neutral' },
  },
  {
    index: 6,
    label: 'Tiempo de Preservación',
    left: { value: '2 horas (ambiente)', status: 'neutral' },
    right: { value: '12 horas (ambiente)', status: 'neutral' },
  },
  {
    index: 7,
    label: 'Tipo de Vacuna',
    left: { value: 'ARNm', status: 'neutral' },
    right: { value: 'ARNm', status: 'neutral' },
  },
  {
    index: 8,
    label: 'Farmacéutica',
    left: { value: 'Pfizer-BioNTech', status: 'neutral' },
    right: { value: 'Moderna', status: 'neutral' },
  },
];

const meta = {
  title: 'Components/ComparisonTable',
  component: ComparisonTable,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          background: '#f7f9fc',
          padding: '32px',
          minHeight: '100vh',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    rows: {
      control: { type: 'object' },
    },
    className: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof ComparisonTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilledTable: Story = {
  args: {
    rows: comparisonRows,
    className: '',
  },
};

export const EmptyTable: Story = {
  args: {
    rows: [],
    className: '',
  },
};