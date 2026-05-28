// src/components/primary/Button/Button.tsx
// angel

type ButtonVariant = "primary" | "outline" | "ghost" | "sidebar" | "floating" | "inverse";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: string;
  iconAlt?: string;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-primary text-white border border-transparent
    hover:bg-primary-hover active:bg-primary-active
  `,
  outline: `
    bg-white text-primary border border-primary gap-[5px]
    hover:bg-primary-light active:bg-primary/20
  `,
  ghost: `
    bg-transparent text-dark-soft border border-stroke-dark
    hover:bg-black/5 active:bg-black/10
  `,
  sidebar: `
    bg-surface text-dark-soft border border-stroke-dark
    w-full justify-start px-[24px] py-[12px] gap-[10px] self-stretch
    hover:bg-surface-dark active:bg-surface-active
  `,
  floating: `
    bg-white border-none
    text-dark-deep text-[13px]
    rounded-[10px] shadow-floating
    hover:bg-surface active:bg-surface-dark
  `,
  inverse: `
    bg-transparent text-white border border-white
    hover:bg-white/10 active:bg-white/20
  `
};

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
      className={`
        inline-flex items-center justify-center
        gap-[10px] px-[28px] py-[13px]
        rounded-card
        font-inter text-[16px] font-medium leading-[24px] text-center
        whitespace-nowrap cursor-pointer
        transition-[background-color,opacity,border-color] duration-150 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {icon && (
        <img
          src={icon}
          alt={iconAlt}
          aria-hidden={!iconAlt}
          className="w-[18px] h-[18px] flex-shrink-0 block"
        />
      )}
      {children}
    </button>
  );
}