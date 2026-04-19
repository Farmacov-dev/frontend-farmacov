import ChangeBadge from "../ChangeBadge/ChangeBadge";

interface KpiCardProps {
  title: string;
  value: string | number;
  change: number;
  color?: string;
  icon?: React.ReactNode;
  className?: string;
}

const KpiCard = ({
  title,
  value,
  change,
  color = "#6366F1",
  icon,
  className = "",
}: KpiCardProps) => {
  return (
    <div
      className={`flex min-h-[160px] min-w-0 flex-col justify-between rounded-xl border border-gray-200 bg-[#F3F4F6] p-5 shadow-sm ${className}`}
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
        <span className="text-3xl font-bold leading-none text-[#111827]">
          {value}
        </span>

        <div className="pb-1">
          <ChangeBadge value={change} />
        </div>
      </div>
    </div>
  );
};

export default KpiCard;