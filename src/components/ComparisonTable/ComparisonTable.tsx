import ComparisonRow, { type ComparisonRowProps } from "../ComparisonRow/ComparisonRow";

export interface ComparisonTableProps {
  rows: ComparisonRowProps[];
  className?: string;
}

const ComparisonTable = ({ rows, className = "" }: ComparisonTableProps) => {
  return (
    <section
      className={`w-full rounded-xl border border-[#d7deea] bg-[#eef1f6] px-6 pt-7 pb-5 box-border ${className}`.trim()}
    >
      <div className="w-full">
        {rows.map((row, index) => (
          <ComparisonRow
            key={`${row.index}-${row.label}`}
            {...row}
            showDivider={index !== rows.length - 1}
          />
        ))}
      </div>

      <div className="mt-[18px] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <span className="inline-flex items-center gap-2 text-[15px] font-medium text-[#5ecf8b]">
            <span className="text-[13px] leading-none">◉</span>
            Mejor opción
          </span>

          <span className="inline-flex items-center gap-2 text-[15px] font-medium text-[#ff5e5e]">
            <span className="text-[13px] leading-none">⊗</span>
            Opción inferior
          </span>
        </div>

        <button
          type="button"
          className="min-w-[168px] h-[54px] cursor-pointer rounded-[10px] border-none bg-[#6c92ea] text-base font-semibold text-white"
        >
          Volver
        </button>
      </div>
    </section>
  );
};

export default ComparisonTable;