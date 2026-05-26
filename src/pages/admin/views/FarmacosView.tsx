// src/pages/admin/views/FarmacosView.tsx
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

  // Estados para controlar los Modales
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [farmacoAEditar, setFarmacoAEditar] = useState<Farmaco | null>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [farmacoAEliminar, setFarmacoAEliminar] = useState<Farmaco | null>(null);

  // Columnas de la tabla
  const columns: Column<Farmaco>[] = [
    { header: "ID", accessor: (row) => row.id, widthClass: "w-[80px]" },
    { header: "Laboratorio", accessor: (row) => <span className="font-semibold text-dark">{row.nombre}</span>, widthClass: "flex-1" },
    { header: "Tipo", accessor: (row) => row.tipo, widthClass: "w-[150px]" },
    { header: "Descripción", accessor: (row) => <span className="truncate max-w-[300px] block" title={row.descripcion}>{row.descripcion}</span>, widthClass: "flex-[2]" },
  ];

  // --- HANDLERS DE ACCIONES ---

  // Botón Nuevo Fármaco
  const handleOpenCrear = () => {
    setFarmacoAEditar(null);
    setIsFormModalOpen(true);
  };

  // Botón Lápiz (Editar) en la tabla
  const handleOpenEditar = (farmaco: Farmaco) => {
    setFarmacoAEditar(farmaco);
    setIsFormModalOpen(true);
  };

  // Enviar el Formulario (Sirve para Crear y Editar)
  const handleFormSubmit = (data: CrearFarmacoDTO) => {
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

  // Botón Basura (Eliminar) en la tabla
  const handleOpenEliminar = (farmaco: Farmaco) => {
    setFarmacoAEliminar(farmaco);
    setIsDeleteModalOpen(true);
  };

  // Confirmar Eliminación
  const handleConfirmarEliminar = () => {
    if (!farmacoAEliminar) return;
    
    eliminarFarmaco(farmacoAEliminar.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setFarmacoAEliminar(null);
      },
      onError: () => {
        alert("No se pudo eliminar el fármaco. Es probable que tenga vacunas registradas que dependen de él.");
        setIsDeleteModalOpen(false);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Cabecera y Botón Crear */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-dark font-inter">Directorio de Fármacos</h2>
        <Button variant="primary" onClick={handleOpenCrear} className="!py-[8px] !px-[16px]">
          + Nuevo Fármaco
        </Button>
      </div>

      <p className="text-sm text-slate-500 font-inter -mt-4">
        Selecciona un laboratorio para administrar sus vacunas registradas.
      </p>

      {/* Manejo de estados de la tabla */}
      {isError && (
        <div className="p-4 text-red-500 bg-red-50 rounded-card border border-red-200">
          Error al cargar los fármacos.
        </div>
      )}

      {isLoading ? (
        <div className="text-muted text-sm py-4">Cargando fármacos...</div>
      ) : (
        <DataTable 
          data={farmacos} 
          columns={columns} 
          onEdit={handleOpenEditar}
          onDelete={handleOpenEliminar}
          onRowClick={(farmaco) => onSelectFarmaco(farmaco)} // Esto entra a Nivel 2
        />
      )}

      {/* --- MODALES INYECTADOS --- */}
      
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
        message={`¿Estás seguro de que deseas eliminar a ${farmacoAEliminar?.nombre}? Esta acción no se puede deshacer y fallará si el fármaco tiene vacunas asignadas.`}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        isDestructive={true}
        isLoading={eliminando}
      />
    </div>
  );
}