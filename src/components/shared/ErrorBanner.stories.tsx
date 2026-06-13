import type { Meta, StoryObj } from "@storybook/react";
import ErrorBanner from "./ErrorBanner";

const meta: Meta<typeof ErrorBanner> = {
  title: "Feedback/ErrorBanner",
  component: ErrorBanner,
};

export default meta;
type Story = StoryObj<typeof ErrorBanner>;

export const Default: Story = {
  args: {
    message: "Hubo un problema al cargar los datos",
  },
};

export const WithCustomTitle: Story = {
  args: {
    title: "Error crítico",
    message: "No se pudo conectar con el servidor",
  },
};