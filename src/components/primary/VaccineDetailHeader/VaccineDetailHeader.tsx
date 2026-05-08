// src/components/primary/VaccineDetailHeader/VaccineDetailHeader.tsx
import { FaShieldAlt } from "react-icons/fa"

interface VaccineDetailHeaderProps {
  nombre: string
  farmaceutica: string
}

export default function VaccineDetailHeader({ nombre, farmaceutica }: VaccineDetailHeaderProps) {
  return (
    <div className="flex items-start gap-4 sm:gap-5 lg:gap-6">
      <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[10px] bg-[#4F7EF7] text-white sm:h-[76px] sm:w-[76px] lg:h-[90px] lg:w-[90px]">
        <FaShieldAlt className="h-8 w-8 sm:h-10 sm:w-10 lg:h-[46px] lg:w-[46px]" />
      </div>
      <div className="pt-1">
        <h1 className="text-[36px] font-normal leading-none text-black sm:text-[48px] lg:text-[64px]">
          {nombre}
        </h1>
        <p className="mt-3 text-[18px] font-normal text-black sm:text-[20px] lg:mt-4 lg:text-[24px]">
          Diseñada por: {farmaceutica}
        </p>
      </div>
    </div>
  )
}