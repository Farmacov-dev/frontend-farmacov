import React from "react";
import FormsCamp from "./FormsCamp";

type NotesFormProps = {
  values: {
    referenceChart: string;
    noteTitle: string;
    observations: string;
  };
  onChange: (
    field: "referenceChart" | "noteTitle" | "observations",
    value: string
  ) => void;
  onSubmit: () => void;
  loading?: boolean;
};

const NotesForm = ({
  values,
  onChange,
  onSubmit,
  loading = false,
}: NotesFormProps) => {
  return (
    <div className="space-y-6">
      {/* Campo 1 */}
      <FormsCamp label="Gráfica de referencia" required>
        <input
          value={values.referenceChart}
          onChange={(e) => onChange("referenceChart", e.target.value)}
          placeholder="Ej. Síntomas por edad"
          className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500"
        />
      </FormsCamp>

      {/* Campo 2 */}
      <FormsCamp label="Título de la nota" required>
        <input
          value={values.noteTitle}
          onChange={(e) => onChange("noteTitle", e.target.value)}
          placeholder="Ej. Observaciones principales"
          className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500"
        />
      </FormsCamp>

      {/* Campo 3 */}
      <FormsCamp label="Observaciones" required>
        <textarea
          value={values.observations}
          onChange={(e) => onChange("observations", e.target.value)}
          rows={4}
          placeholder="Escribe tus observaciones..."
          className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500"
        />
      </FormsCamp>

      {/* Botón */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="
            rounded-md
            px-5 py-2.5
            text-sm font-bold
            uppercase
            tracking-[0.25em]
            !text-white
            !bg-blue-500
            shadow-[0_0_25px_rgb(0,140,255)]
            transition-all duration-500
            hover:!bg-blue-600
            hover:shadow-[0_0_5px_rgb(0,140,255),0_0_25px_rgb(0,140,255),0_0_50px_rgb(0,140,255),0_0_100px_rgb(0,140,255)]
            disabled:cursor-not-allowed
            disabled:!bg-slate-300
            disabled:shadow-none
          "
        >
          {loading ? "Guardando..." : "Guardar Anotación"}
        </button>
      </div>
    </div>
  );
};

export default NotesForm;