// src/components/primary/TextAreaField/TextAreaField.tsx
// angel

import { useId } from "react";

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  maxLength?: number;
  showCount?: boolean;
}

export default function TextAreaField({
  label,
  error = false,
  maxLength,
  showCount = false,
  className = "",
  value,
  id,
  ...props
}: TextAreaFieldProps) {
  // [REFACTOR]: Generación segura del ID para vincular el label con el textarea
  const reactId = useId();
  const textareaId = id || reactId;

  // [REFACTOR]: Corrección del bug de longitud. 
  // Si value es undefined/null, asignamos 0 en lugar de contar la palabra "undefined"
  const currentLength = value ? String(value).length : 0;

  return (
    <div className="flex flex-col items-start gap-[10px] self-stretch">

      {/* label opcional */}
      {label && (
        <label 
          htmlFor={textareaId}
          className={`
            font-inter text-[16px] font-medium leading-[24px] cursor-pointer
            ${error ? "text-red" : "text-dark"}
          `}
        >
          {label}
        </label>
      )}

      {/* textarea */}
      <textarea
        id={textareaId}
        value={value}
        maxLength={maxLength}
        className={`
          w-full self-stretch min-h-[120px]
          p-[10px] gap-[10px]
          rounded-card bg-white
          /* [REFACTOR]: Eliminado el opacity-50 general que ocultaba el texto escrito por el usuario */
          border font-inter text-[16px] font-medium leading-[24px] text-dark
          resize-y transition-colors duration-150 ease-in-out
          focus:outline-none focus:border-primary
          /* [REFACTOR]: Reemplazo de placeholder:text-negro por placeholder:text-muted-light para consistencia */
          placeholder:text-muted-light placeholder:font-normal
          /* [REFACTOR]: Reemplazo de border-negro por border-stroke */
          ${error
            ? "border-red-light focus:border-red"
            : "border-stroke"
          }
          /* [REFACTOR]: Estilos visuales para estado deshabilitado */
          disabled:bg-surface disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />

      {/* contador opcional */}
      {showCount && maxLength && (
        <span className="
          self-end font-inter text-[12px] font-normal
          leading-[16px] text-muted
        ">
          {currentLength} / {maxLength}
        </span>
      )}

    </div>
  );
}