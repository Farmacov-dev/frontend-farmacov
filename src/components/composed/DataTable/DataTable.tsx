// src/components/composed/DataTable/DataTable.tsx
// angel

import React from 'react';
import { Pencil, Trash2, ChevronRight } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  widthClass?: string; 
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onRowClick?: (row: T) => void; 
}

export function DataTable<T extends { id: number | string }>({
  data,
  columns,
  onEdit,
  onDelete,
  onRowClick
}: DataTableProps<T>) {
  return (
    <div 
      // [REFACTOR]: Restauración semántica. El navegador ahora sabe que esto es una tabla.
      role="table" 
      aria-label="Tabla de datos"
      className="flex flex-col w-full p-[1px] rounded-[12px] border border-stroke bg-white"
    >
      
      {/* Cabecera */}
      <div role="rowgroup" className="flex w-full min-h-[40px] bg-surface rounded-t-[11px] border-b border-stroke">
        <div role="row" className="flex w-full items-center">
          {columns.map((col, idx) => (
            <div 
              key={idx} 
              role="columnheader" 
              className={`${col.widthClass || 'flex-1'} px-[16px] py-[12px] flex items-start`}
            >
              <span className="text-muted font-inter text-[12px] font-semibold leading-[16px] tracking-[0.3px] uppercase">
                {col.header}
              </span>
            </div>
          ))}
          {/* Espacio para la columna de acciones */}
          {(onEdit || onDelete || onRowClick) && (
            <div role="columnheader" className="flex w-[120px] px-[16px] py-[12px] justify-end items-start shrink-0">
              <span className="text-muted font-inter text-[12px] font-semibold leading-[16px] tracking-[0.3px] uppercase">
                Acciones
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Filas */}
      <div role="rowgroup" className="flex flex-col w-full">
        {data.length === 0 ? (
          <div role="row" className="p-8 text-center text-muted font-inter text-sm">
            <span role="cell">No hay registros disponibles.</span>
          </div>
        ) : (
          data.map((row, index) => (
            <div 
              key={row.id} 
              role="row"
              className={`flex w-full min-h-[52.5px] items-center transition-colors hover:bg-surface ${
                index > 0 ? 'border-t border-stroke' : ''
              } ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col, idx) => (
                <div key={idx} role="cell" className={`${col.widthClass || 'flex-1'} px-[16px] py-[16px] flex items-center`}>
                  <span className="text-dark font-inter text-[14px] font-medium leading-[20px]">
                    {col.accessor(row)}
                  </span>
                </div>
              ))}
              
              {/* Botones de accion */}
              {(onEdit || onDelete || onRowClick) && (
                <div 
                  role="cell" 
                  className="flex w-[120px] px-[16px] gap-2 justify-end items-center shrink-0" 
                  onClick={(e) => e.stopPropagation()}
                >
                  {onEdit && (
                    <button 
                      type="button"
                      onClick={() => onEdit(row)} 
                      className="p-1.5 text-muted hover:text-primary transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" 
                      aria-label="Editar registro"
                      title="Editar"
                    >
                      <Pencil size={18} aria-hidden="true" />
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      type="button"
                      onClick={() => onDelete(row)} 
                      className="p-1.5 text-muted hover:text-red transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red" 
                      aria-label="Eliminar registro"
                      title="Eliminar"
                    >
                      <Trash2 size={18} aria-hidden="true" />
                    </button>
                  )}
                  {onRowClick && (
                    <div className="p-1.5 text-muted-light flex items-center justify-center">
                      <ChevronRight size={18} aria-hidden="true" />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}