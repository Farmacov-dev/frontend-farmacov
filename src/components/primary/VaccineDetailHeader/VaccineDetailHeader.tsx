// src/components/primary/VaccineDetailHeader/VaccineDetailHeader.tsx
import { FaShieldAlt } from "react-icons/fa"

interface VaccineDetailHeaderProps {
  nombre: string
  farmaceutica: string
  compact?: boolean
  effectiveness?: number
}

export default function VaccineDetailHeader({
  nombre,
  farmaceutica,
  compact = false,
  effectiveness
}: VaccineDetailHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between gap-3">
        {/* Contenedor icono + textos */}
        <div className="flex gap-3 align-center">
          {/* Icono contenedor - 42px x 42px */}
          <div className="flex items-center justify-center h-[42px] w-[42px] rounded-[8px] bg-[#4F7EF7] text-white flex-shrink-0">
            <FaShieldAlt className="h-[24px] w-[24px]" />
          </div>

          {/* Textos alineados verticalmente */}
          <div className="flex flex-col gap-[7px]">
            {/* Nombre de la vacuna - 24px, Roboto, weight 400 */}
            <h2 className="text-black text-[32px] font-normal leading-tight font-sans">
              {nombre}
            </h2>
          </div>
        </div>
        
      </div>

      <div>
          <p className="text-black text-[13px] font-normal font-sans">
              Diseñada por: {farmaceutica}
          </p>
      </div>
    </div>
  )
}