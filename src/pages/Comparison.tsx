// src/pages/Comparison.tsx
import { useNavigate, useSearchParams } from 'react-router-dom'
import ComparisonHeader from '../components/ComparisonHeader/ComparisonHeader'
import ComparisonTable from '../components/ComparisonTable/ComparisonTable'
import { useComparacion } from '../hooks/useComparacion'

export default function Comparison() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const idA = Number(searchParams.get('a'))
  const idB = Number(searchParams.get('b'))
  const nombreA = searchParams.get('nombreA') ?? ''
  const nombreB = searchParams.get('nombreB') ?? ''

  const { data, isPending, isError } = useComparacion(idA, idB)

  return (
    <main className="flex flex-1 flex-col gap-6 overflow-y-auto p-8 min-h-0">
      <ComparisonHeader
        leftLabel={nombreA}
        rightLabel={nombreB}
      />
      {isPending && (
        <p className="text-gray-400 text-sm">Cargando comparación...</p>
      )}
      {isError && (
        <p className="text-red-400 text-sm">Error cargando comparación.</p>
      )}
      {!isPending && !isError && data && (
        <ComparisonTable
          rows={data.rows}
          onVolver={() => navigate('/dashboard')}
        />
      )}
    </main>
  )
}