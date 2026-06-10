export interface User {
  id: number;
  hora: string;
  nombre: string;
  iniciales: string;
  colorAvatar: string;
  accion: string;
  resultado: "Exitoso" | "Fallido";
  nombreAdmin?: string;
}

interface UserTableRowProps {
  user: User;
}

const ADMIN_COLORS = [
  "#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6",
];

const getAdminInitials = (nombre: string) =>
  nombre
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const getAdminColor = (nombre: string) =>
  ADMIN_COLORS[nombre.charCodeAt(0) % ADMIN_COLORS.length];

const UserTableRow = ({ user }: UserTableRowProps) => {
  const success = user.resultado === "Exitoso";

  return (
    <tr data-testid="user-row" className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/60">
      <td className="px-4 py-4 text-sm text-gray-700">
        {user.hora}
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: user.colorAvatar }}
          >
            {user.iniciales}
          </div>
          <span data-testid="user-nombre" className="text-sm font-medium text-gray-800">
            {user.nombre}
          </span>
        </div>
      </td>
      <td className="px-4 py-4">
        {user.nombreAdmin ? (
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white flex-shrink-0"
              style={{ backgroundColor: getAdminColor(user.nombreAdmin) }}
            >
              {getAdminInitials(user.nombreAdmin)}
            </div>
            <span className="text-sm font-medium text-gray-800">
              {user.nombreAdmin}
            </span>
          </div>
        ) : (
          <span className="text-sm text-gray-400">—</span>
        )}
      </td>
      <td className="px-4 py-4 text-sm text-gray-700">
        {user.accion}
      </td>
      <td className="px-4 py-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${
            success ? "bg-emerald-500" : "bg-red-500"
          }`}
        >
          {user.resultado}
        </span>
      </td>
    </tr>
  );
};

export default UserTableRow;
