// src/components/primary/TextAreaField/TextAreaField.tsx
// angel

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
  value = "",
  ...props
}: TextAreaFieldProps) {
  const currentLength = String(value).length;

  return (
    <div className="flex flex-col items-start gap-[10px] self-stretch">

      {/* label opcional */}
      {label && (
        <span className={`
          font-inter text-[16px] font-medium leading-[24px]
          ${error ? "text-red" : "text-dark"}
        `}>
          {label}
        </span>
      )}

      {/* textarea */}
      <textarea
        value={value}
        maxLength={maxLength}
        className={`
          w-full self-stretch min-h-[120px]
          p-[10px] gap-[10px]
          rounded-card bg-white
          border font-inter text-[16px] font-medium leading-[24px]
          resize-y opacity-50
          transition-[border-color,opacity] duration-150 ease-in-out
          focus:outline-none focus:border-primary focus:opacity-100
          placeholder:text-negro placeholder:opacity-50
          ${error
            ? "border-red-light opacity-100 focus:border-red"
            : "border-negro"
          }
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