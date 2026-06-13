  interface EffectivenessBadgeProps {
    value: number;
  }

  const getTierClasses = (value: number) => {
    if (value >= 90) return { text: 'text-green-600', dot: 'bg-green-600' };
    if (value >= 75) return { text: 'text-indigo-500', dot: 'bg-indigo-500' };
    if (value >= 65) return { text: 'text-amber-600', dot: 'bg-amber-600' };
    return { text: 'text-red-600', dot: 'bg-red-600' };
  };

  const EffectivenessBadge = ({ value }: EffectivenessBadgeProps) => {
    const { text, dot } = getTierClasses(value);

    return (
      <span className={`inline-flex items-center gap-1.5 text-[13px] font-bold 
  font-['Inter',sans-serif] ${text}`}>
        <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
        {value}%
      </span>
    );
  };

  export default EffectivenessBadge;