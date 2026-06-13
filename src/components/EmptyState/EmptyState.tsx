interface EmptyStateProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 px-4 py-8 text-center ${className}`}>
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center opacity-70">
          {icon}
        </div>
      )}
      <p className="text-base font-medium text-gray-500">{title}</p>
    </div>
  );
}