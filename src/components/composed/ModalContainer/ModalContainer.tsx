// src/components/composed/ModalContainer/ModalContainer.tsx
// angel

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

interface ModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
}

export default function ModalContainer({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  className = "",
}: ModalContainerProps) {
  // Estado para asegurarnos de que el portal solo se renderice del lado del cliente
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (!isOpen) return;

    // Bloquear scroll del fondo
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup al cerrar o desmontar
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Si no está abierto o no se ha montado el componente, no renderizamos nada
  if (!isOpen || !mounted) return null;

  // createPortal inyecta este HTML directamente al <body> de la página
  return createPortal(
    <div
      // subida de z index para asegurar que el modal esté por encima de otros elementos.
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`
          relative flex flex-col items-start
          w-full sm:w-auto max-w-full sm:max-w-[90vw]
          max-h-[90vh] overflow-y-auto
          p-6 sm:p-10
          bg-white rounded-card
          shadow-modal
          animate-fadeIn
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="
              absolute top-4 right-4
              text-muted hover:text-dark
              transition-colors duration-150
              rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
            "
            aria-label="Cerrar modal"
          >
            <IoClose size={24} aria-hidden="true" />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body 
  );
}