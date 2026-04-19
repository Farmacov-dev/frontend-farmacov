interface ChangeBadgeProps {
    value: number;
    showArrow?: boolean;
  }

  const ChangeBadge = ({ value, showArrow = true }: ChangeBadgeProps) => {
    const positive = value >= 0;
    const arrow = positive ? '↑' : '↓';

    return (
      <span className={`inline-flex items-center gap-0.5 text-xs font-medium 
  font-['Inter',sans-serif] ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {positive ? '+' : ''}{value}%{showArrow && ` ${arrow}`}
      </span>
    );
  };

  export default ChangeBadge;
