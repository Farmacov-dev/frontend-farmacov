// src/pages/admin/views/VacunaDetallesView.tsx
// angel

import { useState } from "react";
import type { ReactNode } from "react";
import Button from "../../../components/primary/Button/Button";
import { DataTable } from "../../../components/composed/DataTable/DataTable";
import type { Column } from "../../../components/composed/DataTable/DataTable";
import Tabs from "../../../components/composed/Tabs/Tabs"; 
import type { TabItem } from "../../../components/composed/Tabs/Tabs";
import ConfirmModal from "../../../components/composed/ConfirmModal/ConfirmModal";
import TagBadge from "../../../components/shared/TagBadge"; 
import RegistroDetalleModal from "../../../components/composed/RegistroDetalleModal/RegistroDetalleModal"; 
import type { Vacuna } from "../../../services/admin/adminVacunas";

import { 
  useCostosVacuna, useCondicionesVacuna, useEfectosSecundarios, useSintomasGraves,
  useEliminarCondicion, useEliminarCosto, useEliminarEfecto, useEliminarSintoma,
  useCrearCosto, useEditarCosto, useCrearCondicion, useEditarCondicion
} from "../../../hooks/useAdminDetallesVacuna";

// Tipados estrictos para las filas de las diferentes tablas
interface CondicionRow { id: number; temperatura: number; tiempoAmbiente: number | null; }
interface CostoRow { id: number; costoUnitario: number; }
interface EfectoRow { id: number; descripcion: string; severidad: string; }
interface SintomaRow { id: number; nombre: string; }

// Tipado para el formulario unificado
type FormRow = CondicionRow | CostoRow;

interface VacunaDetallesViewProps {
  vacunaActiva: Vacuna;
}

