// src/components/composed/LoginCard/LoginCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import LoginCard from './LoginCard';

const meta = {
  title: 'Components/Composed/LoginCard',
  component: LoginCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered', // Centra la tarjeta en la pantalla de Storybook automáticamente
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F3F4F6' }, // Fondo gris claro para que resalte la sombra
      ],
    },
  },
} satisfies Meta<typeof LoginCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Historia 1: Flujo Exitoso (Simulación de 1.5s de carga)
export const Interactivo: Story = {
  args: {
    onLogin: async (email, password) => {
      console.log(`Intentando acceso con: ${email}`);
      return new Promise((resolve) => setTimeout(resolve, 1500));
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Puedes escribir en los campos y presionar Enter para probar el estado de carga.',
      },
    },
  },
};

// Historia 2: Simulación de Credenciales Inválidas
export const ErrorCredenciales: Story = {
  args: {
    onLogin: async () => {
      return new Promise((_, reject) => 
        setTimeout(() => reject({ code: 'auth/wrong-password' }), 800)
      );
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Cualquier intento de inicio de sesión lanzará el mensaje de error de validación rojo.',
      },
    },
  },
};

// Historia 3: Simulación de Caída del Servidor (500)
export const ErrorDeSistema: Story = {
  args: {
    onLogin: async () => {
      return new Promise((_, reject) => 
        setTimeout(() => reject({ status: 500 }), 800)
      );
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Un error no relacionado con la autenticación (ej. base de datos caída) mostrará la pantalla con el ErrorBanner.',
      },
    },
  },
};