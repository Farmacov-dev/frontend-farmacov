import React from "react";

type FormsCampProps = {
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

const FormsCamp = ({
  label,
  required = false,
  helperText,
  error,
  children,
  className = "",
}: FormsCampProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-semibold text-slate-800">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div>{children}</div>

      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : helperText ? (
        <p className="text-sm text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};

export default FormsCamp;