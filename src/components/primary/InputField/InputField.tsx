// src/components/primary/InputField/InputField.tsx
// angel

import { useState } from "react";

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
    <div className="flex flex-col items-start gap-[10px] flex-1 self-stretch">

      {/* label */}
      <span className={`
        font-inter text-[16px] font-medium leading-[24px]
        ${error ? "text-red" : "text-dark"}
      `}>
        {label}
      </span>

      {/* campo */}
      <div className={`
        flex justify-between items-center
        flex-1 self-stretch
        px-[20px] pr-[16px] py-[12px] gap-[10px]
        rounded-card bg-white
        border transition-colors duration-150 ease-in-out
        focus-within:border-primary
        ${error
          ? "border-red-light focus-within:border-red"
          : "border-stroke"
        }
      `}>

        {/* input nativo */}
        <input
          type={inputType}
          className={`
            flex-1 border-none outline-none bg-transparent
            text-dark font-inter text-[16px] font-medium leading-[24px]
            placeholder:text-muted-light placeholder:font-normal
            ${className}
          `}
          {...props}
        />

        {/* ojo toggle — solo en password con íconos */}
        {isPassword && (eyeIcon || eyeOffIcon) && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            className={`
              inline-flex items-center justify-center
              bg-transparent border-none p-0
              cursor-pointer flex-shrink-0
              transition-opacity duration-150
              ${showPassword ? "opacity-100" : "opacity-40 hover:opacity-70"}
            `}
          >
            <img
              src={showPassword ? eyeOffIcon : eyeIcon}
              alt=""
              aria-hidden="true"
              className="w-[20px] h-[20px] block"
            />
          </button>
        )}

      </div>
    </div>
  );
}