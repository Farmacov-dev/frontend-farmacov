import React from "react";
import LegendItem from "./LegendItem";

type LegendCardItem = {
  label: string;
  color: string;
};

type LegendCardProps = {
  title?: string;
  items: LegendCardItem[];
  action?: React.ReactNode;
};

const LegendCard = ({
  title = "Leyenda",
  items,
  action,
}: LegendCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">{title}</h3>

          <div className="flex flex-wrap items-center gap-6">
            {items.map((item) => (
              <LegendItem
                key={`${item.label}-${item.color}`}
                label={item.label}
                color={item.color}
              />
            ))}
          </div>
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
};

export default LegendCard;