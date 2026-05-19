// src/components/primary/SideEffectsPanel/SideEffectsPanel.tsx
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
  grave:    'text-[#FF1F1F]',
  moderado: 'text-[#F59E0B]',
  leve:     'text-[#18B663]',
}

export default function SideEffectsPanel({ efectos }: SideEffectsPanelProps) {
  return (
    <div className="w-full rounded-[12px] bg-[#D3D3D3] px-3 py-3">
      {/* Título - Body Large/SemiBold */}
      <h2 className="text-[16px] font-semibold text-black leading-[24px]">
        Efectos secundarios
      </h2>

      {/* Contenido efectos */}
      <div className="mt-2 rounded-[10px] bg-[#F7F2F4] px-3 py-3">
        {efectos.length === 0 ? (
          <EmptyState title="No hay efectos secundarios" />
        ) : (
          <div className="flex flex-col gap-2">
            {efectos.map((efecto) => (
              <div key={efecto.descripcion} className="flex items-start gap-2">
                <HiOutlineBars3BottomLeft
                  className={`h-4 w-4 flex-shrink-0 mt-0.5 ${severidadColor[efecto.severidad]}`}
                />
                <span className={`text-[12px] font-normal leading-[18px] ${severidadColor[efecto.severidad]}`}>
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