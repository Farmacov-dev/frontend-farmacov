// src/pages/admin/RolesPermisosPage.tsx
import { useState, useEffect } from "react";

// Componentes de la vista
import RolCard from "../../components/primary/RolCard/RolCard";
import { PermisosTable } from "../../components/composed/PermisosTable/PermisosTable";
import Button from "../../components/primary/Button/Button";

// Hooks de peticiones
import { useRoles } from "../../hooks/useRoles";
import { useActualizarPermisos } from "../../hooks/useActualizarPermisos";

export default function RolesPermisosPage() {
  // --- Estados de la lógica de permisos ---
  const { data: roles = [], isLoading, isError } = useRoles();
  const { mutate: actualizarPermisos, isPending } = useActualizarPermisos();
  
  const [rolActivoId, setRolActivoId] = useState<number | null>(null);
  const [permisosEditados, setPermisosEditados] = useState<Record<string, boolean>>({});

  // Sincronizar permisos cuando cambia el rol seleccionado
  useEffect(() => {
    if (rolActivoId && roles.length > 0) {
      const rolSeleccionado = roles.find(r => r.id === rolActivoId);
      if (rolSeleccionado) {
        setPermisosEditados(rolSeleccionado.permisos);
      }
    }
  }, [rolActivoId, roles]);

  // --- Handlers de acciones ---
  const handleTogglePermiso = (moduloId: string) => {
    setPermisosEditados(prev => ({
      ...prev,
      [moduloId]: !prev[moduloId]
    }));
  };

  const handleGuardar = () => {
    if (rolActivoId) {
      actualizarPermisos({ 
        idRol: rolActivoId, 
        permisos: permisosEditados 
      });
    }
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-8">
      
      {/* Contenedor con el ancho máximo de tu mock de Figma */}
      <div className="flex flex-col w-full max-w-[1140px] gap-[24px]">
        
        {/* Header de la vista */}
        <div className="flex w-full h-[28px] justify-between items-center">
          <h1 className="text-dark font-inter text-[24px] font-bold leading-normal">
            Roles y Permisos
          </h1>
        </div>

        {/* Manejo de errores */}
        {isError && (
          <div className="p-4 text-red-light bg-red-light/10 rounded-card">
            Ocurrió un error al cargar los roles.
          </div>
        )}

        {/* Grid de RolCards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] w-full">
          {isLoading ? (
            <div className="col-span-full text-muted text-sm py-4">
              Cargando roles...
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

        {/* Tabla de Permisos y Botón Guardar */}
        {rolActivoId && !isLoading && (
          <div className="flex flex-col gap-[24px]">
            <PermisosTable 
              permisos={permisosEditados} 
              onTogglePermiso={handleTogglePermiso} 
            />
            
            <div className="flex w-full h-[40px] justify-end items-start">
              <Button 
                variant="primary" 
                onClick={handleGuardar}
                disabled={isPending}
                className="!py-[8px] !px-[16px]" 
              >
                {isPending ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}