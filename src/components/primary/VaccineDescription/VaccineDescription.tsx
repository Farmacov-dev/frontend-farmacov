// src/components/primary/VaccineDescription/VaccineDescription.tsx
// angel

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
    <section className={`${compact ? 'mt-4' : 'mt-10 lg:mt-20'} ${className}`}>
      
      <h2 className="text-[18px] font-semibold text-dark font-inter leading-[26px]">
        Descripción general
      </h2>
      
      <p className="mt-2 text-[14px] text-muted font-inter leading-[22px]">
        {descripcion}
      </p>
      
    </section>
  )
}