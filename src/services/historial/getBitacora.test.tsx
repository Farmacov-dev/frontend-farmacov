// @vitest-environment jsdom
// src/services/historial/getBitacora.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { get: mockGet },
}));

import { getBitacora, mapBitacoraToHistorialUsers } from './getBitacora';
import type { BitacoraEntry } from './getBitacora';

const mockEntry: BitacoraEntry = {
  accion: 'Creó usuario',
  adminId: 'admin-001',
  creadoEn: '2026-06-02T17:27:24',
  nombreAdmin: 'Carlos Martínez',
  nombreUsuarioAfectado: 'Juan García',
};

const mockPaginatedResponse = {
  data: [mockEntry],
  currentPage: 0,
  pageSize: 10,
  totalItems: 1,
  totalPages: 1,
};

describe('Servicio: getBitacora', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  // ── getBitacora (async) ─────────────────────────────────────────────────

  describe('getBitacora', () => {
    it('debe llamar a GET /bitacora/paginated?page=0 por defecto', async () => {
      mockGet.mockResolvedValueOnce({ data: mockPaginatedResponse });
      await getBitacora();
      expect(mockGet).toHaveBeenCalledWith('/bitacora/paginated?page=0');
    });

    it('debe llamar con el número de página proporcionado', async () => {
      mockGet.mockResolvedValueOnce({ data: { ...mockPaginatedResponse, currentPage: 2 } });
      await getBitacora(2);
      expect(mockGet).toHaveBeenCalledWith('/bitacora/paginated?page=2');
    });

    it('debe retornar los metadatos de paginación', async () => {
      mockGet.mockResolvedValueOnce({ data: mockPaginatedResponse });
      const result = await getBitacora();
      expect(result.currentPage).toBe(0);
      expect(result.pageSize).toBe(10);
      expect(result.totalItems).toBe(1);
      expect(result.totalPages).toBe(1);
    });

    it('debe mapear los entries a HistorialUser en la propiedad users', async () => {
      mockGet.mockResolvedValueOnce({ data: mockPaginatedResponse });
      const result = await getBitacora();
      expect(result.users).toHaveLength(1);
      expect(result.users[0].nombre).toBe('Juan García');
      expect(result.users[0].accion).toBe('Creó usuario');
    });

    it('debe propagar el error cuando la API falla', async () => {
      mockGet.mockRejectedValueOnce(new Error('Unauthorized'));
      await expect(getBitacora()).rejects.toThrow('Unauthorized');
    });
  });

  // ── mapBitacoraToHistorialUsers (pura) ──────────────────────────────────

  describe('mapBitacoraToHistorialUsers', () => {
    it('debe retornar lista vacía cuando no hay entries', () => {
      expect(mapBitacoraToHistorialUsers([])).toEqual([]);
    });

    it('debe asignar id incremental empezando en 1', () => {
      const result = mapBitacoraToHistorialUsers([mockEntry, mockEntry]);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    it('debe copiar nombre, accion y nombreAdmin del entry', () => {
      const [user] = mapBitacoraToHistorialUsers([mockEntry]);
      expect(user.nombre).toBe('Juan García');
      expect(user.accion).toBe('Creó usuario');
      expect(user.nombreAdmin).toBe('Carlos Martínez');
    });

    it('debe generar iniciales a partir del nombre del usuario afectado', () => {
      const [user] = mapBitacoraToHistorialUsers([mockEntry]);
      expect(user.iniciales).toBe('JG');
    });

    it('debe generar una sola inicial cuando el nombre es una sola palabra', () => {
      const entry: BitacoraEntry = { ...mockEntry, nombreUsuarioAfectado: 'Ana' };
      const [user] = mapBitacoraToHistorialUsers([entry]);
      expect(user.iniciales).toBe('A');
    });

    it('debe tomar solo las dos primeras palabras para las iniciales', () => {
      const entry: BitacoraEntry = { ...mockEntry, nombreUsuarioAfectado: 'Ana López Ruiz' };
      const [user] = mapBitacoraToHistorialUsers([entry]);
      expect(user.iniciales).toBe('AL');
    });

    it('debe asignar siempre "Exitoso" como resultado', () => {
      const [user] = mapBitacoraToHistorialUsers([mockEntry]);
      expect(user.resultado).toBe('Exitoso');
    });

    it('debe asignar un colorAvatar no vacío a cada entry', () => {
      const [user] = mapBitacoraToHistorialUsers([mockEntry]);
      expect(user.colorAvatar).toBeTruthy();
    });

    it('debe rotar los colores de avatar de forma circular cada 8 entradas', () => {
      const entries = Array(9).fill(mockEntry);
      const result = mapBitacoraToHistorialUsers(entries);
      expect(result[0].colorAvatar).toBe(result[8].colorAvatar); // idx 0 y 8 → misma posición en ciclo
    });

    it('debe retornar hora formateada como cadena no vacía', () => {
      const [user] = mapBitacoraToHistorialUsers([mockEntry]);
      expect(typeof user.hora).toBe('string');
      expect(user.hora.length).toBeGreaterThan(0);
    });
  });
});
