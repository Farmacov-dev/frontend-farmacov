import { useState, useEffect } from "react";
import ModalContainer from "../ModalContainer/ModalContainer";
import InputField from "../../primary/InputField/InputField";
import Button from "../../primary/Button/Button";
import type { Vacuna, CrearVacunaDTO } from "../../../services/admin/adminVacunas";
import type { Farmaco } from "../../../services/admin/adminFarmacos";

interface VacunaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (idManual: number | undefined, data: CrearVacunaDTO) => void;
  vacunaToEdit?: Vacuna | null;
  farmacoActivo: Farmaco; // Necesitamos saber de qué fármaco viene
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

  // Estados del formulario
  const [idManual, setIdManual] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcionGeneral, setDescripcionGeneral] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (vacunaToEdit) {
        setNombre(vacunaToEdit.nombre);
        setTipo(vacunaToEdit.tipo);
        setDescripcionGeneral(""); // El GET list no trae descripción, queda en blanco para rellenar
        setIdManual("");
      } else {
        setNombre("");
        setTipo("");
        setDescripcionGeneral("");
        setIdManual("");
      }
    }
  }, [isOpen, vacunaToEdit]);

  const handleSubmit = () => {
    if (!nombre.trim() || !tipo.trim()) return;
    if (!isEditing && !idManual.trim()) return;
    
    onSubmit(
      isEditing ? undefined : Number(idManual),
      {
        idFarmaco: farmacoActivo.id,
        farmaceutica: farmacoActivo.nombre, // Heredado automáticamente
        nombre,
        tipo,
        descripcionGeneral,
      }
    );
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6 w-[450px]">
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

          <div className="flex flex-col items-start gap-[10px] w-full">
            <span className="font-inter text-[16px] font-medium leading-[24px] text-dark">
              Descripción General
            </span>
            <textarea
              value={descripcionGeneral}
              onChange={(e) => setDescripcionGeneral(e.target.value)}
              disabled={isLoading}
              rows={3}
              placeholder="Vacuna contra..."
              className="w-full px-[20px] py-[12px] rounded-card bg-white border border-stroke text-dark font-inter text-[16px] placeholder:text-slate-400 focus:border-[#5B84E9] focus:outline-none transition-colors resize-none disabled:opacity-50"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>Cancelar</Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!nombre.trim() || !tipo.trim() || (!isEditing && !idManual.trim()) || isLoading}
          >
            {isLoading ? "Guardando..." : isEditing ? "Guardar" : "Crear Vacuna"}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}