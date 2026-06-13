// src/components/composed/VaccineDetailModal/VaccineDetailModal.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import VaccineDetailModal from "./VaccineDetailModal";
import type { VacunaDetalle } from "../../../services/vacunas/getVacunaDetalle";

const MOCK_VACUNA: VacunaDetalle = {
  id: 1,
  nombre: "Comirnaty",
  farmaceutica: "Pfizer-BioNTech",
  tipo: "ARNm",
  descripcionGeneral: "Vacuna basada en ARN mensajero. Proporciona instrucciones a las células para producir una proteína inofensiva que genera una respuesta inmunitaria.",
  temperatura: -70,
  tiempoAmbiente: 2,
  costoUnitario: 19.50,
  efectosSecundarios: [
    { descripcion: "Problemas Cardíacos", severidad: "grave" },
    { descripcion: "Disnea", severidad: "moderado" },
    { descripcion: "Fatiga leve", severidad: "leve" },
  ],
}

const meta = {
  title: "Components/VaccineDetailModal",
  component: VaccineDetailModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "100vh", background: "#DDE3F4", padding: "16px", boxSizing: "border-box" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isOpen: { control: { type: "boolean" } },
    onClose: { action: "close-click" },
  },
} satisfies Meta<typeof VaccineDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConInformacion: Story = {
  name: "Con información",
  args: {
    isOpen: true,
    onClose: () => {},
    vacuna: MOCK_VACUNA,
    isPending: false,
  },
};

export const Cargando: Story = {
  name: "Cargando",
  args: {
    isOpen: true,
    onClose: () => {},
    vacuna: null,
    isPending: true,
  },
};

export const SinInformacion: Story = {
  name: "Sin información",
  args: {
    isOpen: true,
    onClose: () => {},
    vacuna: null,
    isPending: false,
  },
};