interface EffectivenessBadgeProps {
    value: number;
  }

  const getTierColor = (value: number) => {
    if (value >= 90) return '#16A34A';
    if (value >= 75) return '#6366F1';
    if (value >= 65) return '#D97706';
    return '#DC2626';
  };

  const EffectivenessBadge = ({ value }: EffectivenessBadgeProps) => {
    const color = getTierColor(value);

    return (
      <span
        className="inline-flex items-center gap-1.5 text-[13px] font-bold font-[Inter,sans-serif]"
        style={{ color }}
      >
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
        {value}%
      </span>
    );
  };

  export default EffectivenessBadge;
