import React from "react";

type Shape = "square" | "circle";
type Size = "sm" | "md";

type LegendItemProps = {
  label: string;
  color: string;
  shape?: Shape;
  size?: Size;
};

const LegendItem = ({
  label,
  color,
  shape = "square",
  size = "md",
}: LegendItemProps) => {
  const boxSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-sm";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={`${boxSize} ${shapeClass}`}
        style={{ backgroundColor: color }}
      />
      <span className={`font-medium text-slate-700 ${textSize}`}>{label}</span>
    </div>
  );
};

export default LegendItem;