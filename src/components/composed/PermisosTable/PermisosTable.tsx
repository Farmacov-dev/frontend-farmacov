// src/components/composed/PermisosTable/PermisosTable.tsx
// angel

import React from 'react';
import { Toggle } from '../../primary/Toggle/Toggle';

const MODULOS = [
  { id: 'dashboard', nombre: 'Dashboard' },
  { id: 'analisis', nombre: 'Análisis de Síntomas' },
  { id: 'catalogo', nombre: 'Catálogo de Vacunas' },
];

interface PermisosTableProps {
  permisos: Record<string, boolean>;
  onTogglePermiso: (moduloId: string) => void;
}

export const PermisosTable: React.FC<PermisosTableProps> = ({ 
  permisos, 
  onTogglePermiso 
}) => {
  return (
    <div 
      role="table" 
      aria-label="Tabla de permisos de usuario"
      className="flex flex-col w-full p-[1px] rounded-[12px] border border-stroke bg-white max-w-[1140px]"
    >
      
      {/* Cabecera */}
      <div role="rowgroup" className="flex w-full min-h-[40px] bg-surface rounded-t-[11px] border-b border-stroke">
        <div role="row" className="flex w-full items-center">
          <div role="columnheader" className="flex-1 px-[16px] py-[12px] flex items-start">
            <span className="text-muted font-inter text-[12px] font-semibold leading-[16px] tracking-[0.3px] uppercase">
              Módulo
            </span>
          </div>
          <div role="columnheader" className="flex w-[200px] px-[16px] py-[12px] justify-center items-start shrink-0">
            <span className="text-muted font-inter text-[12px] font-semibold leading-[16px] tracking-[0.3px] uppercase">
              Acceso
            </span>
          </div>
        </div>
      </div>

      {/* Filas */}
      <div role="rowgroup" className="flex flex-col w-full">
        {MODULOS.map((mod, index) => (
          <div 
            key={mod.id} 
            role="row"
            className={`flex w-full min-h-[52.5px] items-center transition-colors hover:bg-surface/50 ${
              index > 0 ? 'border-t border-stroke' : ''
            }`}
          >
            {/* Nombre del módulo */}
            <div role="cell" className="flex-1 px-[16px] py-[16px] flex items-center">
              <span className="text-dark font-inter text-[14px] font-medium leading-[20px]">
                {mod.nombre}
              </span>
            </div>
            
            {/* Toggle de Acceso */}
            <div role="cell" className="flex w-[200px] px-[16px] py-[16px] justify-center items-center shrink-0">
              <Toggle 
                checked={permisos[mod.id] || false} 
                onChange={() => onTogglePermiso(mod.id)} 
                aria-label={`Alternar acceso al módulo ${mod.nombre}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};