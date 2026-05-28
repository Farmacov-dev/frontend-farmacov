// src/components/composed/CrearRolModal/CrearRolModal.tsx
// angel

import { useState, useId } from "react";
import ModalContainer from "../ModalContainer/ModalContainer";
import InputField from "../../primary/InputField/InputField";
import Button from "../../primary/Button/Button";
import { useCrearRol } from "../../../hooks/useRoles";

interface CrearRolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CrearRolModal({ isOpen, onClose }: CrearRolModalProps) {
  const [nuevoRolNombre, setNuevoRolNombre] = useState("");
  const [esAdmin, setEsAdmin] = useState(false);
  const { mutate: crearNuevoRol, isPending: creando } = useCrearRol();
  const checkboxId = useId();

  const handleCerrar = () => {
    setNuevoRolNombre("");
    setEsAdmin(false);
    onClose();
  };

  const handleCrear = () => {
    if (!nuevoRolNombre.trim()) return;

    crearNuevoRol(
      { nombre: nuevoRolNombre, esAdmin },
      {
        onSuccess: () => {
          handleCerrar();
        },
        onError: () => {
          alert("Hubo un error al crear el rol. Verifica los datos y la conexión.");
        },
      }
    );
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={handleCerrar}>
      <div className="flex flex-col gap-6 w-full max-w-[400px]">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-dark font-inter">Crear Nuevo Rol</h2>
          <p className="text-sm text-muted font-inter">
            Ingresa el nombre para el nuevo nivel de acceso.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <InputField
            label="Nombre del Rol"
            placeholder="Ej. Auditor Médico"
            value={nuevoRolNombre}
            onChange={(e) => setNuevoRolNombre(e.target.value)}
            disabled={creando}
          />

          {/* CHECKBOX PARA ADMINISTRADOR */}
          <label htmlFor={checkboxId} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                id={checkboxId}
                type="checkbox"
                checked={esAdmin}
                onChange={(e) => setEsAdmin(e.target.checked)}
                disabled={creando}
                className="peer appearance-none w-5 h-5 border border-stroke-dark rounded bg-white checked:bg-primary checked:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-all cursor-pointer disabled:opacity-50"
              />
              <svg 
                className="absolute w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-inter text-[14px] text-dark transition-colors select-none">
              Otorgar privilegios de Administrador
            </span>
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="ghost" onClick={handleCerrar} disabled={creando}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleCrear}
            disabled={!nuevoRolNombre.trim() || creando}
          >
            {creando ? "Creando..." : "Crear Rol"}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}