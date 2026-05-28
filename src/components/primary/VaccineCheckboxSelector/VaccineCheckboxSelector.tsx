// src/components/primary/VaccineCheckboxSelector/VaccineCheckboxSelector.tsx
// angel

import { memo, useCallback } from 'react'

export interface VacunaOption {
  id: number
  nombre: string
}

// se intento poner colores en tailwind.config pero no se pudo mapear el HEX a la grafica sin cambiar motros codigos externos
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

// refactor: se usa react memo para evitar renders innecesarios
const VaccineCheckboxSelector = memo(function VaccineCheckboxSelector({
  vacunas,
  seleccionadas,
  onChange,
  maxSeleccion = 5,
}: VaccineCheckboxSelectorProps) {

  //refactor: se usa callback para memoizar la funcion de cambio y evitar cierres
  const handleChange = useCallback((id: number) => {
    if (seleccionadas.includes(id)) {
      onChange(seleccionadas.filter((v) => v !== id))
    } else {
      if (seleccionadas.length >= maxSeleccion) return
      onChange([...seleccionadas, id])
    }
  }, [seleccionadas, maxSeleccion, onChange])

  return (
    <section className="rounded-card border border-stroke bg-white px-5 py-4">
      <div className="flex items-center justify-between mb-3">
        <p className="font-inter text-[14px] font-medium text-dark">
          Seleccionar vacunas a comparar
        </p>
        <p className="font-inter text-[12px] text-muted">
          {seleccionadas.length}/{maxSeleccion} seleccionadas
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {vacunas.map((vacuna) => {
          const seleccionada = seleccionadas.includes(vacuna.id)
          const indexSeleccion = seleccionadas.indexOf(vacuna.id)
          
         
          const colorBase = COLORES_VACUNA[indexSeleccion] ?? '#94A3B8' 
          const bloqueada = !seleccionada && seleccionadas.length >= maxSeleccion

          return (
            <button
              key={vacuna.id}
              type="button"
              // refactor:  ally para teclado
              role="checkbox"
              aria-checked={seleccionada}
              onClick={() => handleChange(vacuna.id)}
              disabled={bloqueada}
              className={`
                inline-flex items-center gap-2
                px-[14px] py-[8px]
                rounded-card border
                font-inter text-[13px] font-medium
                transition-[background-color,border-color,opacity] duration-150 ease-in-out
                disabled:opacity-40 disabled:cursor-not-allowed
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
                ${seleccionada
                  ? 'text-white border-transparent'
                  : 'text-dark-soft border-stroke-dark bg-transparent hover:bg-surface active:bg-surface-dark'
                }
              `}
              style={{
                // refactor: se usa style a la linea para aplicar el color dinamico basado en la seleccon 
                backgroundColor: seleccionada ? colorBase : undefined,
              }}
            >
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${!seleccionada ? 'bg-muted-light' : ''}`}
                style={{ 
                  backgroundColor: seleccionada ? 'rgba(255,255,255,0.8)' : undefined 
                }}
              />
              {vacuna.nombre}
            </button>
          )
        })}
      </div>
    </section>
  )
})

export default VaccineCheckboxSelector