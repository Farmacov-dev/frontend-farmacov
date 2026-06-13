import React from "react";
import SectionCard from "./SectionCard";

type SpecItem = {
  label: string;
  value: string;
};

type MedicalSpecsSectionProps = {
  title?: string;
  items: SpecItem[];
};

const MedicalSpecsSection = ({
  title = "Especificaciones médicas",
  items,
}: MedicalSpecsSectionProps) => {
  return (
    <SectionCard title={title}>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-slate-500">{item.label}</span>
            <span className="font-medium text-slate-800">{item.value}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default MedicalSpecsSection;