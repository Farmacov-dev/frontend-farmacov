import { useState, useEffect } from "react";
import ModalContainer from "../ModalContainer/ModalContainer";
import InputField from "../../primary/InputField/InputField";
import Button from "../../primary/Button/Button";

interface RegistroDetalleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  itemToEdit?: any; // Si viene lleno, estamos editando
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

  // Estados
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

  const handleSubmit = () => {
    if (tipo === "costos") {
      if (!costo) return;
      onSubmit({ costoUnitario: parseFloat(costo) });
    } else {
      if (!temperatura) return;
      onSubmit({
        temperatura: parseFloat(temperatura),
        // Si está vacío, lo mandamos como null para respetar el backend
        tiempoAmbiente: tiempoAmbiente.trim() ? parseFloat(tiempoAmbiente) : null, 
      });
    }
  };

  const isCostosFormValid = !!costo.trim();
  const isCondicionesFormValid = !!temperatura.trim();
  const isValid = tipo === "costos" ? isCostosFormValid : isCondicionesFormValid;

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6 w-[400px]">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-dark font-inter capitalize">
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
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>Cancelar</Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!isValid || isLoading}>
            {isLoading ? "Guardando..." : isEditing ? "Guardar Cambios" : "Crear Registro"}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}