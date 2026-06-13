type ComparisonHeaderProps = {
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
};

export default function ComparisonHeader({
  leftLabel = "Old\nProduct",
  rightLabel = "New\nProduct",
  className = "",
}: ComparisonHeaderProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="flex h-16 w-full overflow-hidden rounded-md shadow-sm sm:h-20"  >
        <div className="flex w-1/2 items-center justify-center bg-[#d3d6f4] px-4 text-center sm:px-6">
          <span className="whitespace-pre-line text-xl font-semibold leading-tight text-[#30343c] sm:text-2xl lg:text-3xl">
            {leftLabel}
          </span>
        </div>

        <div className="flex w-1/2 items-center justify-center bg-[#d5f3fd] px-4 text-center sm:px-6">
          <span className="whitespace-pre-line text-xl font-semibold leading-tight text-[#30343c] sm:text-2xl lg:text-3xl">
            {rightLabel}
          </span>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white shadow sm:h-14 sm:w-14 lg:h-16 lg:w-16">
        <span className="text-lg font-bold text-[#798295] sm:text-xl lg:text-2xl">
          VS
        </span>
      </div>
    </div>
  );
}