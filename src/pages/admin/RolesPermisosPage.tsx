// src/pages/admin/RolesPermisosPage.tsx
// angel

import { useState, useEffect } from "react";

// Componentes de la view
import RolCard from "../../components/primary/RolCard/RolCard";
import { PermisosTable } from "../../components/composed/PermisosTable/PermisosTable";
import Button from "../../components/primary/Button/Button";
import CrearRolModal from "../../components/composed/CrearRolModal/CrearRolModal";
import ConfirmModal from "../../components/composed/ConfirmModal/ConfirmModal"; 

// Hooks de peticiones
import { useRoles, useEliminarRol } from "../../hooks/useRoles";
import { useActualizarPermisos } from "../../hooks/useActualizarPermisos";

export default function RolesPermisosPage() {
  const { data: roles = [], isLoading, isError } = useRoles();
  const { mutate: actualizarPermisos, isPending: guardando } = useActualizarPermisos();
  const { mutate: borrarRol, isPending: eliminando } = useEliminarRol();
  
  const [rolActivoId, setRolActivoId] = useState<number | null>(null);
  const [permisosEditados, setPermisosEditados] = useState<Record<string, boolean>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [isCrearModalOpen, setIsCrearModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (rolActivoId && roles.length > 0) {
      const rolSeleccionado = roles.find(r => r.id === rolActivoId);
      if (rolSeleccionado) {
        setPermisosEditados(rolSeleccionado.permisos);
        setErrorMessage(null);
      }
    }
  }, [rolActivoId, roles]);

  const handleTogglePermiso = (moduloId: string) => {
    setPermisosEditados(prev => ({
      ...prev,
      [moduloId]: !prev[moduloId]
    }));
  };

  const handleGuardar = () => {
    if (rolActivoId) {
      actualizarPermisos({ idRol: rolActivoId, permisos: permisosEditados }, {
        onSuccess: () => setErrorMessage(null),
        onError: () => setErrorMessage("No se pudieron guardar los permisos. Intenta de nuevo.")
      });
    }
  };

  const ejecutarEliminacion = () => {
    if (!rolActivoId) return;

    borrarRol(rolActivoId, {
      onSuccess: () => {
        setRolActivoId(null);
        setIsDeleteModalOpen(false);
        setErrorMessage(null);
      },
      onError: () => {
        setIsDeleteModalOpen(false);
        setErrorMessage("No se pudo eliminar el rol. Verifica que no tenga usuarios asignados.");
      }
    });
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-4 sm:p-8 bg-surface">
      <div className="flex flex-col w-full max-w-[1140px] gap-[24px]">
        
        <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-4">
          <h1 className="text-dark font-inter text-[24px] font-bold leading-normal">
            Roles y Permisos
          </h1>
          <Button 
            variant="outline" 
            onClick={() => setIsCrearModalOpen(true)}
          >
            + Crear Nuevo Rol
          </Button>
        </div>

        {(isError || errorMessage) && (
          <div role="alert" className="p-4 text-red bg-red/10 rounded-card border border-red/30 text-sm font-medium">
            {errorMessage || "Ocurrió un error de conexión con el servidor."}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] w-full">
          {isLoading ? (
            <div role="status" aria-live="polite" className="col-span-full text-muted text-sm py-4 animate-pulse">
              Cargando roles...
            </div>
          ) : roles.length === 0 ? (
            <div className="col-span-full text-muted-light text-sm py-4">
              No se encontraron roles registrados.
            </div>
          ) : (
            roles.map((rol) => (
              <RolCard
                key={rol.id}
                id={rol.id}
                nombre={rol.nombre}
                seleccionado={rolActivoId === rol.id}
                onClick={() => setRolActivoId(rol.id)}
              />
            ))
          )}
        </div>

        {rolActivoId && !isLoading && (
          <div className="flex flex-col gap-[24px]">
            <PermisosTable 
              permisos={permisosEditados} 
              onTogglePermiso={handleTogglePermiso} 
            />
            
            <div className="flex w-full justify-between items-center mt-2">
              <Button 
                variant="ghost" 
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={eliminando || guardando}
                className="text-red hover:bg-red/10 hover:text-red transition-colors" 
              >
                Eliminar Rol
              </Button>

              <Button 
                variant="primary" 
                onClick={handleGuardar}
                disabled={guardando || eliminando}
              >
                {guardando ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </div>
          </div>
        )}
      </div>

      <CrearRolModal 
        isOpen={isCrearModalOpen} 
        onClose={() => setIsCrearModalOpen(false)} 
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={ejecutarEliminacion}
        title="Eliminar Rol"
        message="¿Estás seguro de que deseas eliminar este rol permanentemente? Esta acción fallará si el rol tiene usuarios asignados actualmente."
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        isDestructive={true}
        isLoading={eliminando}
      />
    </main>
  );
}