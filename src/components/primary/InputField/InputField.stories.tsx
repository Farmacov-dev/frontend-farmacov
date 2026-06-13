// src/components/primary/InputField/InputField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';

const meta = {
  title: 'Components/Primary/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Texto descriptivo del campo' },
    error: { control: 'boolean', description: 'Activa el estado de error' },
    type: { 
      control: 'select', 
      options: ['text', 'password', 'email', 'number'],
      description: 'Tipo nativo de HTML5 para el input'
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

// URLs con inconos de pruebas
const ICON_EYE = "https://cdn-icons-png.flaticon.com/512/159/159604.png";
const ICON_EYE_OFF = "https://cdn-icons-png.flaticon.com/512/2767/2767146.png";

export const Default: Story = {
  args: {
    label: 'Nombre de usuario',
    placeholder: 'Ej. Dr. Juan Pérez',
  },
};

export const Password: Story = {
  args: {
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Ingresa tu contraseña',
    eyeIcon: ICON_EYE,
    eyeOffIcon: ICON_EYE_OFF,
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Correo electrónico',
    type: 'email',
    defaultValue: 'usuario@invalido',
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Solo lectura',
    value: 'ID 1',
    disabled: true,
  },
};