import api from "../api";
import type { HistorialUser } from "./getHistorial";

// Shape returned by GET /bitacora
export interface BitacoraEntry {
  accion: string;
  adminId: string;
  creadoEn: string;              // ISO datetime, e.g. "2026-06-02T17:27:24"
  nombreAdmin: string;           // Full name of the admin who performed the action
  nombreUsuarioAfectado: string; // Full name of the affected user
}

// Deterministic avatar colours based on entry index
const AVATAR_COLORS = [
  "#14B8A6",
  "#7C3AED",
  "#F59E0B",
  "#1D4ED8",
  "#10B981",
  "#EF4444",
  "#6366F1",
  "#F97316",
];

function toInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function formatHora(fecha: string): string {
  const date = new Date(fecha);
  return date.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}


export function mapBitacoraToHistorialUsers(
  entries: BitacoraEntry[]
): HistorialUser[] {
  return entries.map((entry, idx) => ({
    id: idx + 1,
    hora: formatHora(entry.creadoEn),
    nombre: entry.nombreUsuarioAfectado,
    iniciales: toInitials(entry.nombreUsuarioAfectado),
    colorAvatar: AVATAR_COLORS[idx % AVATAR_COLORS.length],
    accion: entry.accion,
    resultado: "Exitoso",
    nombreAdmin: entry.nombreAdmin,
  }));
}

export interface BitacoraPaginatedResponse {
  data: BitacoraEntry[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface BitacoraPaginatedResult {
  users: HistorialUser[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export const getBitacora = async (page: number = 0): Promise<BitacoraPaginatedResult> => {
  const { data } = await api.get<BitacoraPaginatedResponse>(`/bitacora/paginated?page=${page}`);
  return {
    users: mapBitacoraToHistorialUsers(data.data),
    currentPage: data.currentPage,
    pageSize: data.pageSize,
    totalItems: data.totalItems,
    totalPages: data.totalPages,
  };
};
