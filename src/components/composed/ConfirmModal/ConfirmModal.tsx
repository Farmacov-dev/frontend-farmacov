// src/components/composed/ConfirmModal/ConfirmModal.tsx
// angel

import ModalContainer from "../ModalContainer/ModalContainer";
import Button from "../../primary/Button/Button";
import { AlertTriangle, Info } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isDestructive = false,
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} showCloseButton={!isLoading}>
      <div className="flex flex-col gap-4 w-full max-w-[400px]">
        
        <div className="flex items-start gap-4">
          <div className={`
            p-3 rounded-full flex-shrink-0 
            ${isDestructive ? 'bg-red/10 text-red' : 'bg-primary/10 text-primary'}
          `}>
            {isDestructive 
              ? <AlertTriangle size={24} aria-hidden="true" /> 
              : <Info size={24} aria-hidden="true" />
            }
          </div>
          <div className="flex flex-col gap-1 mt-1">
            <h2 className="text-lg font-bold text-dark font-inter">{title}</h2>
            <p className="text-sm text-muted font-inter leading-relaxed">{message}</p>
          </div>
        </div>

        {/* Botones  */}
        <div className="flex justify-end gap-3 mt-4">
          <Button 
            variant="ghost" 
            onClick={onClose} 
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            disabled={isLoading}
            className={isDestructive ? "bg-red hover:bg-red/90 border-red text-white" : ""}
          >
            {isLoading ? "Procesando..." : confirmText}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}