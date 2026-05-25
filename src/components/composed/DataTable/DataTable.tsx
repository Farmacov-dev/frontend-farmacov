import React from 'react';
import { Pencil, Trash2, ChevronRight } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  widthClass?: string; // ej. 'flex-1' o 'w-[150px]'
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onRowClick?: (row: T) => void; // Para entrar al siguiente nivel
}

export function DataTable<T extends { id: number | string }>({
  data,
  columns,
  onEdit,
  onDelete,
  onRowClick
}: DataTableProps<T>) {
  return (
    <div className="flex flex-col w-full p-[1px] rounded-[12px] border border-stroke-light bg-white">
      
      {/* Cabecera */}
      <div className="flex w-full h-[40px] bg-surface/50 rounded-t-[11px]">
        {columns.map((col, idx) => (
          <div key={idx} className={`${col.widthClass || 'flex-1'} px-[16px] py-[12px] flex items-start`}>
            <span className="text-muted font-inter text-[12px] font-semibold leading-[16px] tracking-[0.3px] uppercase">
              {col.header}
            </span>
          </div>
        ))}
        {/* Espacio para la columna de acciones */}
        {(onEdit || onDelete || onRowClick) && (
          <div className="flex w-[120px] px-[16px] py-[12px] justify-end items-start">
            <span className="text-muted font-inter text-[12px] font-semibold leading-[16px] tracking-[0.3px] uppercase">
              Acciones
            </span>
          </div>
        )}
      </div>

      {/* Filas */}
      <div className="flex flex-col w-full">
        {data.length === 0 ? (
          <div className="p-8 text-center text-muted font-inter text-sm">No hay registros disponibles.</div>
        ) : (
          data.map((row, index) => (
            <div 
              key={row.id} 
              className={`flex w-full min-h-[52.5px] items-center transition-colors hover:bg-slate-50 ${
                index > 0 ? 'border-t border-stroke-light' : ''
              } ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {/* Celdas Dinámicas */}
              {columns.map((col, idx) => (
                <div key={idx} className={`${col.widthClass || 'flex-1'} px-[16px] py-[16px] flex items-center`}>
                  <span className="text-dark-row font-inter text-[14px] font-medium leading-[20px]">
                    {col.accessor(row)}
                  </span>
                </div>
              ))}
              
              {/* Botones de Acción */}
              {(onEdit || onDelete || onRowClick) && (
                <div className="flex w-[120px] px-[16px] gap-2 justify-end items-center shrink-0" onClick={(e) => e.stopPropagation()}>
                  {onEdit && (
                    <button onClick={() => onEdit(row)} className="p-1.5 text-slate-400 hover:text-[#5B84E9] transition-colors" title="Editar">
                      <Pencil size={18} />
                    </button>
                  )}
                  {onDelete && (
                    <button onClick={() => onDelete(row)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors" title="Eliminar">
                      <Trash2 size={18} />
                    </button>
                  )}
                  {onRowClick && (
                    <div className="p-1.5 text-slate-300">
                      <ChevronRight size={18} />
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