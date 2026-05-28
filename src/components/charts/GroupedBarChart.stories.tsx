import type { Meta, StoryObj } from "@storybook/react";
import GroupedBarChart from "./GroupedBarChart";

const meta = {
  title: "Components/Charts/GroupedBarChart",
  component: GroupedBarChart,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
  },
} satisfies Meta<typeof GroupedBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// estado vacio 
export const SinVacunasSeleccionadas: Story = {
  args: {
    title: "Distribución de síntomas",
    subtitle: "Comparativa por vacuna seleccionada",
    data: [],
    vacunasSeleccionadas: [],
  },
};

// estado con datos cruzados
export const ComparativaMultiplesVacunas: Story = {
  args: {
    title: "Distribución de síntomas graves",
    subtitle: "Reportes acumulados del último trimestre",
    vacunasSeleccionadas: [
      { id: 1, nombre: "Comirnaty" },
      { id: 2, nombre: "Spikevax" },
      { id: 3, nombre: "Vaxzevria" },
    ],
    data: [
      {
        sintoma: "Miocarditis",
        Comirnaty: 12,
        Spikevax: 8,
        Vaxzevria: 2,
      },
      {
        sintoma: "Anafilaxia",
        Comirnaty: 4,
        Spikevax: 15,
        Vaxzevria: 1,
      },
      {
        sintoma: "Trombosis",
        Comirnaty: 1,
        Spikevax: 0,
        Vaxzevria: 14,
      },
      {
        sintoma: "Parálisis facial",
        Comirnaty: 6,
        Spikevax: 5,
        Vaxzevria: 4,
      },
    ],
  },
};