// src/components/primary/SideEffectsPanel/SideEffectsPanel.tsx
// angel

import { HiOutlineBars3BottomLeft } from "react-icons/hi2"
import EmptyState from "../../EmptyState/EmptyState"

export interface EfectoSecundario {
  descripcion: string
  severidad: 'leve' | 'moderado' | 'grave'
}

interface SideEffectsPanelProps {
  efectos: EfectoSecundario[]
}

const severidadColor: Record<string, string> = {
  grave:    'text-severity-grave',
  moderado: 'text-severity-moderado',
  leve:     'text-severity-leve',
}

export default function SideEffectsPanel({ efectos }: SideEffectsPanelProps) {
  // [REFACTOR]: Reemplazo de bg-[#D3D3D3] por bg-panel. (Comentario movido aquí para no romper el JSX)
  return (
    <div className="w-full rounded-[12px] bg-panel px-3 py-3">
      {/* [REFACTOR]: Reemplazo de text-black por text-dark y adición de font-inter para consistencia */}
      <h2 className="text-[16px] font-inter font-semibold text-dark leading-[24px]">
        Efectos secundarios
      </h2>

      {/* Contenido efectos */}
      {/* [REFACTOR]: Reemplazo de bg-[#F7F2F4] por bg-panel-inner */}
      <div className="mt-2 rounded-[10px] bg-panel-inner px-3 py-3">
        {efectos.length === 0 ? (
          <EmptyState title="No hay efectos secundarios" />
        ) : (
          <div className="flex flex-col gap-2">
            {/* [REFACTOR]: Se añadió el index a la key para evitar warnings en React 
                si dos efectos secundarios llegarán a tener exactamente la misma descripción */}
            {efectos.map((efecto, index) => (
              <div key={`${efecto.descripcion}-${index}`} className="flex items-start gap-2">
                <HiOutlineBars3BottomLeft
                  className={`h-4 w-4 flex-shrink-0 mt-0.5 ${severidadColor[efecto.severidad]}`}
                />
                <span className={`text-[12px] font-inter font-normal leading-[18px] ${severidadColor[efecto.severidad]}`}>
                  {efecto.descripcion}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}