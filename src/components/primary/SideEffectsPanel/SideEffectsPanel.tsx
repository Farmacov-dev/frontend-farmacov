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
    <div className="w-full rounded-[18px] bg-[#D3D3D3] px-5 py-5 lg:w-[432px] lg:px-[32px] lg:py-[28px]">
      <h2 className="text-[26px] font-bold text-[#172033] lg:text-[40px]">
        Efectos secundarios
      </h2>
      <div className="mt-5 rounded-[20px] bg-[#F7F2F4] px-5 py-5 lg:px-[30px] lg:py-[28px]">
        {efectos.length === 0 ? (
          <EmptyState title="No hay efectos secundarios registrados" />
        ) : (
          <div className="flex flex-col gap-5 lg:gap-[34px]">
            {efectos.map((efecto) => (
              <div key={efecto.descripcion} className="flex items-center gap-3">
                <HiOutlineBars3BottomLeft
                  className={`h-5 w-5 lg:h-[26px] lg:w-[26px] ${severidadColor[efecto.severidad]}`}
                />
                <span className={`text-[18px] font-normal lg:text-[24px] ${severidadColor[efecto.severidad]}`}>
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