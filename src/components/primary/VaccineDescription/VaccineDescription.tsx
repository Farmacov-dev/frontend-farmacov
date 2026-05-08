// src/components/primary/VaccineDescription/VaccineDescription.tsx
interface VaccineDescriptionProps {
  descripcion: string
}

export default function VaccineDescription({ descripcion }: VaccineDescriptionProps) {
  return (
    <section className="mt-10 lg:mt-[80px]">
      <h2 className="text-[24px] font-bold text-[#172033] lg:text-[37px]">
        Descripción general
      </h2>
      <p className="mt-6 text-[18px] font-normal leading-[1.6] text-[#617284] lg:mt-[52px] lg:text-[24px]">
        {descripcion}
      </p>
    </section>
  )
}