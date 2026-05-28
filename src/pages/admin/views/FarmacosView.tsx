// src/pages/admin/views/FarmacosView.tsx
// angel

import { useState } from "react";
import Button from "../../../components/primary/Button/Button";
import { DataTable } from "../../../components/composed/DataTable/DataTable";
import type { Column } from "../../../components/composed/DataTable/DataTable";

// Importamos los Modales
import FarmacoModal from "../../../components/composed/FarmacoModal/FarmacoModal";
import ConfirmModal from "../../../components/composed/ConfirmModal/ConfirmModal";

// Importamos Hooks y Tipos
import { 
  useFarmacos, 
  useCrearFarmaco, 
  useEditarFarmaco, 
  useEliminarFarmaco 
} from "../../../hooks/useFarmacos";
import type { Farmaco, CrearFarmacoDTO } from "../../../services/admin/adminFarmacos";

interface FarmacosViewProps {
  onSelectFarmaco: (farmaco: Farmaco) => void;
}

export default function FarmacosView({ onSelectFarmaco }: FarmacosViewProps) {
  // Peticiones
  const { data: farmacos = [], isLoading, isError } = useFarmacos();
  const { mutate: crearFarmaco, isPending: creando } = useCrearFarmaco();
  const { mutate: editarFarmaco, isPending: editando } = useEditarFarmaco();
  const { mutate: eliminarFarmaco, isPending: eliminando } = useEliminarFarmaco();

  // Estados para controlar los Modales y Errores
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [farmacoAEditar, setFarmacoAEditar] = useState<Farmaco | null>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [farmacoAEliminar, setFarmacoAEliminar] = useState<Farmaco | null>(null);
  
  const [actionError, setActionError] = useState<string | null>(null);

  // Columnas de la tabla
  const columns: Column<Farmaco>[] = [
    { header: "ID", accessor: (row) => row.id, widthClass: "w-[80px]" },
    { header: "Laboratorio", accessor: (row) => <span className="font-semibold text-dark">{row.nombre}</span>, widthClass: "flex-1" },
    { header: "Tipo", accessor: (row) => row.tipo, widthClass: "w-[150px]" },
    { header: "Descripción", accessor: (row) => <span className="truncate max-w-[300px] block" title={row.descripcion}>{row.descripcion}</span>, widthClass: "flex-[2]" },
  ];

  // handlers

  const handleOpenCrear = () => {
    setActionError(null);
    setFarmacoAEditar(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditar = (farmaco: Farmaco) => {
    setActionError(null);
    setFarmacoAEditar(farmaco);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (data: CrearFarmacoDTO) => {
    setActionError(null);
    if (farmacoAEditar) {
      editarFarmaco(
        { id: farmacoAEditar.id, farmaco: data },
        { onSuccess: () => setIsFormModalOpen(false) }
      );
    } else {
      crearFarmaco(
        data,
        { onSuccess: () => setIsFormModalOpen(false) }
      );
    }
  };

  const handleOpenEliminar = (farmaco: Farmaco) => {
    setActionError(null);
    setFarmacoAEliminar(farmaco);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmarEliminar = () => {
    if (!farmacoAEliminar) return;
    
    eliminarFarmaco(farmacoAEliminar.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setFarmacoAEliminar(null);
        setActionError(null);
      },
      onError: () => {
        setActionError(`No se pudo eliminar a ${farmacoAEliminar.nombre}. Es probable que tenga vacunas registradas que dependen de él.`);
        setIsDeleteModalOpen(false);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Cabecera y Botón Crear */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-dark font-inter">Directorio de Fármacos</h2>
        <Button variant="primary" onClick={handleOpenCrear}>
          + Nuevo Fármaco
        </Button>
      </div>

      <p className="text-sm text-muted font-inter -mt-2">
        Selecciona un laboratorio para administrar sus vacunas registradas.
      </p>

      {/* Manejo de estados de error combinados  */}
      {(isError || actionError) && (
        <div role="alert" className="p-4 text-red bg-red/10 rounded-card border border-red/30 text-sm font-medium">
          {actionError || "Error crítico al cargar la lista de fármacos desde el servidor."}
        </div>
      )}

      {/* Manejo de estados de la tabla */}
      {isLoading ? (
        <div role="status" aria-live="polite" className="text-muted text-sm py-4 animate-pulse">
          Cargando fármacos...
        </div>
      ) : farmacos.length === 0 && !isError ? (
        <div className="text-muted-light text-sm py-8 text-center border-2 border-dashed border-stroke rounded-card bg-surface">
          No hay fármacos registrados en el sistema.
        </div>
      ) : (
        <DataTable 
          data={farmacos} 
          columns={columns} 
          onEdit={handleOpenEditar}
          onDelete={handleOpenEliminar}
          onRowClick={(farmaco) => onSelectFarmaco(farmaco)} 
        />
      )}

      {/* modales */}
      <FarmacoModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        farmacoToEdit={farmacoAEditar}
        isLoading={creando || editando}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmarEliminar}
        title="Eliminar Fármaco"
        message={`¿Estás seguro de que deseas eliminar a ${farmacoAEliminar?.nombre}? Esta acción no se puede deshacer y fallará si el laboratorio tiene vacunas asignadas.`}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        isDestructive={true}
        isLoading={eliminando}
      />
    </div>
  );
}