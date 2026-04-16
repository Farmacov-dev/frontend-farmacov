import React from "react";
import FilterSelect from "./FilterSelect";

const FilterBar = () => {
  return (
    <section className="mb-8">
      <div className="mb-4 inline-block rounded-xl bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
        Filtro de Análisis
      </div>

      <div className="flex flex-wrap gap-4">
        <FilterSelect label="Vacuna" />
        <FilterSelect label="Sexo" />
        <FilterSelect label="Edad" />
        <FilterSelect label="Síntoma" />
      </div>
    </section>
  );
};

export default FilterBar;