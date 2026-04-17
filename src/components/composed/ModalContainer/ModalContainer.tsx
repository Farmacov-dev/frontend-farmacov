// src/components/modals/ModalContainer/ModalContainer.tsx

import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface ModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export default function ModalContainer({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
}: ModalContainerProps) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="
          relative flex flex-col items-start gap-[30px]
          w-[466px] min-h-[288px]
          px-[40px] pt-[40px] pb-[40px] pl-[30px]
          bg-white rounded-card
          shadow-modal
          animate-fadeIn
        "
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="
              absolute top-4 right-4
              text-muted hover:text-dark
              transition-colors duration-150
              cursor-pointer
            "
            aria-label="Cerrar modal"
          >
            <IoClose size={20} />
          </button>
        )}

        {children}
      </div>
    </div>
  );
}