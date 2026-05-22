// src/components/composed/PermisosTable/PermisosTable.tsx
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
    <div className="flex flex-col w-full p-[1px] rounded-[12px] border border-stroke-light bg-white max-w-[1140px]">
      
      {/* Cabecera */}
      <div className="flex w-full h-[40px] bg-surface/50 rounded-t-[11px]">
        <div className="flex-1 px-[16px] py-[12px] flex items-start">
          <span className="text-muted font-inter text-[12px] font-semibold leading-[16px] tracking-[0.3px] uppercase">
            Módulo
          </span>
        </div>
        <div className="flex w-[200px] px-[16px] py-[12px] justify-center items-start">
          <span className="text-muted font-inter text-[12px] font-semibold leading-[16px] tracking-[0.3px] uppercase">
            Acceso
          </span>
        </div>
      </div>

      {/* Filas */}
      <div className="flex flex-col w-full">
        {MODULOS.map((mod, index) => (
          <div 
            key={mod.id} 
            className={`flex w-full h-[52.5px] items-center ${
              index > 0 ? 'border-t border-stroke-light' : ''
            }`}
          >
            {/* Nombre del módulo */}
            <div className="flex-1 px-[16px] py-[16px] flex items-center">
              <span className="text-dark-row font-inter text-[14px] font-medium leading-[20px]">
                {mod.nombre}
              </span>
            </div>
            
            {/* Toggle de Acceso */}
            <div className="flex w-[200px] px-[16px] py-[16px] justify-center items-center shrink-0">
              <Toggle 
                checked={permisos[mod.id] || false} 
                onChange={() => onTogglePermiso(mod.id)} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};