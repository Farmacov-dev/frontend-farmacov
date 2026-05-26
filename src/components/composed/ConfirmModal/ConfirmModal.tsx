// src/components/composed/ConfirmModal/ConfirmModal.tsx
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
  isDestructive?: boolean; // Si es true, el botón se vuelve rojo
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
      <div className="flex flex-col gap-4 w-[400px]">
        
        {/* Encabezado con Ícono y Textos */}
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full flex-shrink-0 ${isDestructive ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-[#5B84E9]'}`}>
            {isDestructive ? <AlertTriangle size={24} /> : <Info size={24} />}
          </div>
          <div className="flex flex-col gap-1 mt-1">
            <h2 className="text-lg font-bold text-dark font-inter">{title}</h2>
            <p className="text-sm text-slate-500 font-inter leading-relaxed">{message}</p>
          </div>
        </div>

        {/* Botones de Acción */}
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
            // Si es destructivo, sobreescribimos el azul por rojo nativo de Tailwind
            className={isDestructive ? "!bg-red-500 hover:!bg-red-600 !border-red-500" : ""}
          >
            {isLoading ? "Procesando..." : confirmText}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}