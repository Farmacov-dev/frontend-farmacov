// src/components/composed/LogoutConfirmationModal/LogoutConfirmationModal.tsx

import ModalContainer from "../ModalContainer/ModalContainer";
import Button from "../../primary/Button/Button";

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmationModalProps) {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} showCloseButton={false}>
      <div className="
        flex flex-col items-center gap-[25px] w-full pt-[30px]">
        {/* texto */}
        <p className="
          text-negro font-inter text-[20px] font-medium
          text-center leading-normal
        ">
          ¿Está seguro de cerrar sesión?
        </p>

        {/* botones */}
        <div className="flex items-center gap-[100px]">
          <Button variant="primary" onClick={onConfirm}>
            Cerrar Sesión
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}