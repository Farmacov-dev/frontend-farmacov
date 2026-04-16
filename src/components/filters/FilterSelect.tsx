import React from "react";

type FilterSelectProps = {
  label: string;
};

const FilterSelect = ({ label }: FilterSelectProps) => {
  return (
    <select className="w-[180px] rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400">
      <option>{label}</option>
    </select>
  );
};

export default FilterSelect;