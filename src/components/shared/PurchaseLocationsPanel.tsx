import React from "react";
import SectionCard from "./SectionCard";

type PurchaseLocation = {
  title: string;
  subtitle?: string;
  address?: string;
};

type PurchaseLocationsPanelProps = {
  title?: string;
  locations: PurchaseLocation[];
};

const PurchaseLocationsPanel = ({
  title = "Dónde comprar",
  locations,
}: PurchaseLocationsPanelProps) => {
  return (
    <SectionCard title={title}>
      <div className="space-y-3">
        {locations.map((location, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-200 bg-slate-50 p-3"
          >
            <p className="text-sm font-semibold text-slate-800">
              {location.title}
            </p>

            {location.subtitle && (
              <p className="mt-1 text-sm text-slate-600">
                {location.subtitle}
              </p>
            )}

            {location.address && (
              <p className="mt-1 text-xs text-slate-500">
                {location.address}
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default PurchaseLocationsPanel;