// src/components/primary/TextAreaField/TextAreaField.tsx

import styles from "./TextAreaField.module.css";

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  maxLength?: number; // longitud maxima opcional 
  showCount?: boolean; // muestra conador de caracteres si maxLength esta definido
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
    <div className={styles.wrapper}>
      {/* label opcional — mismo estilo que InputField */}
      {label && (
        <span
          className={[styles.label, error ? styles.labelError : ""].join(" ")}
        >
          {label}
        </span>
      )}

      {/* textarea */}
      <textarea
        value={value}
        maxLength={maxLength}
        className={[
          styles.textarea,
          error ? styles.textareaError : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />

      {/* contador opcional */}
      {showCount && maxLength && (
        <span className={styles.counter}>
          {currentLength} / {maxLength}
        </span>
      )}
    </div>
  );
}