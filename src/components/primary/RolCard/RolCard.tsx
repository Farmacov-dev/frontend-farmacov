// src/components/primary/RolCard/RolCard.tsx
// angel

import { memo } from 'react'

//refactor: se quitaron los hex directo en codigo 
const CLASES_AVATAR = [
  'bg-avatar-1',
  'bg-avatar-2',
  'bg-avatar-3',
  'bg-avatar-4',
  'bg-avatar-5',
  'bg-avatar-6',
  'bg-avatar-7',
  'bg-avatar-8',
]

// Las funciones puras fuera del componente se mantienen 
const getColorRolClass = (nombre: string): string => {
  let hash = 0
  for (let i = 0; i < nombre.length; i++) {
    hash = nombre.charCodeAt(i) + ((hash << 5) - hash)
  }
  return CLASES_AVATAR[Math.abs(hash) % CLASES_AVATAR.length]
}

const getInitiales = (nombre: string): string => {
  const palabras = nombre.trim().split(' ').filter(Boolean)
  if (palabras.length === 0) return '?'
  // refactpr: Si solo hay una palabra, tomamos la primera letra. Si hay más de una, tomamos la primera letra de las dos primeras palabras.
  if (palabras.length === 1) return palabras[0][0].toUpperCase()
  return (palabras[0][0] + palabras[1][0]).toUpperCase()
}

interface RolCardProps {
  id: number
  nombre: string
  seleccionado?: boolean
  // refactor: Invertimos el control. El hijo devuelve el ID al ser clickeado.
  // Esto permite al padre pasar una referencia estática y evitar cierres (closures) en cada render.
  onClick?: (id: number) => void
}

const RolCard = memo(function RolCard({
  id,
  nombre,
  seleccionado = false,
  onClick,
}: RolCardProps) {
  const colorClass = getColorRolClass(nombre)
  const inicial = getInitiales(nombre)

  return (
    <button
      type="button"
      onClick={() => onClick?.(id)}
      className={`
        flex flex-col justify-center items-start gap-3 w-full px-[18px] py-[27px] 
        transition-colors duration-150 cursor-pointer rounded-[12px] border-2
        ${seleccionado ? 'border-primary bg-surface' : 'border-stroke bg-white'}
      `}
    >
      {/* avatar */}
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-[8px] ${colorClass}`}
      >
        <span className="text-white font-inter text-[14px] font-bold leading-[20px]">
          {inicial}
        </span>
      </div>

      {/* nombre */}
      <div className="flex items-center h-[20px]">
        {/* refactor: Aplicamos la fuente Inter y el color oscuro consistente */}
        <span className="text-dark font-inter text-[14px] font-semibold leading-[20px]">
          {nombre}
        </span>
      </div>
    </button>
  )
})

export default RolCard