import type { Meta, StoryObj } from '@storybook/react-vite';
import ComparisonRow from './ComparisonRow';

const meta = {
  title: 'Components/ComparisonRow',
  component: ComparisonRow,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          background: '#eef1f6',
          padding: '32px',
          width: '100%',
          minHeight: '220px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            background: '#f8f8fa',
            borderRadius: '12px',
            padding: '24px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    index: {
      control: { type: 'number' },
    },
    label: {
      control: { type: 'text' },
    },
    left: {
      control: { type: 'object' },
    },
    right: {
      control: { type: 'object' },
    },
    showDivider: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof ComparisonRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BetterVsWorse: Story = {
  args: {
    index: 1,
    label: 'Eficacia',
    left: { value: '95%', status: 'better' },
    right: { value: '94%', status: 'worse' },
    showDivider: true,
  },
};

export const NeutralVsNeutral: Story = {
  args: {
    index: 4,
    label: 'Número de Dosis',
    left: { value: '2 dosis', status: 'neutral' },
    right: { value: '2 dosis', status: 'neutral' },
    showDivider: true,
  },
};