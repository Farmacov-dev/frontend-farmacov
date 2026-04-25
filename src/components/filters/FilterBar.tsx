import React from "react";
import FilterSelect from "./FilterSelect";

type FilterOption = {
  label: string;
  value: string;
};

type FilterItem = {
  key: string;
  label: string;
  value?: string;
  options?: FilterOption[];
};

type FilterBarProps = {
  title?: string;
  filters?: FilterItem[];
  onFilterChange?: (key: string, value: string) => void;
};

const defaultFilters: FilterItem[] = [
  { key: "vacuna", label: "Vacuna" },
  { key: "sexo", label: "Sexo" },
  { key: "edad", label: "Edad" },
  { key: "sintoma", label: "SÃ­ntoma" },
];

const FilterBar = ({
  title = "Filtro de AnÃ¡lisis",
  filters = defaultFilters,
  onFilterChange,
}: FilterBarProps) => {
  return (
    <section className="mb-8">
      <div className="mb-4 inline-block rounded-xl bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
        {title}
      </div>

      <div className="flex flex-wrap gap-4">
        {filters.map((filter) => (
          <FilterSelect
            key={filter.key}
            label={filter.label}
            value={filter.value}
            options={filter.options}
            onChange={(value) => onFilterChange?.(filter.key, value)}
          />
        ))}
      </div>
    </section>
  );
};

export default FilterBar;
