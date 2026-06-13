// src/components/ChangeBadge/ChangeBadge.tsx
type PositiveDirection = 'up' | 'down' | 'neutral'

interface ChangeBadgeProps {
  value: number | null
  showArrow?: boolean
  positiveDirection?: PositiveDirection
}

const ChangeBadge = ({
  value,
  showArrow = true,
  positiveDirection = 'up',
}: ChangeBadgeProps) => {

  // si no hay dato suficiente no mostramos nada
  if (value === null || value === undefined) return null

  const arrow = value >= 0 ? '↑' : '↓'
  const prefix = value >= 0 ? '+' : ''

  // determina el color según el contexto del KPI
  const getColor = () => {
    if (positiveDirection === 'neutral') return 'text-gray-500'
    if (value === 0) return 'text-gray-500'

    const isGood =
      (positiveDirection === 'up' && value > 0) ||
      (positiveDirection === 'down' && value < 0)

    return isGood ? 'text-green-600' : 'text-red-600'
  }

  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium font-['Inter',sans-serif] ${getColor()}`}>
      {prefix}{value}%{showArrow && ` ${arrow}`}
    </span>
  )
}

export default ChangeBadge