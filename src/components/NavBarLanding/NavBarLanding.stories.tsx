import type { Meta, StoryObj } from '@storybook/react-vite';
import NavBarLanding from './NavBarLanding';

const meta: Meta<typeof NavBarLanding> = {
  title: 'Components/NavBarLanding',
  component: NavBarLanding,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavBarLanding>;

export const Default: Story = {
  render: () => <NavBarLanding />,
};

export const WithActiveLink: Story = {
  render: () => <NavBarLanding activeLink="Planes" />,
};