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
    <section className="mt-4">
      {/* Título - Body Large/SemiBold - Inter, 18px, weight 600 */}
      <h2 className="text-[18px] font-semibold text-black leading-[26px] font-sans">
        Especificaciones médicas
      </h2>

      {/* Items de especificaciones - Body Small/Regular - Inter, 14px, weight 400 */}
      <div className="mt-3 flex flex-col gap-3">

        <div className="flex items-center gap-2">
          <HiOutlineBars3BottomLeft className="h-4 w-4 text-black flex-shrink-0" />
          <span className="text-[14px] text-black leading-[22px] font-sans">Tipo:</span>
          <span className="text-[14px] text-black leading-[22px] font-sans font-semibold">{tipo}</span>
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineBars3BottomLeft className="h-4 w-4 text-black flex-shrink-0" />
          <span className="text-[14px] text-black leading-[22px] font-sans">Temperatura:</span>
          <span className="text-[14px] text-black leading-[22px] font-sans font-semibold">{temperatura}°C</span>
        </div>

        {tiempoAmbiente && (
          <div className="flex items-center gap-2">
            <HiOutlineBars3BottomLeft className="h-4 w-4 text-black flex-shrink-0" />
            <span className="text-[14px] text-black leading-[22px] font-sans">Preservación:</span>
            <span className="text-[14px] text-black leading-[22px] font-sans font-semibold">{tiempoAmbiente} hrs (amb)</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <HiOutlineBars3BottomLeft className="h-4 w-4 text-black flex-shrink-0" />
          <span className="text-[14px] text-black leading-[22px] font-sans">Dosis requerida:</span>
          <span className="text-[14px] text-black leading-[22px] font-sans font-semibold">2</span>
        </div>

      </div>
    </section>
  )
}