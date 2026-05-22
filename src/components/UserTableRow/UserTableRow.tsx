export interface User {
  id: number;
  hora: string;
  nombre: string;
  iniciales: string;
  colorAvatar: string;
  accion: string;
  resultado: "Exitoso" | "Fallido";
}

interface UserTableRowProps {
  user: User;
}

const UserTableRow = ({ user }: UserTableRowProps) => {
  const success = user.resultado === "Exitoso";

  return (
    <tr className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/60">
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
          <span className="text-sm font-medium text-gray-800">
            {user.nombre}
          </span>
        </div>
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
