// src/pages/admin/views/VacunasView.tsx
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

  const columns: Column<VacunaRow>[] = [
    { header: "ID", accessor: (row) => row.idVacuna, widthClass: "w-[80px]" },
    { header: "Nombre", accessor: (row) => <span className="font-semibold text-[#5B84E9]">{row.nombre}</span>, widthClass: "flex-[1.5]" },
  ];

  const handleOpenEditar = async (vacunaFila: VacunaRow) => {
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
      alert("No se pudo cargar la información de la vacuna desde el servidor.");
    } finally {
      setCargandoEdicion(false);
    }
  };

  const handleOpenCrear = () => {
    setVacunaAEditar(null);
    setIsFormOpen(true);
  };

  const handleSubmitForm = (idManual: number | undefined, data: CrearVacunaDTO) => {
    if (vacunaAEditar) {
      editar({ id: vacunaAEditar.idVacuna, vacuna: data }, { onSuccess: () => setIsFormOpen(false) });
    } else {
      crear({ id: idManual!, vacuna: data }, { onSuccess: () => setIsFormOpen(false) });
    }
  };

  const handleConfirmarEliminar = () => {
    if (!vacunaAEliminar) return;
    eliminar(vacunaAEliminar.idVacuna, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setVacunaAEliminar(null);
      },
      onError: () => alert("No se pudo eliminar. Puede que tenga reportes o efectos secundarios ligados.")
    });
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn relative">
      
      {/* Overlay de carga */}
      {cargandoEdicion && (
        <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center rounded-xl">
          <span className="text-[#5B84E9] font-medium bg-white px-4 py-2 rounded-card shadow-sm border border-stroke-light">
            Obteniendo datos...
          </span>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-dark font-inter">Vacunas Registradas</h2>
          <p className="text-sm text-slate-500 font-inter mt-1">
            Administrando el catálogo de {farmacoActivo.nombre}
          </p>
        </div>
        <Button variant="primary" onClick={handleOpenCrear} className="!py-[8px] !px-[16px]">
          + Añadir Vacuna
        </Button>
      </div>

      {isError && <div className="p-4 text-red-500 bg-red-50 rounded-card">Error al cargar las vacunas.</div>}

      {isLoading ? (
        <div className="text-muted text-sm py-4">Cargando catálogo...</div>
      ) : (
        <DataTable 
          data={vacunasTableData} 
          columns={columns} 
          onEdit={handleOpenEditar} 
          onDelete={(v) => { setVacunaAEliminar(v); setIsDeleteOpen(true); }}
          onRowClick={(v) => onSelectVacuna(v)} 
        />
      )}

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
        message={`¿Estás seguro de eliminar ${vacunaAEliminar?.nombre}? Esta acción fallará si tiene reportes existentes.`}
        isDestructive={true}
        isLoading={eliminando}
      />
    </div>
  );
}