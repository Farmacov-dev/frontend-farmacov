import React from "react";

type FilterOption = {
  label: string;
  value: string;
};

type FilterSelectProps = {
  label: string;
  value?: string;
  options?: FilterOption[];
  onChange?: (value: string) => void;
};

const FilterSelect = ({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) => {
  const resolvedOptions =
    options && options.length > 0
      ? options
      : [{ label, value: label.toLowerCase() }];

  const resolvedValue = value ?? resolvedOptions[0]?.value ?? "";

  return (
    <select
      className="w-[180px] rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400"
      value={resolvedValue}
      onChange={(event) => onChange?.(event.target.value)}
    >
      {resolvedOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;
