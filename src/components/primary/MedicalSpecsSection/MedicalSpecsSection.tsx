// src/components/primary/MedicalSpecsSection/MedicalSpecsSection.tsx
import { HiOutlineBars3BottomLeft } from "react-icons/hi2"

interface MedicalSpecsSectionProps {
  tipo: string
  temperatura: number
  tiempoAmbiente: number | null
  costoUnitario: number
}

export default function MedicalSpecsSection({
  tipo,
  temperatura,
  tiempoAmbiente,
  costoUnitario,
}: MedicalSpecsSectionProps) {
  return (
    <section className="mt-10 lg:mt-[80px]">
      <h2 className="text-[24px] font-bold text-[#172033] lg:text-[39px]">
        Especificaciones médicas
      </h2>
      <div className="mt-6 flex flex-col gap-6 lg:mt-[58px] lg:gap-[46px]">

        <div className="grid grid-cols-[32px_1fr_auto] items-center gap-2 lg:grid-cols-[54px_1fr_auto]">
          <HiOutlineBars3BottomLeft className="h-6 w-6 text-[#172033] lg:h-[40px] lg:w-[40px]" />
          <span className="text-[18px] text-black lg:text-[32px]">Tipo:</span>
          <span className="text-[18px] text-black lg:text-[32px]">{tipo}</span>
        </div>

        <div className="grid grid-cols-[32px_1fr_auto] items-center gap-2 lg:grid-cols-[54px_1fr_auto]">
          <HiOutlineBars3BottomLeft className="h-6 w-6 text-[#172033] lg:h-[40px] lg:w-[40px]" />
          <span className="text-[18px] text-black lg:text-[32px]">Temperatura:</span>
          <span className="text-[18px] text-black lg:text-[32px]">{temperatura}°C</span>
        </div>

        {tiempoAmbiente && (
          <div className="grid grid-cols-[32px_1fr_auto] items-center gap-2 lg:grid-cols-[54px_1fr_auto]">
            <HiOutlineBars3BottomLeft className="h-6 w-6 text-[#172033] lg:h-[40px] lg:w-[40px]" />
            <span className="text-[18px] text-black lg:text-[32px]">Tiempo ambiente:</span>
            <span className="text-[18px] text-black lg:text-[32px]">{tiempoAmbiente} hrs</span>
          </div>
        )}

        <div className="grid grid-cols-[32px_1fr_auto] items-center gap-2 lg:grid-cols-[54px_1fr_auto]">
          <HiOutlineBars3BottomLeft className="h-6 w-6 text-[#172033] lg:h-[40px] lg:w-[40px]" />
          <span className="text-[18px] text-black lg:text-[32px]">Costo unitario:</span>
          <span className="text-[18px] text-black lg:text-[32px]">${costoUnitario.toFixed(2)}</span>
        </div>

      </div>
    </section>
  )
}