import type { Meta, StoryObj } from '@storybook/react-vite';
import EffectivenessBadge from './EffectivenessBadge';

const meta: Meta<typeof EffectivenessBadge> = {
  title: 'Components/EffectivenessBadge',
  component: EffectivenessBadge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EffectivenessBadge>;

export const Excelente: Story = {
  args: { value: 95 },
};

export const MuyBuena: Story = {
  args: { value: 79 },
};

export const Buena: Story = {
  args: { value: 74 },
};

export const Aceptable: Story = {
  args: { value: 51 },
};