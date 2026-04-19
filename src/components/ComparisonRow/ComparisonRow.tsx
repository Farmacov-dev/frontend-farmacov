export type ComparisonRowStatus = "better" | "worse" | "neutral";

interface ComparisonSide {
  value: string;
  status?: ComparisonRowStatus;
}

export interface ComparisonRowProps {
  index: number;
  label: string;
  left: ComparisonSide;
  right: ComparisonSide;
  showDivider?: boolean;
}

const getStatusClass = (status: ComparisonRowStatus = "neutral") => {
  switch (status) {
    case "better":
      return "inline-flex items-center gap-2 text-base font-semibold text-[#56d38a]";
    case "worse":
      return "inline-flex items-center gap-2 text-base font-semibold text-[#ff5b5b]";
    default:
      return "inline-flex items-center gap-2 text-base font-semibold text-[#22324a]";
  }
};

const renderStatusIcon = (status: ComparisonRowStatus = "neutral") => {
  if (status === "better") {
    return <span className="text-[13px] leading-none">◉</span>;
  }

  if (status === "worse") {
    return <span className="text-[13px] leading-none">⊗</span>;
  }

  return null;
};

const ComparisonRow = ({
  index,
  label,
  left,
  right,
  showDivider = true,
}: ComparisonRowProps) => {
  return (
    <div
      className={`flex flex-col gap-[14px] py-[18px] ${
        showDivider ? "border-b border-[#e9edf3]" : ""
      }`}
    >
      <div className="flex items-center">
        <span className="text-[15px] font-medium text-[#798295]">
          {index}. {label}
        </span>
      </div>

      <div className="grid grid-cols-2 items-start gap-x-14">
        <div className="flex items-center justify-start">
          <span className={getStatusClass(left.status)}>
            {renderStatusIcon(left.status)}
            {left.value}
          </span>
        </div>

        <div className="flex items-center justify-start">
          <span className={getStatusClass(right.status)}>
            {renderStatusIcon(right.status)}
            {right.value}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonRow;