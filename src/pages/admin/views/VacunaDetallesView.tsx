import { useState } from "react";
import type { ReactNode } from "react";
import Button from "../../../components/primary/Button/Button";
import { DataTable } from "../../../components/composed/DataTable/DataTable";
import type { Column } from "../../../components/composed/DataTable/DataTable";
import Tabs from "../../../components/composed/Tabs/Tabs"; 
import type { TabItem } from "../../../components/composed/Tabs/Tabs";
import ConfirmModal from "../../../components/composed/ConfirmModal/ConfirmModal";
import TagBadge from "../../../components/shared/TagBadge"; 
import RegistroDetalleModal from "../../../components/composed/RegistroDetalleModal/RegistroDetalleModal"; // <-- Importamos el Modal
import type { Vacuna } from "../../../services/admin/adminVacunas";

import { 
  useCostosVacuna, useCondicionesVacuna, useEfectosSecundarios, useSintomasGraves,
  useEliminarCondicion, useEliminarCosto, useEliminarEfecto, useEliminarSintoma,
  useCrearCosto, useEditarCosto, useCrearCondicion, useEditarCondicion // <-- Nuevos hooks
} from "../../../hooks/useAdminDetallesVacuna";

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

  // Estados de Modales
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; row: any; tipo: string }>({ isOpen: false, row: null, tipo: "" });
  const [formModal, setFormModal] = useState<{ isOpen: boolean; row: any }>({ isOpen: false, row: null });

  const efectosTop50 = efectos.slice(0, 50);
  const sintomasTop50 = sintomas.slice(0, 50);

  const TABS: TabItem[] = [
    { id: "condiciones", label: "Condiciones Técnicas" },
    { id: "costos", label: "Registro de Costos" },
    { id: "efectos", label: "Efectos Secundarios" },
    { id: "sintomas", label: "Síntomas Graves" },
  ];

  const colsCondiciones: Column<any>[] = [
    { header: "ID", accessor: (row) => row.id, widthClass: "w-[80px]" },
    { header: "Temperatura", accessor: (row) => `${row.temperatura}°C`, widthClass: "flex-1" },
    { header: "T. Ambiente", accessor: (row) => row.tiempoAmbiente ? `${row.tiempoAmbiente} hrs` : "N/A", widthClass: "flex-1" },
  ];

  const colsCostos: Column<any>[] = [
    { header: "ID", accessor: (row) => row.id, widthClass: "w-[80px]" },
    { header: "Costo Unitario", accessor: (row) => <span className="font-semibold text-green-600">${row.costoUnitario}</span>, widthClass: "flex-1" },
  ];

  const colsEfectos: Column<any>[] = [
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

  const colsSintomas: Column<any>[] = [
    { header: "ID", accessor: (row) => row.id, widthClass: "w-[80px]" },
    { header: "Síntoma", accessor: (row) => <span className="font-semibold text-dark">{row.nombre}</span>, widthClass: "flex-1" },
  ];

  // --- HANDLERS ---
  const handleOpenCrear = () => setFormModal({ isOpen: true, row: null });
  const handleOpenEditar = (row: any) => setFormModal({ isOpen: true, row });
  const handleOpenEliminar = (row: any, tipoTabla: string) => setDeleteModal({ isOpen: true, row, tipo: tipoTabla });

  // Enrutador de Envíos de Formulario (Crear / Editar)
  const handleSubmitForm = (data: any) => {
    // Inyectamos el ID de la vacuna requerido por Quarkus
    const payload = { ...data, idVacuna: vacunaActiva.idVacuna };
    const onSuccess = () => setFormModal({ isOpen: false, row: null });

    if (formModal.row) {
      // MODO EDICIÓN
      if (tabActivo === "costos") editCosto({ id: formModal.row.id, data: payload }, { onSuccess });
      if (tabActivo === "condiciones") editCondicion({ id: formModal.row.id, data: payload }, { onSuccess });
    } else {
      // MODO CREACIÓN
      if (tabActivo === "costos") crearCosto(payload, { onSuccess });
      if (tabActivo === "condiciones") crearCondicion(payload, { onSuccess });
    }
  };

  const handleConfirmarEliminar = () => {
    if (!deleteModal.row) return;
    const { id } = deleteModal.row;
    const onSuccess = () => setDeleteModal({ isOpen: false, row: null, tipo: "" });

    switch (deleteModal.tipo) {
      case "condiciones": delCondicion(id, { onSuccess }); break;
      case "costos": delCosto(id, { onSuccess }); break;
      case "efectos": delEfecto(id, { onSuccess }); break;
      case "sintomas": delSintoma(id, { onSuccess }); break;
    }
  };

  const isDeleting = pDelCond || pDelCosto || pDelEfecto || pDelSintoma;
  const isSaving = pCrearCosto || pEditCosto || pCrearCond || pEditCond;

  // Solo mostramos el botón de añadir si estamos en Costos o Condiciones
  // (Asumiendo que Efectos/Síntomas no se pueden añadir desde aquí por ahora)
  const canAdd = tabActivo === "costos" || tabActivo === "condiciones";

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-dark font-inter">
            Centro de Control: {vacunaActiva.nombre}
          </h2>
          <p className="text-sm text-slate-500 font-inter">
            Gestionando especificaciones y métricas clínicas.
          </p>
        </div>
        {canAdd && (
          <Button variant="primary" onClick={handleOpenCrear} className="!py-[8px] !px-[16px]">
            + Añadir Registro
          </Button>
        )}
      </div>

      <Tabs tabs={TABS} activeTab={tabActivo} onTabChange={setTabActivo} />

      <div className="pt-2">
        {tabActivo === "condiciones" && isLoadingWrapper(loadCondiciones, () => (
          <DataTable data={condiciones} columns={colsCondiciones} onEdit={handleOpenEditar} onDelete={(r) => handleOpenEliminar(r, "condiciones")} />
        ))}

        {tabActivo === "costos" && isLoadingWrapper(loadCostos, () => (
          <DataTable data={costos} columns={colsCostos} onEdit={handleOpenEditar} onDelete={(r) => handleOpenEliminar(r, "costos")} />
        ))}

        {tabActivo === "efectos" && isLoadingWrapper(loadEfectos, () => (
          <DataTable data={efectosTop50} columns={colsEfectos} onDelete={(r) => handleOpenEliminar(r, "efectos")} />
        ))}

        {tabActivo === "sintomas" && isLoadingWrapper(loadSintomas, () => (
          <DataTable data={sintomasTop50} columns={colsSintomas} onDelete={(r) => handleOpenEliminar(r, "sintomas")} />
        ))}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, row: null, tipo: "" })}
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

function isLoadingWrapper(isLoading: boolean, renderTable: () => ReactNode) {
  if (isLoading) {
    return <div className="text-muted text-sm py-8 text-center bg-white rounded-xl border border-stroke-light">Cargando información...</div>;
  }
  return renderTable();
}