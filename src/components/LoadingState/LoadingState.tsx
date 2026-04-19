interface LoadingStateProps {
  className?: string;
  color?: string; // color principal del spinner
}

export default function LoadingState({
  className = "",
  color = "#6b97ee",
}: LoadingStateProps) {
  return (
    <div className={`flex items-center justify-center p-6 ${className}`}>
      <div
        className="h-12 w-12 rounded-full border-[5px] animate-spin"
        style={{
          borderColor: `${color}33`, // color con opacidad (~20%)
          borderTopColor: color,
          borderRightColor: color,
          boxShadow: `0 0 12px ${color}2E`,
        }}
        aria-label="Cargando"
        role="status"
      />
    </div>
  );
}