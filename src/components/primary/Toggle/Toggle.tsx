// src/components/primary/Toggle/Toggle.tsx
// angel

import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  'aria-label'?: string; 
}

export const Toggle: React.FC<ToggleProps> = ({ 
  checked, 
  onChange, 
  disabled = false,
  'aria-label': ariaLabel
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative flex w-[40px] h-[20px] p-[2px] items-center rounded-full shrink-0 transition-colors duration-300 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1
        ${checked ? 'bg-accent' : 'bg-stroke-light'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span
        className={`
          w-[16px] h-[16px] shrink-0 bg-white rounded-full 
          shadow-sm
          transform transition-transform duration-300 ease-in-out
          ${checked ? 'translate-x-[20px]' : 'translate-x-0'}
        `}
      />
    </button>
  );
};