import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import NotesForm from "./NotesFrom";

const meta: Meta<typeof NotesForm> = {
  title: "Shared/NotesForm",
  component: NotesForm,
};

export default meta;
type Story = StoryObj<typeof NotesForm>;

type NotesValues = {
  referenceChart: string;
  noteTitle: string;
  observations: string;
};

const NotesFormInteractive = ({ initialValues }: { initialValues: NotesValues }) => {
  const [values, setValues] = useState(initialValues);

  return (
    <NotesForm
      values={values}
      onChange={(field, value) =>
        // Mantiene la story interactiva reflejando el estado del formulario en local.
        setValues((current) => ({
          ...current,
          [field]: value,
        }))
      }
      onSubmit={() => {
        // Sin acción real: Storybook solo necesita mostrar la interacción del envío.
      }}
    />
  );
};

export const Default: Story = {
  render: () => (
    <NotesFormInteractive
      initialValues={{
        referenceChart: "Síntomas por edad",
        noteTitle: "Observaciones principales",
        observations: "Paciente con evolución favorable y seguimiento semanal.",
      }}
    />
  ),
};

export const Empty: Story = {
  render: () => <NotesFormInteractive initialValues={{ referenceChart: "", noteTitle: "", observations: "" }} />,
};
