// src/pages/Comparison.tsx
// angel

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

  const sonIdsValidos = !isNaN(idA) && idA > 0 && !isNaN(idB) && idB > 0;

  const { data, isPending, isError } = useComparacion(idA, idB)

  if (!sonIdsValidos) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center p-8 bg-surface">
        <p className="text-muted text-lg font-inter">
          Los parámetros de comparación no son válidos.
        </p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-card hover:bg-primary/90 transition-colors"
        >
          Volver al inicio
        </button>
      </main>
    )
  }

  return (
    <main className="flex flex-1 flex-col gap-6 overflow-y-auto p-4 sm:p-8 min-h-0 bg-surface">
      <ComparisonHeader
        leftLabel={nombreA}
        rightLabel={nombreB}
      />
      
      {isPending && (
        <div role="status" aria-live="polite" className="flex justify-center p-10">
          <p className="text-muted text-sm font-inter animate-pulse">
            Cargando comparación...
          </p>
        </div>
      )}
      
      {isError && (
        <div role="alert" aria-live="assertive" className="flex justify-center p-10">
          <p className="text-red text-sm font-inter font-medium">
            Error al cargar los datos de la comparación.
          </p>
        </div>
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