// src/components/composed/RegistroDetalleModal/RegistroDetalleModal.tsx
// angel

import { useState, useEffect } from "react";
import ModalContainer from "../ModalContainer/ModalContainer";
import InputField from "../../primary/InputField/InputField";
import Button from "../../primary/Button/Button";

// Definimos las formas exactas de los datos para eliminar los 'any'
export type DetallePayload = 
  | { costoUnitario: number }
  | { temperatura: number; tiempoAmbiente: number | null };

export type DetalleItem = Partial<{
  costoUnitario: number;
  temperatura: number;
  tiempoAmbiente: number | null;
}>;

interface RegistroDetalleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DetallePayload) => void;
  itemToEdit?: DetalleItem | null;
  tipo: "condiciones" | "costos";
  isLoading: boolean;
}

export default function RegistroDetalleModal({
  isOpen,
  onClose,
  onSubmit,
  itemToEdit,
  tipo,
  isLoading,
}: RegistroDetalleModalProps) {
  const isEditing = !!itemToEdit;

  // Estados locales 
  const [costo, setCosto] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [tiempoAmbiente, setTiempoAmbiente] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (itemToEdit) {
        setCosto(itemToEdit.costoUnitario?.toString() || "");
        setTemperatura(itemToEdit.temperatura?.toString() || "");
        setTiempoAmbiente(itemToEdit.tiempoAmbiente?.toString() || "");
      } else {
        setCosto("");
        setTemperatura("");
        setTiempoAmbiente("");
      }
    }
  }, [isOpen, itemToEdit, tipo]);

  // anadimos soporte para el evento 'submit' del formulario
  const handleSubmit = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();

    if (tipo === "costos") {
      if (!costo) return;
      onSubmit({ costoUnitario: parseFloat(costo) });
    } else {
      if (!temperatura) return;
      onSubmit({
        temperatura: parseFloat(temperatura),
        tiempoAmbiente: tiempoAmbiente.trim() ? parseFloat(tiempoAmbiente) : null, 
      });
    }
  };

  const isCostosFormValid = !!costo.trim();
  const isCondicionesFormValid = !!temperatura.trim();
  const isValid = tipo === "costos" ? isCostosFormValid : isCondicionesFormValid;

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-[400px]">
        
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-dark font-inter">
            {isEditing ? `Editar ${tipo === "costos" ? "Costo" : "Condición"}` : `Registrar ${tipo === "costos" ? "Costo" : "Condición"}`}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {tipo === "costos" && (
            <InputField
              label="Costo Unitario ($) *"
              type="number"
              placeholder="Ej. 299.99"
              value={costo}
              onChange={(e) => setCosto(e.target.value)}
              disabled={isLoading}
            />
          )}

          {tipo === "condiciones" && (
            <>
              <InputField
                label="Temperatura de Almacenamiento (°C) *"
                type="number"
                placeholder="Ej. -70"
                value={temperatura}
                onChange={(e) => setTemperatura(e.target.value)}
                disabled={isLoading}
              />
              <InputField
                label="Tiempo en Ambiente (Horas)"
                type="number"
                placeholder="Ej. 2 (Opcional)"
                value={tiempoAmbiente}
                onChange={(e) => setTiempoAmbiente(e.target.value)}
                disabled={isLoading}
              />
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={!isValid || isLoading}>
            {isLoading ? "Guardando..." : isEditing ? "Guardar Cambios" : "Crear Registro"}
          </Button>
        </div>
      </form>
    </ModalContainer>
  );
}