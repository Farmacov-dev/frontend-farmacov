// src/pages/Comparison.tsx
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaSyringe, FaClipboardList } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import { useState } from 'react'
import { useSidebar } from '../context/SidebarContext'
import DashboardLayout from '../components/layout/DashboardLayout'
import ComparisonHeader from '../components/ComparisonHeader/ComparisonHeader'
import ComparisonTable from '../components/ComparisonTable/ComparisonTable'
import { useComparacion } from '../hooks/useComparacion'

export default function Comparison() {
  const [activeItem, setActiveItem] = useState('dashboard')
  const { collapsed, setCollapsed } = useSidebar()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const vaccineA = searchParams.get('a') ?? ''
  const vaccineB = searchParams.get('b') ?? ''

  const { data, isPending, isError } = useComparacion(vaccineA, vaccineB)

  const userItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: MdDashboard,
      onClick: () => { setActiveItem('dashboard'); navigate('/dashboard') },
    },
    {
      key: 'analisis_sintomas',
      label: 'Analisis de sintomas',
      icon: FaClipboardList,
      onClick: () => { setActiveItem('analisis_sintomas'); navigate('/analisis_sintomas') },
    },
    {
      key: 'catalog',
      label: 'Catalogo de vacunas',
      icon: FaSyringe,
      onClick: () => { setActiveItem('catalog'); navigate('/catalog') },
    },
  ]

  return (
    <DashboardLayout
      items={userItems}
      activeItem={activeItem}
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((prev) => !prev)}

    >
      <main className="flex flex-1 flex-col gap-6 overflow-y-auto p-8 min-h-0">

        <ComparisonHeader
          leftLabel={vaccineA}
          rightLabel={vaccineB}
        />

        {isPending && (
          <p className="text-gray-400 text-sm">Cargando comparación...</p>
        )}
        {isError && (
          <p className="text-red-400 text-sm">Error cargando comparación.</p>
        )}
        {!isPending && !isError && data && (
          <ComparisonTable rows={data.rows} onVolver={() => navigate('/dashboard')}
           />
        )}

      </main>
    </DashboardLayout>
  )
}