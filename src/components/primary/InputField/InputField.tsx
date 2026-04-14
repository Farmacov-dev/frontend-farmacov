// src/components/primary/InputField/InputField.tsx
//angel

import { useState } from "react";
import styles from "./InputField.module.css";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  eyeIcon?: string; 
  eyeOffIcon?: string;
}

export default function InputField({
  label,
  error = false,
  type = "text",
  eyeIcon,
  eyeOffIcon,
  className = "",
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div
      className={[styles.wrapper, error ? styles.wrapperError : ""].join(" ")}
    >
      {/* label */}
      <span className={[styles.label, error ? styles.labelError : ""].join(" ")}>
        {label}
      </span>

      {/* campo */}
      <div
        className={[styles.field, error ? styles.fieldError : ""].join(" ")}
      >
        <input
          type={inputType}
          className={[styles.input, className].filter(Boolean).join(" ")}
          {...props}
        />

        {/* ícono ojo — solo en campos password */}
        {isPassword && (eyeIcon || eyeOffIcon) && (
          <button
            type="button"
            className={[
              styles.eyeButton,
              showPassword ? styles.eyeActive : "",
            ].join(" ")}
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            <img
              src={showPassword ? eyeOffIcon : eyeIcon}
              alt=""
              className={styles.eyeIcon}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </div>
  );
}