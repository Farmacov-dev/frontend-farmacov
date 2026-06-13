import React from "react";
import { MdWarningAmber } from "react-icons/md";

type Severity = "low" | "medium" | "high";

type SideEffectBadgeProps = {
  label: string;
  severity: Severity;
  icon?: React.ReactNode;
};

const severityStyles: Record<
  Severity,
  {
    container: string;
    dot: string;
    text: string;
  }
> = {
  // Cada severidad usa una paleta fija para que la etiqueta se lea rápido.
  low: {
    container: "bg-green-50",
    dot: "bg-green-500",
    text: "text-green-700",
  },
  medium: {
    container: "bg-yellow-50",
    dot: "bg-yellow-500",
    text: "text-yellow-700",
  },
  high: {
    container: "bg-red-50",
    dot: "bg-red-500",
    text: "text-red-700",
  },
};

const SideEffectBadge = ({
  label,
  severity,
  icon,
}: SideEffectBadgeProps) => {
  const styles = severityStyles[severity];

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${styles.container} ${styles.text}`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${styles.dot}`} />
      <span className="flex items-center gap-1">
        {/* Usa el icono recibido; si no existe, muestra el marcador de advertencia por defecto. */}
        {icon ? icon : <MdWarningAmber className="text-base" />}
        {label}
      </span>
    </div>
  );
};

export default SideEffectBadge;
