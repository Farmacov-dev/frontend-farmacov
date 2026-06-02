// src/components/primary/VaccineCheckboxSelector/VaccineCheckboxSelector.tsx
// angel

import { memo, useCallback } from 'react'

export interface VacunaOption {
  id: number
  nombre: string
}

export const COLORES_VACUNA = [
  '#6366F1', // indigo — primary
  '#10B981', // verde
  '#F59E0B', // amarillo
  '#EF4444', // rojo
  '#8B5CF6', // morado
]

interface VaccineCheckboxSelectorProps {
  vacunas: VacunaOption[]
  seleccionadas: number[]
  onChange: (ids: number[]) => void
  maxSeleccion?: number
}

const VaccineCheckboxSelector = memo(function VaccineCheckboxSelector({
  vacunas,
  seleccionadas,
  onChange,
  maxSeleccion = 5,
}: VaccineCheckboxSelectorProps) {

  const handleChange = useCallback((id: number) => {
    if (seleccionadas.includes(id)) {
      onChange(seleccionadas.filter((v) => v !== id))
    } else {
      if (seleccionadas.length >= maxSeleccion) return
      onChange([...seleccionadas, id])
    }
  }, [seleccionadas, maxSeleccion, onChange])

  return (
    <section className="w-full rounded-card border border-stroke bg-white px-5 py-4">
      <div className="flex items-center justify-between mb-4">
        <p className="font-inter text-base font-medium text-dark">
          Seleccionar vacunas a comparar
        </p>
        <p className="font-inter text-sm text-muted">
          {seleccionadas.length}/{maxSeleccion} seleccionadas
        </p>
      </div>

      <div className="flex w-full gap-2 md:gap-3 overflow-x-auto pb-1">
        {vacunas.map((vacuna) => {
          const seleccionada = seleccionadas.includes(vacuna.id)
          
          // [REFACTOR]: Parche de color estable basado en el ID de la vacuna
          const colorEstable = COLORES_VACUNA[Math.abs(vacuna.id - 1) % COLORES_VACUNA.length] 
          
          const bloqueada = !seleccionada && seleccionadas.length >= maxSeleccion

          return (
            <button
              key={vacuna.id}
              type="button"
              role="checkbox"
              aria-checked={seleccionada}
              onClick={() => handleChange(vacuna.id)}
              disabled={bloqueada}
              className={`
                flex flex-1 items-center justify-center gap-2 min-w-0
                px-2 py-3
                rounded-card border
                font-inter text-sm font-medium
                transition-[background-color,border-color,opacity] duration-150 ease-in-out
                disabled:opacity-40 disabled:cursor-not-allowed
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
                ${seleccionada
                  ? 'text-white border-transparent shadow-sm'
                  : 'text-dark-soft border-stroke-dark bg-transparent hover:bg-surface active:bg-surface-dark'
                }
              `}
              style={{
                // Asignamos el color estable al fondo del botón
                backgroundColor: seleccionada ? colorEstable : undefined,
              }}
            >
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${!seleccionada ? 'bg-muted-light' : ''}`}
                style={{ 
                  backgroundColor: seleccionada ? 'rgba(255,255,255,0.8)' : undefined 
                }}
              />
              <span className="truncate">{vacuna.nombre}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
})

export default VaccineCheckboxSelector