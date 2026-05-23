// src/components/primary/VaccineCheckboxSelector/VaccineCheckboxSelector.tsx

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

export default function VaccineCheckboxSelector({
  vacunas,
  seleccionadas,
  onChange,
  maxSeleccion = 5,
}: VaccineCheckboxSelectorProps) {

  const handleChange = (id: number) => {
    if (seleccionadas.includes(id)) {
      onChange(seleccionadas.filter((v) => v !== id))
    } else {
      if (seleccionadas.length >= maxSeleccion) return
      onChange([...seleccionadas, id])
    }
  }

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
          const color = COLORES_VACUNA[indexSeleccion] ?? COLORES_VACUNA[0]
          const bloqueada = !seleccionada && seleccionadas.length >= maxSeleccion

          return (
            <button
              key={vacuna.id}
              onClick={() => handleChange(vacuna.id)}
              disabled={bloqueada}
              className={`
                inline-flex items-center gap-2
                px-[14px] py-[8px]
                rounded-card
                border
                font-inter text-[13px] font-medium
                transition-[background-color,border-color,opacity] duration-150 ease-in-out
                disabled:opacity-40 disabled:cursor-not-allowed
                ${seleccionada
                  ? 'text-white border-transparent'
                  : 'text-dark-soft border-stroke-dark bg-transparent hover:bg-surface active:bg-surface-dark'
                }
              `}
              style={{
                backgroundColor: seleccionada ? color : undefined,
              }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: seleccionada ? 'rgba(255,255,255,0.8)' : color }}
              />
              {vacuna.nombre}
            </button>
          )
        })}
      </div>
    </section>
  )
}