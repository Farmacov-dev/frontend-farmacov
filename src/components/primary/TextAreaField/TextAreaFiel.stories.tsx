// src/components/primary/TextAreaField/TextAreaField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import TextAreaField from './TextAreaField';

const meta = {
  title: 'Components/Primary/TextAreaField',
  component: TextAreaField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'boolean' },
    maxLength: { control: 'number' },
    showCount: { control: 'boolean' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
  },
} satisfies Meta<typeof TextAreaField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Historia 1: Estado por defecto
export const Default: Story = {
  args: {
    label: 'Descripción de los síntomas',
    placeholder: 'Escribe detalladamente las reacciones observadas en el paciente...',
  },
};

// Historia 2: Con contador activado y un límite de caracteres
export const ConContador: Story = {
  args: {
    label: 'Notas adicionales (Breve)',
    placeholder: 'Ej. El paciente tiene historial de alergias...',
    maxLength: 150,
    showCount: true,
    value: 'Paciente reporta dolor de cabeza constante tras 24 horas de la aplicación de la primera dosis.',
  },
};

// Historia 3: Estado de error
export const ErrorState: Story = {
  args: {
    label: 'Justificación médica',
    error: true,
    value: '',
    placeholder: 'Este campo es obligatorio...',
  },
};

// Historia 4: Estado deshabilitado (solo lectura)
export const Deshabilitado: Story = {
  args: {
    label: 'Comentarios del supervisor',
    disabled: true,
    value: 'El caso ha sido escalado al comité de farmacovigilancia. No se permiten más modificaciones por el momento.',
  },
};