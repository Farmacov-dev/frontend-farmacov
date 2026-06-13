import React from "react";
import TagBadge from "./TagBadge";
import MedicalSpecsSection from "./MedicalSpecsSection";
import PurchaseLocationsPanel from "./PurchaseLocationsPanel";
import SideEffectsPanel from "./SideEffectsPanel";

type SpecItem = {
  label: string;
  value: string;
};

type PurchaseLocation = {
  title: string;
  subtitle?: string;
  address?: string;
};

type SideEffect = {
  label: string;
  severity: "low" | "medium" | "high";
};

type VaccineDetailContentProps = {
  vaccineName: string;
  manufacturer: string;
  description: string;
  effectiveness: number;
  specs: SpecItem[];
  locations: PurchaseLocation[];
  sideEffects: SideEffect[];
};

const VaccineDetailContent = ({
  vaccineName,
  manufacturer,
  description,
  effectiveness,
  specs,
  locations,
  sideEffects,
}: VaccineDetailContentProps) => {
  return (
    <div className="rounded-2xl bg-[#EAF4FB] p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{vaccineName}</h2>
          <p className="mt-1 text-sm text-slate-600">
            Diseñada por: {manufacturer}
          </p>
        </div>

        <TagBadge
          label={`${effectiveness}% de efectividad`}
          tone="green"
          variant="soft"
          size="md"
        />
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-sm font-semibold text-slate-800">
          Descripción General
        </h3>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <MedicalSpecsSection items={specs} />
        </div>

        <div className="lg:col-span-1">
          <PurchaseLocationsPanel locations={locations} />
        </div>

        <div className="lg:col-span-1">
          <SideEffectsPanel effects={sideEffects} />
        </div>
      </div>
    </div>
  );
};

export default VaccineDetailContent;