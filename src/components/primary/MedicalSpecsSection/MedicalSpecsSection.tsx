// src/components/primary/MedicalSpecsSection/MedicalSpecsSection.tsx
// angel

import { HiOutlineBars3BottomLeft } from "react-icons/hi2"

interface MedicalSpecsSectionProps {
  tipo: string
  temperatura: number
  tiempoAmbiente: number | null
  costoUnitario: number
  dosisRequerida?: number 
}

export default function MedicalSpecsSection({
  tipo,
  temperatura,
  tiempoAmbiente,
  costoUnitario,
  dosisRequerida = 2,
}: MedicalSpecsSectionProps) {
  

  const specs = [
    { label: "Tipo:", value: tipo },
    { label: "Temperatura:", value: `${temperatura}°C` },
    ...(tiempoAmbiente ? [{ label: "Preservación:", value: `${tiempoAmbiente} hrs (amb)` }] : []),
    { label: "Costo unitario:", value: `$${costoUnitario.toFixed(2)} ` },
    { label: "Dosis requerida:", value: dosisRequerida.toString() },
  ]

  return (
    <section className="mt-4">
      <h2 className="text-[18px] font-semibold text-dark leading-[26px] font-inter">
        Especificaciones médicas
      </h2>

      <div className="mt-3 flex flex-col gap-3">
        {specs.map((spec, index) => (
          <div key={index} className="flex items-center gap-2">
            <HiOutlineBars3BottomLeft className="h-4 w-4 text-muted flex-shrink-0" />
            <span className="text-[14px] text-dark leading-[22px] font-inter">
              {spec.label}
            </span>
            <span className="text-[14px] text-dark leading-[22px] font-inter font-semibold">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}