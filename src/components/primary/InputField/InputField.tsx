// src/components/primary/InputField/InputField.tsx
// angel

import { useState, useId } from "react";

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
  id, // Extraemos el id en caso de que alguien lo pase manualmente
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  // id unico para el input, se puede pasar manualmente o se genera automáticamente con useId
  const reactId = useId();
  const inputId = id || reactId;

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col items-start gap-[10px] flex-1 self-stretch">

      {/* [REFACTOR]: Cambiamos <span> por <label> y usamos htmlFor. 
          Ahora al hacer clic en el texto, el input recibe el foco automáticamente. */}
      <label 
        htmlFor={inputId}
        className={`
          font-inter text-[16px] font-medium leading-[24px] cursor-pointer
          ${error ? "text-red" : "text-dark"}
        `}
      >
        {label}
      </label>

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
        ${props.disabled ? "opacity-50 bg-surface" : ""}
      `}>

        {/* input nativo */}
        <input
          id={inputId}
          type={inputType}
          className={`
            flex-1 border-none outline-none bg-transparent
            text-dark font-inter text-[16px] font-medium leading-[24px]
            placeholder:text-muted-light placeholder:font-normal
            disabled:cursor-not-allowed
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
            disabled={props.disabled}
            className={`
              inline-flex items-center justify-center
              bg-transparent border-none p-0
              cursor-pointer flex-shrink-0
              transition-opacity duration-150
              disabled:cursor-not-allowed
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