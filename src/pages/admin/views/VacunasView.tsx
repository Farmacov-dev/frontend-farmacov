// src/pages/admin/views/VacunasView.tsx
// angel

import { useState } from "react";
import Button from "../../../components/primary/Button/Button";
import { DataTable } from "../../../components/composed/DataTable/DataTable";
import type { Column } from "../../../components/composed/DataTable/DataTable";
import VacunaModal from "../../../components/composed/VacunaModal/VacunaModal";
import ConfirmModal from "../../../components/composed/ConfirmModal/ConfirmModal";
import type { Farmaco } from "../../../services/admin/adminFarmacos";
import { 
  useAdminVacunas, 
  useCrearVacuna, 
  useEditarVacuna, 
  useEliminarVacuna 
} from "../../../hooks/useAdminVacunas";
import { getVacuna } from "../../../services/admin/adminVacunas";
import type { Vacuna, CrearVacunaDTO } from "../../../services/admin/adminVacunas";

import { useQueryClient } from '@tanstack/react-query';

interface VacunasViewProps {
  farmacoActivo: Farmaco;
  onSelectVacuna: (vacuna: Vacuna) => void;
}

type VacunaRow = Vacuna & { id: number };

export default function VacunasView({ farmacoActivo, onSelectVacuna }: VacunasViewProps) {
  const queryClient = useQueryClient();

  const { data: vacunasTotales = [], isLoading, isError } = useAdminVacunas();
  const { mutate: crear, isPending: creando } = useCrearVacuna();
  const { mutate: editar, isPending: editando } = useEditarVacuna();
  const { mutate: eliminar, isPending: eliminando } = useEliminarVacuna();

  const vacunasFiltradas = vacunasTotales.filter(v => v.idFarmaco === farmacoActivo.id);
  const vacunasTableData: VacunaRow[] = vacunasFiltradas.map(v => ({
    ...v,
    id: v.idVacuna 
  }));

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [vacunaAEditar, setVacunaAEditar] = useState<Vacuna | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [vacunaAEliminar, setVacunaAEliminar] = useState<Vacuna | null>(null);
  
  const [cargandoEdicion, setCargandoEdicion] = useState(false); 
  const [actionError, setActionError] = useState<string | null>(null);

  const columns: Column<VacunaRow>[] = [
    { header: "ID", accessor: (row) => row.idVacuna, widthClass: "w-[80px]" },
    { header: "Nombre", accessor: (row) => <span className="font-semibold text-primary">{row.nombre}</span>, widthClass: "flex-[1.5]" },
  ];

  const handleOpenEditar = async (vacunaFila: VacunaRow) => {
    setActionError(null);
    setCargandoEdicion(true);
    try {
      const detalleCompleto = await queryClient.fetchQuery({
        queryKey: ['vacuna-detalle', vacunaFila.idVacuna],
        queryFn: () => getVacuna(vacunaFila.idVacuna),
        staleTime: 0 
      });

      setVacunaAEditar({
        ...detalleCompleto,
        idVacuna: vacunaFila.idVacuna,
        idFarmaco: farmacoActivo.id
      });
      
      setIsFormOpen(true);
    } catch (error) {
      console.error("Error obteniendo detalles", error);
      setActionError("No se pudo cargar la información completa de la vacuna desde el servidor.");
    } finally {
      setCargandoEdicion(false);
    }
  };

  const handleOpenCrear = () => {
    setActionError(null);
    setVacunaAEditar(null);
    setIsFormOpen(true);
  };

  const handleSubmitForm = (idManual: number | undefined, data: CrearVacunaDTO) => {
    setActionError(null);
    if (vacunaAEditar) {
      editar({ id: vacunaAEditar.idVacuna, vacuna: data }, { onSuccess: () => setIsFormOpen(false) });
    } else {
      crear({ id: idManual!, vacuna: data }, { onSuccess: () => setIsFormOpen(false) });
    }
  };

  const handleConfirmarEliminar = () => {
    if (!vacunaAEliminar) return;
    setActionError(null);
    eliminar(vacunaAEliminar.idVacuna, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setVacunaAEliminar(null);
      },
      onError: () => {
        setActionError(`No se pudo eliminar ${vacunaAEliminar.nombre}. Es probable que tenga reportes, síntomas o efectos secundarios ligados.`);
        setIsDeleteOpen(false);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn relative">
      
      {/* Overlay de carga */}
      {cargandoEdicion && (
        <div role="status" aria-live="polite" className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center rounded-xl backdrop-blur-[1px]">
          <span className="text-primary font-medium bg-white px-4 py-2 rounded-card shadow-modal border border-stroke animate-pulse">
            Obteniendo datos de la vacuna...
          </span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-dark font-inter">Vacunas Registradas</h2>
          <p className="text-sm text-muted font-inter mt-1">
            Administrando el catálogo de {farmacoActivo.nombre}
          </p>
        </div>
        <Button variant="primary" onClick={handleOpenCrear}>
          + Añadir Vacuna
        </Button>
      </div>

      {(isError || actionError) && (
        <div role="alert" className="p-4 text-red bg-red/10 border border-red/30 rounded-card text-sm font-medium">
          {actionError || "Error crítico al cargar las vacunas."}
        </div>
      )}

      {isLoading ? (
        <div role="status" aria-live="polite" className="text-muted text-sm py-4 animate-pulse">
          Cargando catálogo de vacunas...
        </div>
      ) : vacunasTableData.length === 0 && !isError ? (
        <div className="text-muted-light text-sm py-8 text-center border-2 border-dashed border-stroke rounded-card bg-surface">
          Este laboratorio aún no tiene vacunas registradas.
        </div>
      ) : (
        <DataTable 
          data={vacunasTableData} 
          columns={columns} 
          onEdit={handleOpenEditar} 
          onDelete={(v) => { 
            setActionError(null); 
            setVacunaAEliminar(v); 
            setIsDeleteOpen(true); 
          }}
          onRowClick={(v) => onSelectVacuna(v)} 
        />
      )}

      {/* Modales */}
      <VacunaModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitForm}
        vacunaToEdit={vacunaAEditar}
        farmacoActivo={farmacoActivo}
        isLoading={creando || editando}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmarEliminar}
        title="Eliminar Vacuna"
        message={`¿Estás seguro de eliminar ${vacunaAEliminar?.nombre}? Esta acción no se puede deshacer y fallará si tiene reportes existentes.`}
        isDestructive={true}
        isLoading={eliminando}
      />
    </div>
  );
}