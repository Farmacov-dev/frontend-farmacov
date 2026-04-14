// src/components/primary/Button/Button.tsx
// angel


import styles from "./Button.module.css";

//variantes del boton 
type ButtonVariant = "primary" | "outline" | "ghost" | "sidebar";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: string;      // ruta al SVG: import salirSvg from "@/assets/icons/salir.svg"
  iconAlt?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  icon,
  iconAlt = "",
  disabled = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={[
        styles.button,
        styles[variant],
        disabled ? styles.disabled : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {icon && (
        <img
          src={icon}
          alt={iconAlt}
          className={styles.icon}
          aria-hidden={!iconAlt}
        />
      )}
      {children}
    </button>
  );
}