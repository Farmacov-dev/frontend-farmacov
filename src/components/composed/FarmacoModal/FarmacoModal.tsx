// src/components/composed/FarmacoModal/FarmacoModal.tsx
import { useState, useEffect } from "react";
import ModalContainer from "../ModalContainer/ModalContainer";
import InputField from "../../primary/InputField/InputField";
import Button from "../../primary/Button/Button";
import type { Farmaco, CrearFarmacoDTO } from "../../../services/admin/adminFarmacos";

interface FarmacoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CrearFarmacoDTO) => void;
  farmacoToEdit?: Farmaco | null; // Si viene lleno, estamos editando
  isLoading: boolean;
}

export default function FarmacoModal({
  isOpen,
  onClose,
  onSubmit,
  farmacoToEdit,
  isLoading,
}: FarmacoModalProps) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const isEditing = !!farmacoToEdit;

  // Si estamos editando, llenamos los campos automáticamente cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      if (farmacoToEdit) {
        setNombre(farmacoToEdit.nombre);
        setTipo(farmacoToEdit.tipo);
        setDescripcion(farmacoToEdit.descripcion);
      } else {
        setNombre("");
        setTipo("");
        setDescripcion("");
      }
    }
  }, [isOpen, farmacoToEdit]);

  const handleSubmit = () => {
    if (!nombre.trim() || !tipo.trim()) return;
    
    onSubmit({
      nombre,
      tipo,
      descripcion,
    });
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6 w-[400px]">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-dark font-inter">
            {isEditing ? "Editar Fármaco" : "Crear Nuevo Fármaco"}
          </h2>
          <p className="text-sm text-slate-500 font-inter">
            {isEditing 
              ? "Modifica los detalles del laboratorio o fabricante." 
              : "Ingresa los datos del nuevo laboratorio."}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <InputField
            label="Nombre del Laboratorio *"
            placeholder="Ej. Pfizer Inc"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={isLoading}
          />

          <InputField
            label="Tipo de Fármaco *"
            placeholder="Ej. Biológico, ARNm, Vector Viral"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            disabled={isLoading}
          />

          {/* Usamos un textarea nativo estilizado como tu InputField para descripciones largas */}
          <div className="flex flex-col items-start gap-[10px] w-full">
            <span className="font-inter text-[16px] font-medium leading-[24px] text-dark">
              Descripción
            </span>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              disabled={isLoading}
              rows={3}
              placeholder="Descripción del fabricante..."
              className="w-full px-[20px] py-[12px] rounded-card bg-white border border-stroke text-dark font-inter text-[16px] placeholder:text-slate-400 focus:border-[#5B84E9] focus:outline-none transition-colors resize-none disabled:opacity-50"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!nombre.trim() || !tipo.trim() || isLoading}
          >
            {isLoading ? "Guardando..." : isEditing ? "Guardar Cambios" : "Crear Fármaco"}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}