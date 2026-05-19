// src/components/primary/VaccineDescription/VaccineDescription.tsx
interface VaccineDescriptionProps {
  descripcion: string
  compact?: boolean
  className?: string
}

export default function VaccineDescription({
  descripcion,
  compact = false,
  className = ''
}: VaccineDescriptionProps) {
  return (
    <section className={`${compact ? 'mt-4' : 'mt-10 lg:mt-[80px]'} ${className}`}>
      <h2 className="text-[18px] weight-[600]">
        Descripción general
      </h2>
      <p className="text-[14px] text-[#617284]">
        {descripcion}
      </p>
    </section>
  )
}