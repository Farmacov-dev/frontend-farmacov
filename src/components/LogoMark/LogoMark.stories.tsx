import type { Meta, StoryObj } from '@storybook/react-vite';
  import LogoMark from './LogoMark';

  const meta: Meta<typeof LogoMark> = {
    title: 'Components/LogoMark',
    component: LogoMark,
    tags: ['autodocs'],
  };

  export default meta;
  type Story = StoryObj<typeof LogoMark>;

  export const Full: Story = {
    args: { variant: 'full' },
  };

  export const IconOnly: Story = {
    args: { variant: 'icon' },
  };