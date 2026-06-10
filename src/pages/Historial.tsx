// src/pages/Historial.tsx
import { useState } from "react";
import {
  FaExclamationTriangle,
  FaSyringe,
} from "react-icons/fa";

import PageHeader from "../components/PageHeader/PageHeader";
import KpiCard from "../components/KpiCard/KpiCard";
import UserTable from "../components/UserTable/UserTable";
import { useHistorialKpis, useHistorialUsers } from "../hooks/useHistorial";

export default function Historial() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: response, isPending: usersPending } = useHistorialUsers(currentPage);
  const { data: kpis, isPending: kpisPending } = useHistorialKpis();

  const users = response?.users ?? [];
  const pageInfo = response ? {
    currentPage: response.currentPage,
    pageSize: response.pageSize,
    totalItems: response.totalItems,
    totalPages: response.totalPages,
  } : null;
  return (
    <main className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-8">
      <PageHeader title="Inicio" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2">
          <KpiCard
            title="Usuarios activos"
            value={kpisPending ? "-" : kpis?.usuariosActivos ?? "-"}
            change={null}
            positiveDirection="up"
            color="#10B981"
            icon={<FaSyringe size={24} />}
          />
          <KpiCard
            title="Usuarios suspendidos"
            value={kpisPending ? "-" : kpis?.usuariosSuspendidos ?? "-"}
            change={null}
            positiveDirection="down"
            color="#FBBF24"
            icon={<FaExclamationTriangle size={24} />}
            //holla
          />
        </div>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Actividad Reciente
        </h2>

        {usersPending ? (
          <p data-testid="historial-cargando-actividad" className="py-8 text-sm text-gray-500">Cargando actividad...</p>
        ) : (
          <UserTable users={users} />
        )}

        <div className="mt-4 flex items-center justify-between">
          <p data-testid="historial-paginacion" className="text-xs text-gray-500">
            Mostrando página {pageInfo?.currentPage ? pageInfo.currentPage + 1 : 1} de {pageInfo?.totalPages ?? 1} ({pageInfo?.totalItems ?? 0} total)
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="h-7 w-7 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {"<"}
            </button>
            <button className="h-7 w-7 rounded-md bg-[#5B84E9] text-white">
              {pageInfo?.currentPage ? pageInfo.currentPage + 1 : 1}
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(pageInfo?.totalPages ? pageInfo.totalPages - 1 : 0, currentPage + 1))}
              disabled={!pageInfo || currentPage >= pageInfo.totalPages - 1}
              className="h-7 w-7 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {">"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
