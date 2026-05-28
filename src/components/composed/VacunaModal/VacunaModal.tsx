// src/components/composed/VacunaModal/VacunaModal.tsx
// angel

import { useState, useEffect } from "react";
import ModalContainer from "../ModalContainer/ModalContainer";
import InputField from "../../primary/InputField/InputField";
import TextAreaField from "../../primary/TextAreaField/TextAreaField";
import Button from "../../primary/Button/Button";
import type { Vacuna, CrearVacunaDTO } from "../../../services/admin/adminVacunas";
import type { Farmaco } from "../../../services/admin/adminFarmacos";

interface VacunaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (idManual: number | undefined, data: CrearVacunaDTO) => void;
  vacunaToEdit?: Vacuna | null;
  farmacoActivo: Farmaco; 
  isLoading: boolean;
}

export default function VacunaModal({
  isOpen,
  onClose,
  onSubmit,
  vacunaToEdit,
  farmacoActivo,
  isLoading,
}: VacunaModalProps) {
  const isEditing = !!vacunaToEdit;

  const [idManual, setIdManual] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcionGeneral, setDescripcionGeneral] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (vacunaToEdit) {
        setNombre(vacunaToEdit.nombre);
        setTipo(vacunaToEdit.tipo);
        setDescripcionGeneral(""); 
        setIdManual("");
      } else {
        setNombre("");
        setTipo("");
        setDescripcionGeneral("");
        setIdManual("");
      }
    }
  }, [isOpen, vacunaToEdit]);

  const handleSubmit = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();

    if (!nombre.trim() || !tipo.trim()) return;
    if (!isEditing && !idManual.trim()) return;
    
    onSubmit(
      isEditing ? undefined : Number(idManual),
      {
        idFarmaco: farmacoActivo.id,
        farmaceutica: farmacoActivo.nombre,
        nombre,
        tipo,
        descripcionGeneral,
      }
    );
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-[450px]">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-dark font-inter">
            {isEditing ? "Editar Vacuna" : `Nueva Vacuna para ${farmacoActivo.nombre}`}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {!isEditing && (
            <InputField
              label="ID de la Vacuna (Manual) *"
              type="number"
              placeholder="Ej. 1"
              value={idManual}
              onChange={(e) => setIdManual(e.target.value)}
              disabled={isLoading}
            />
          )}

          <InputField
            label="Nombre Comercial *"
            placeholder="Ej. Comirnaty"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={isLoading}
          />

          <InputField
            label="Tipo de Vacuna *"
            placeholder="Ej. ARNm, Vector Viral"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            disabled={isLoading}
          />

          <TextAreaField
            label="Descripción General"
            placeholder="Vacuna contra..."
            value={descripcionGeneral}
            onChange={(e) => setDescripcionGeneral(e.target.value)}
            disabled={isLoading}
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!nombre.trim() || !tipo.trim() || (!isEditing && !idManual.trim()) || isLoading}
          >
            {isLoading ? "Guardando..." : isEditing ? "Guardar" : "Crear Vacuna"}
          </Button>
        </div>
      </form>
    </ModalContainer>
  );
}