export default function VacunaDetallesView({ vacunaActiva }: VacunaDetallesViewProps) {
  const [tabActivo, setTabActivo] = useState<string>("condiciones");

  const { data: condiciones = [], isLoading: loadCondiciones } = useCondicionesVacuna(vacunaActiva.idVacuna);
  const { data: costos = [], isLoading: loadCostos } = useCostosVacuna(vacunaActiva.idVacuna);
  const { data: efectos = [], isLoading: loadEfectos } = useEfectosSecundarios(vacunaActiva.idVacuna);
  const { data: sintomas = [], isLoading: loadSintomas } = useSintomasGraves(vacunaActiva.idVacuna);

  // Mutaciones
  const { mutate: delCondicion, isPending: pDelCond } = useEliminarCondicion();
  const { mutate: delCosto, isPending: pDelCosto } = useEliminarCosto();
  const { mutate: delEfecto, isPending: pDelEfecto } = useEliminarEfecto();
  const { mutate: delSintoma, isPending: pDelSintoma } = useEliminarSintoma();

  const { mutate: crearCosto, isPending: pCrearCosto } = useCrearCosto();
  const { mutate: editCosto, isPending: pEditCosto } = useEditarCosto();
  const { mutate: crearCondicion, isPending: pCrearCond } = useCrearCondicion();
  const { mutate: editCondicion, isPending: pEditCond } = useEditarCondicion();

  // Tipos estrictos para los estados de los modales
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: number | null; tipo: string }>({ isOpen: false, id: null, tipo: "" });
  const [formModal, setFormModal] = useState<{ isOpen: boolean; row: FormRow | null }>({ isOpen: false, row: null });

  const efectosTop50 = efectos.slice(0, 50);
  const sintomasTop50 = sintomas.slice(0, 50);

  const TABS: TabItem[] = [
    { id: "condiciones", label: "Condiciones Técnicas" },
    { id: "costos", label: "Registro de Costos" },
    { id: "efectos", label: "Efectos Secundarios" },
    { id: "sintomas", label: "Síntomas Graves" },
  ];

  const colsCondiciones: Column<CondicionRow>[] = [
    { header: "ID", accessor: (row) => row.id, widthClass: "w-[80px]" },
    { header: "Temperatura", accessor: (row) => `${row.temperatura}°C`, widthClass: "flex-1" },
    { header: "T. Ambiente", accessor: (row) => row.tiempoAmbiente ? `${row.tiempoAmbiente} hrs` : "N/A", widthClass: "flex-1" },
  ];

  const colsCostos: Column<CostoRow>[] = [
    { header: "ID", accessor: (row) => row.id, widthClass: "w-[80px]" },
    { header: "Costo Unitario", accessor: (row) => <span className="font-semibold text-green-600">${row.costoUnitario}</span>, widthClass: "flex-1" },
  ];

  const colsEfectos: Column<EfectoRow>[] = [
    { header: "ID", accessor: (row) => row.id, widthClass: "w-[80px]" },
    { header: "Descripción", accessor: (row) => <span className="font-semibold text-dark">{row.descripcion}</span>, widthClass: "flex-1" },
    { 
      header: "Severidad", 
      accessor: (row) => {
        const sev = row.severidad?.toLowerCase() || '';
        const tone = sev === 'grave' ? 'red' : sev === 'moderado' ? 'yellow' : 'blue';
        return <TagBadge label={row.severidad || 'N/D'} tone={tone} variant="soft" />;
      }, 
      widthClass: "w-[150px]" 
    },
  ];

  const colsSintomas: Column<SintomaRow>[] = [
    { header: "ID", accessor: (row) => row.id, widthClass: "w-[80px]" },
    { header: "Síntoma", accessor: (row) => <span className="font-semibold text-dark">{row.nombre}</span>, widthClass: "flex-1" },
  ];

  // --- HANDLERS ---
  const handleOpenCrear = () => setFormModal({ isOpen: true, row: null });
  const handleOpenEditar = (row: FormRow) => setFormModal({ isOpen: true, row });
  const handleOpenEliminar = (id: number, tipoTabla: string) => setDeleteModal({ isOpen: true, id, tipo: tipoTabla });

  const handleSubmitForm = (data: Omit<FormRow, "id">) => {
    const payload = { ...data, idVacuna: vacunaActiva.idVacuna };
    const onSuccess = () => setFormModal({ isOpen: false, row: null });

    if (formModal.row) {
      if (tabActivo === "costos") editCosto({ id: formModal.row.id, data: payload }, { onSuccess });
      if (tabActivo === "condiciones") editCondicion({ id: formModal.row.id, data: payload }, { onSuccess });
    } else {
      if (tabActivo === "costos") crearCosto(payload, { onSuccess });
      if (tabActivo === "condiciones") crearCondicion(payload, { onSuccess });
    }
  };

  const handleConfirmarEliminar = () => {
    if (!deleteModal.id) return;
    const { id, tipo } = deleteModal;
    const onSuccess = () => setDeleteModal({ isOpen: false, id: null, tipo: "" });

    switch (tipo) {
      case "condiciones": delCondicion(id, { onSuccess }); break;
      case "costos": delCosto(id, { onSuccess }); break;
      case "efectos": delEfecto(id, { onSuccess }); break;
      case "sintomas": delSintoma(id, { onSuccess }); break;
    }
  };

  const isDeleting = pDelCond || pDelCosto || pDelEfecto || pDelSintoma;
  const isSaving = pCrearCosto || pEditCosto || pCrearCond || pEditCond;

  const canAdd = tabActivo === "costos" || tabActivo === "condiciones";

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-dark font-inter">
            Centro de Control: {vacunaActiva.nombre}
          </h2>
          <p className="text-sm text-muted font-inter">
            Gestionando especificaciones y métricas clínicas.
          </p>
        </div>
        
        {/* Aquí estaba el error de JSX. El comentario ahora está afuera de la expresión. */}
        {canAdd && (
          <Button variant="primary" onClick={handleOpenCrear}>
            + Añadir Registro
          </Button>
        )}
      </div>

      <Tabs tabs={TABS} activeTab={tabActivo} onTabChange={setTabActivo} />

      <div className="pt-2">
        {tabActivo === "condiciones" && isLoadingWrapper(loadCondiciones, () => (
          <DataTable data={condiciones} columns={colsCondiciones} onEdit={handleOpenEditar} onDelete={(r) => handleOpenEliminar(r.id, "condiciones")} />
        ))}

        {tabActivo === "costos" && isLoadingWrapper(loadCostos, () => (
          <DataTable data={costos} columns={colsCostos} onEdit={handleOpenEditar} onDelete={(r) => handleOpenEliminar(r.id, "costos")} />
        ))}

        {tabActivo === "efectos" && isLoadingWrapper(loadEfectos, () => (
          <DataTable data={efectosTop50} columns={colsEfectos} onDelete={(r) => handleOpenEliminar(r.id, "efectos")} />
        ))}

        {tabActivo === "sintomas" && isLoadingWrapper(loadSintomas, () => (
          <DataTable data={sintomasTop50} columns={colsSintomas} onDelete={(r) => handleOpenEliminar(r.id, "sintomas")} />
        ))}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null, tipo: "" })}
        onConfirm={handleConfirmarEliminar}
        title={`Eliminar registro`}
        message={`¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.`}
        isDestructive={true}
        isLoading={isDeleting}
      />

      <RegistroDetalleModal
        isOpen={formModal.isOpen}
        onClose={() => setFormModal({ isOpen: false, row: null })}
        onSubmit={handleSubmitForm}
        itemToEdit={formModal.row}
        tipo={tabActivo as "condiciones" | "costos"}
        isLoading={isSaving}
      />
    </div>
  );
}

// Roles ARIA añadidos para mejor accesibilidad durante la carga
function isLoadingWrapper(isLoading: boolean, renderTable: () => ReactNode) {
  if (isLoading) {
    return (
      <div 
        role="status" 
        aria-live="polite" 
        className="text-muted text-sm py-8 text-center bg-white rounded-xl border border-stroke animate-pulse"
      >
        Cargando información...
      </div>
    );
  }
  return renderTable();
}