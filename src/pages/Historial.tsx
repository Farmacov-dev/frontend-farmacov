// src/pages/Historial.tsx
import {
  FaChartBar,
  FaClipboardList,
  FaExclamationTriangle,
  FaSyringe,
} from "react-icons/fa";

import PageHeader from "../components/PageHeader/PageHeader";
import KpiCard from "../components/KpiCard/KpiCard";
import UserTable from "../components/UserTable/UserTable";
import { useHistorialKpis, useHistorialUsers } from "../hooks/useHistorial";

export default function Historial() {
  const { data: users, isPending: usersPending } = useHistorialUsers();
  const { data: kpis, isPending: kpisPending } = useHistorialKpis();

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-8">
      <PageHeader title="Inicio" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
          />
          <KpiCard
            title="Alertas de seguridad"
            value={kpisPending ? "-" : kpis?.alertasSeguridad ?? "-"}
            change={null}
            positiveDirection="up"
            color="#EF4444"
            icon={<FaChartBar size={24} />}
          />
        </div>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Actividad Reciente
        </h2>

        {usersPending ? (
          <p className="py-8 text-sm text-gray-500">Cargando actividad...</p>
        ) : (
          <UserTable users={users ?? []} />
        )}

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Mostrando 1 de {users?.length ?? 0} usuarios
          </p>

          <div className="flex items-center gap-1">
            <button className="h-7 w-7 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50">
              {"<"}
            </button>
            <button className="h-7 w-7 rounded-md bg-[#5B84E9] text-white">
              1
            </button>
            <button className="h-7 w-7 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50">
              {">"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}