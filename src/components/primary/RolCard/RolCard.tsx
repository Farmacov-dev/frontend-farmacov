// src/components/primary/RolCard/RolCard.tsx

const COLORES_ROL = [
  '#3B82F6',
  '#8B5CF6',
  '#F59E0B',
  '#EC4899',
  '#13C296',
  '#1C3FB7',
  '#1BBFA9',
  '#D345F8',
]

const getColorRol = (nombre: string): string => {
  let hash = 0
  for (let i = 0; i < nombre.length; i++) {
    hash = nombre.charCodeAt(i) + ((hash << 5) - hash)
  }
  return COLORES_ROL[Math.abs(hash) % COLORES_ROL.length]
}

const getInitiales = (nombre: string): string => {
  const palabras = nombre.trim().split(' ').filter(Boolean)
  if (palabras.length === 0) return '?'
  if (palabras.length === 1) return palabras[0][0].toUpperCase()
  return palabras[0][0].toUpperCase()
}

interface RolCardProps {
  id: number
  nombre: string
  seleccionado?: boolean
  onClick?: () => void
}

export default function RolCard({
  id,
  nombre,
  seleccionado = false,
  onClick,
}: RolCardProps) {
  const color = getColorRol(nombre)
  const inicial = getInitiales(nombre)

  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col justify-center items-start gap-3 w-full px-[18px] py-[27px] 
        transition-colors duration-150 cursor-pointer rounded-[12px] border-2
        ${seleccionado ? 'border-accent bg-accent/5' : 'border-stroke-light bg-white'}
      `}
    >
      {/* avatar */}
      <div
        className="flex h-9 w-9 items-center justify-center rounded-[8px]"
        style={{ backgroundColor: color }}
      >
        <span className="text-white font-inter text-[14px] font-bold leading-[20px]">
          {inicial}
        </span>
      </div>

      {/* nombre */}
      <div className="flex items-center h-[20px]">
        <span className="text-muted font-inter text-[14px] font-semibold leading-[20px]">
          {nombre}
        </span>
      </div>
    </button>
  )
}