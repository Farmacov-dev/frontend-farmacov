import type { Meta, StoryObj } from '@storybook/react-vite';
import MedicalSpecsSection from './MedicalSpecsSection';

const meta: Meta<typeof MedicalSpecsSection> = {
  title: 'Components/MedicalSpecsSection',
  component: MedicalSpecsSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MedicalSpecsSection>;

export const Cominarty: Story = {
  render: () => (
    <MedicalSpecsSection
      specs={[
        { label: 'Tipo', value: 'ARNm' },
        { label: 'Dosis requerida', value: 2 },
        { label: 'Temperatura', value: '-70°C' },
        { label: 'Preservación', value: '2 hrs (amb)' },
      ]}
    />
  ),
};

export const Spikevax: Story = {
  render: () => (
    <MedicalSpecsSection
      specs={[
        { label: 'Tipo', value: 'ARNm' },
        { label: 'Dosis requerida', value: 2 },
        { label: 'Temperatura', value: '-20°C' },
        { label: 'Preservación', value: '12 hrs (amb)' },
      ]}
    />
  ),
};