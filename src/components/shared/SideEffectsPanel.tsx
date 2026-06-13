import React from "react";
import SectionCard from "./SectionCard";
import SideEffectBadge from "./SideEffectBadge";

type SideEffect = {
  label: string;
  severity: "low" | "medium" | "high";
};

type SideEffectsPanelProps = {
  title?: string;
  effects: SideEffect[];
};

const SideEffectsPanel = ({
  title = "Efectos secundarios",
  effects,
}: SideEffectsPanelProps) => {
  return (
    <SectionCard title={title}>
      <div className="flex flex-col gap-3">
        {effects.map((effect, index) => (
          <SideEffectBadge
            key={index}
            label={effect.label}
            severity={effect.severity}
          />
        ))}
      </div>
    </SectionCard>
  );
};

export default SideEffectsPanel;