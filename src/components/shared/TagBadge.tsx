import React from "react";

type Tone = "blue" | "green" | "yellow" | "red" | "gray" | "purple";
type Variant = "solid" | "soft" | "outline";
type Size = "sm" | "md";

type TagBadgeProps = {
  label: string;
  tone?: Tone;
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
};

const toneStyles = {
  solid: {
    blue: "bg-blue-500 text-white border-blue-500",
    green: "bg-green-500 text-white border-green-500",
    yellow: "bg-yellow-500 text-white border-yellow-500",
    red: "bg-red-500 text-white border-red-500",
    gray: "bg-slate-500 text-white border-slate-500",
    purple: "bg-purple-500 text-white border-purple-500",
  },
  soft: {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    red: "bg-red-50 text-red-700 border-red-200",
    gray: "bg-slate-50 text-slate-700 border-slate-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
  },
  outline: {
    blue: "bg-white text-blue-700 border-blue-300",
    green: "bg-white text-green-700 border-green-300",
    yellow: "bg-white text-yellow-700 border-yellow-300",
    red: "bg-white text-red-700 border-red-300",
    gray: "bg-white text-slate-700 border-slate-300",
    purple: "bg-white text-purple-700 border-purple-300",
  },
};

const sizeStyles = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
};

const TagBadge = ({
  label,
  tone = "blue",
  variant = "soft",
  size = "sm",
  icon,
}: TagBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium ${toneStyles[variant][tone]} ${sizeStyles[size]}`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {label}
    </span>
  );
};

export default TagBadge;