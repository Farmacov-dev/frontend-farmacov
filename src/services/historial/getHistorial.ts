import api from "../api";

export interface HistorialUser {
  id: number;
  hora: string;
  nombre: string;
  iniciales: string;
  colorAvatar: string;
  accion: string;
  resultado: "Exitoso" | "Fallido";
  nombreAdmin?: string;
}

export interface HistorialKpis {
  usuariosActivos: number;
  usuariosSuspendidos: number;
  ultimoAcceso: string;
}

const MOCK_USERS: HistorialUser[] = [
  {
    id: 1,
    hora: "10:45 AM",
    nombre: "Susana Gonz\u00e1lez",
    iniciales: "SG",
    colorAvatar: "#14B8A6",
    accion: "Cre\u00f3 usuario",
    resultado: "Exitoso",
  },
  {
    id: 2,
    hora: "10:30 AM",
    nombre: "Roberto G\u00f3mez",
    iniciales: "RG",
    colorAvatar: "#7C3AED",
    accion: "Intent\u00f3 cambiar datos de vacunas",
    resultado: "Fallido",
  },
  {
    id: 3,
    hora: "10:30 AM",
    nombre: "Andr\u00e9s Garc\u00eda",
    iniciales: "AG",
    colorAvatar: "#F59E0B",
    accion: "Consult\u00f3 dashboard",
    resultado: "Exitoso",
  },
  {
    id: 4,
    hora: "10:30 AM",
    nombre: "Artemio Urbina",
    iniciales: "AU",
    colorAvatar: "#1D4ED8",
    accion: "Elimin\u00f3 usuario",
    resultado: "Exitoso",
  },
];

const MOCK_KPIS: HistorialKpis = {
  usuariosActivos: 18,
  usuariosSuspendidos: 3,
  ultimoAcceso: "Hace 5 min",
};

export const getHistorialUsers = async (): Promise<HistorialUser[]> => {
  try {
    const { data } = await api.get("/historial/usuarios");
    return data;
  } catch {
    return MOCK_USERS;
  }
};

export const getHistorialKpis = async (): Promise<HistorialKpis> => {
  try {
    const { data } = await api.get("/historial/kpis");
    return data;
  } catch {
    return MOCK_KPIS;
  }
};
