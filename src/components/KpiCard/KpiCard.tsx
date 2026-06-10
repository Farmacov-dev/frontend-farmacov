// src/components/KpiCard/KpiCard.tsx
import ChangeBadge from "../ChangeBadge/ChangeBadge";

type PositiveDirection = 'up' | 'down' | 'neutral'

interface KpiCardProps {
  title: string;
  value: string | number;
  change: number | null;
  positiveDirection?: PositiveDirection;
  color?: string;
  icon?: React.ReactNode;
  className?: string;
}

const KpiCard = ({
  title,
  value,
  change,
  positiveDirection = 'up',
  color = "#6366F1",
  icon,
  className = "",
}: KpiCardProps) => {
  return (
    <div
      className={`flex min-h-[160px] min-w-0 flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="max-w-[70%] text-[15px] font-medium leading-snug text-gray-700 sm:text-base">
          {title}
        </p>
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md"
          style={{ backgroundColor: color }}
        >
          {icon ? (
            <span className="flex items-center justify-center text-white">
              {icon}
            </span>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex items-end gap-3">
        <span data-testid="kpi-value" className="text-3xl font-bold leading-none text-[#111827]">
          {value}
        </span>
        <div className="pb-1">
          <ChangeBadge
            value={change}
            positiveDirection={positiveDirection}
          />
        </div>
      </div>
    </div>
  );
};

export default KpiCard;